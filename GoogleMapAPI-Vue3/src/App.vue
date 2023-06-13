<!-- 
  Cut the app in two parts, one for the panel that do all the input and some
  display, the other one do all the google map actions.
 -->

<template>
  <v-app>
    <v-main 
      class="mainScreen" 
      v-resize="onResize">
      <PopupInputWindow 
        v-if="doShowInputPopupWindow"
        title = "Google Map API key" 
        hint = "Please input the API key here :)" 
        @gotInputValue="handleReturnOfApiKey"
        />
      <SnackbarAlert v-model="doShowSuccessAlert" alertType="success">
        Submitted!
      </SnackbarAlert>


      <InteractionPanel 
        v-if="doShowInteractionPanel"
        class="interactionPanel"
        :searchResult="searchResult"
        :isLargeScreen="isLargeScreen"
        @gotSearchValue="handleSearchValueReturn"
        @gotUserGeoLocation="handleUserGeoLocationReturn"
        @gotPlaceListToDelete="handlePlaceListToRemoveMarker"
      />

      <GoogleMapLogic
        class="GoogleMap"
        v-if="doShowMapLogic" 
        :apiKey="apiKey"
        :searchValue ="searchValue"
        :latLng="latLng"
        :placeListToRemoveMarker="placeListToRemoveMarker"
        :isLargeScreen="isLargeScreen"
        @gotSearchResult="handleGotSearchResultReturn"
      ></GoogleMapLogic>          

      
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import PopupInputWindow from './components/PopupInputWindow.vue';
import SnackbarAlert from './components/SnackbarAlert.vue';
import InteractionPanel from './components/InteractionPanel.vue';
import GoogleMapLogic from './components/GoogleMapLogic.vue';
import { computed } from '@vue/reactivity';

let doShowInputPopupWindow = ref(true)
let doShowSuccessAlert = ref(false)
let doShowMapLogic = ref(false)
let doShowInteractionPanel = ref(false)
let apiKey = ref('')
let searchValue = ref('')
let latLng = ref([0,0])
let searchResult = ref({})
let placeListToRemoveMarker = ref([])
let windowSize = ref({})
const sizeOfLayoutChange = ref(767)
let isLargeScreen = ref(computed(() => windowSize.value.w >= sizeOfLayoutChange.value))

const handleReturnOfApiKey = (key) =>{
  doShowInputPopupWindow.value = false
  doShowSuccessAlert.value = true
  apiKey.value = key
  doShowMapLogic.value = true
  doShowInteractionPanel.value = true
}

const handleSearchValueReturn = (value) => {
  searchValue.value = value
}

const handleUserGeoLocationReturn = (geo) => {
  latLng.value = geo
}

const handleGotSearchResultReturn = (result) => {
  searchResult.value = result  
}

const handlePlaceListToRemoveMarker = (placeList) => {
  placeListToRemoveMarker.value = placeList
}

const onResize = () => {
  windowSize.value = { w: window.innerWidth, h: window.innerHeight }
}

  
</script>

<style>
  .container {
    height: 100%;
    width: 100%;
  }

  .mainScreen {
    display: flex;
  }

  .interactionPanel {
    flex: 0 0 500px;
    order: 1;
    background-color: #f8f9fd;
  }

  .GoogleMap {
    flex: 1; 
    order: 2;
  }

  @media (max-width: 767px) {
    .mainScreen {
      flex-direction: column;
    }

    .interactionPanel {
      order: 2;
      max-height: 60%;
      overflow-y: auto;
    }

    .GoogleMap {
      order: 1;
    }
  }
 
</style>
