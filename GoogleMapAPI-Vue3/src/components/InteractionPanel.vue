<!-- 
  Manage text ,image info display and stored places info.
 -->

<template>   
  <v-container >
    <SearchBar 
      @gotSearchValue="handleSearchValueReturn" 
      @gotGeoLocation="handleUserGeoReturn"
      :isLargeScreen="props.isLargeScreen"
      title="Interested in somewhere?"
    ></SearchBar>

    <MostRecentSearch 
      :searchResult="searchResult"
      :isLargeScreen="props.isLargeScreen"
    ></MostRecentSearch>

    <PlaceListView
      v-if="props.isLargeScreen"
      class="placeListView"
      :placeListToRender="placeListToRender"
      :pageIndexRange="pageIndexRange"
      :isLargeScreen="props.isLargeScreen"
      @pageIndexChanged="handlePageIndexChanged"
      @deleteChosenPlaces="handleDeletePlaces"      
    ></PlaceListView>
    
    <v-btn block 
      v-if="!props.isLargeScreen" 
      @click="() => doShowSmallScreenListView = true"
      height="12%"
      :disabled="!placeListToRender.length">
      <v-icon :color="placeListToRender.length ? 'info':'white'" icon="mdi-history" size="large"></v-icon>
    </v-btn>    
  
    <v-dialog
      v-model="doShowSmallScreenListView" 
      width="auto">
      <PlaceListView
        :placeListToRender="placeListToRender"
        :pageIndexRange="pageIndexRange"
        @pageIndexChanged="handlePageIndexChanged"
        @deleteChosenPlaces="handleDeletePlaces"
      ></PlaceListView>
    </v-dialog> 
  </v-container>  
</template>

<script setup>
import SearchBar from './SearchBar.vue';
import MostRecentSearch from './MostRecentSearch.vue'
import PlaceListView from './PlaceListView.vue';
import { ref, watch } from 'vue';

const emit = defineEmits(['gotSearchValue', 'gotUserGeoLocation', 'gotPlaceListToDelete'])
const props = defineProps(['searchResult', 'isLargeScreen'])

const placeIdPlaceInfoPair = ref(new Map())
const pageSize = 10
let pageIndexNumber = ref(1)
let pageIndexRange = ref(1)
const placeListToRender = ref([])
let doShowSmallScreenListView = ref(false)


const handleSearchValueReturn = (searchValue) => {
  emit("gotSearchValue", searchValue)
}

const handleUserGeoReturn = (lat, lng) => {
  emit("gotUserGeoLocation", [lat, lng])
}

const handlePageIndexChanged = (index) => {
  pageIndexNumber.value = index
  updatePlaceListToRender()
}

const handleDeletePlaces = (placeList) => {
  for (const placeId of placeList) {
    placeIdPlaceInfoPair.value.delete(placeId)
  }
  emit("gotPlaceListToDelete", placeList)
  updatePlaceListToRender()
}


const updatePlaceListToRender = () => {
  pageIndexRange.value = Math.ceil(placeIdPlaceInfoPair.value.size / pageSize)

  let iterStartValue = 
    Math.max(0, placeIdPlaceInfoPair.value.size - pageSize * pageIndexNumber.value)
  let iterEndValue = placeIdPlaceInfoPair.value.size - pageSize * (pageIndexNumber.value - 1)
  let tempList = []
  let i = 0

  const iterator = placeIdPlaceInfoPair.value[Symbol.iterator]();
  for (const item of iterator) {
    if (iterStartValue <= i && i < iterEndValue){
      tempList.unshift(item[1])
    }
    else if (i === iterEndValue){
      break
    }
    i++
  }
  placeListToRender.value = [...tempList]
}

watch(()=> props.searchResult, (newVal, oldVal) => {
  if (placeIdPlaceInfoPair.value.has(props.searchResult.placeId)) {
    placeIdPlaceInfoPair.value.delete(props.searchResult.placeId)    
  }
  placeIdPlaceInfoPair.value.set(props.searchResult.placeId, props.searchResult)
  
  updatePlaceListToRender()

}, {deep: true})

watch(()=> placeListToRender.value, (newVal, oldVal) => {
  if (!placeListToRender.value.length) {
    doShowSmallScreenListView.value = false
  }
})

</script>

<style>
 
</style>