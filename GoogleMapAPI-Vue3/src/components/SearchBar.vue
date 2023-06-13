<!-- 
    Getting search value and current location.
 -->

<template>      

    <v-text-field
        v-model="searchValue"
        variant="solo"
        :label="title"
        append-inner-icon="mdi-magnify"
        prepend-inner-icon="mdi-map-marker-radius"
        hide-details
        clearable
        @click:prepend-inner="handleLocating"
        @click:append-inner="handleSearch"
        @keyup.enter="handleSearch"
    ></v-text-field>    
    
    <snackbar-alert v-model="doShowEmptyInputAlert" alertType="info"> 
        Please search something! 
    </snackbar-alert>
    <SnackbarAlert v-model="doShowDupSrearchValueAlert" alertType="info">
        Try something new!
    </SnackbarAlert>
</template>

<script setup>
import { ref } from 'vue';
import SnackbarAlert from './SnackbarAlert.vue';

let searchValue = ref('')
let oldSearchValue = ref('')
let doShowEmptyInputAlert = ref(false)
let doShowDupSrearchValueAlert = ref(false)

const emit = defineEmits(['gotSearchValue', 'gotGeoLocation'])
const props = defineProps(['title', 'isLargeScreen'])

const handleSearch = () => {
    if (searchValue.value.length){
        if (oldSearchValue.value !== searchValue.value){
            emit('gotSearchValue', searchValue.value)
            oldSearchValue.value = searchValue.value
        }
        else{
            doShowDupSrearchValueAlert.value = true
        }        
        searchValue.value = ''
    }
    else{
        doShowEmptyInputAlert.value = true
    }
    
}

const handleLocating = () => {
    navigator.geolocation.getCurrentPosition(
    position => {
        emit('gotGeoLocation', position.coords.latitude, position.coords.longitude)
    },
    error => {
        console.log(error.message);
    })
}

</script>

<style>

</style>