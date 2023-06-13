<!-- 
  This file includes all the actions to retrieve information from Google Maps Service. 
  Then send the data to where in need.
-->

<template>
    <div id="logic">
      <GoogleMapDisplay
          v-if="doShowMapDisplay"
          @initedMap="handleInitedMap"
          :placeInfo="readyToPassObj"
          :placeListToRemoveMarker="placeListToRemoveMarker"
      ></GoogleMapDisplay>
      <SnackbarAlert v-model="doShowErrorFindingPlaceAlert" alertType="warning">
        Can't find the place
      </SnackbarAlert>        
    </div>    
</template>

<script setup>
import { ref, watch } from 'vue';
import GoogleMapDisplay from './GoogleMapDisplay.vue';
import SnackbarAlert from './SnackbarAlert.vue';

import { Loader} from '@googlemaps/js-api-loader';

const props = defineProps(['apiKey', 'searchValue', 'latLng', 'placeListToRemoveMarker'])
const emits = defineEmits(['gotSearchResult'])

let placeService
let geocoder
let doShowMapDisplay = ref(false)
let placeListToRemoveMarker = ref([])
let doShowErrorFindingPlaceAlert = ref(false)
const readyToPassObj = ref({})
let defaultPhoto = ref("https://developers.google.com/static/maps/images/landing/maps-api_480.png")

const placeInfo = ref({
  placeId: '', 
  placeName: '', 
  placeGeoLocation: {lat: 0, lng: 0},
  placeGeoLat: '', 
  placeGeoLng: '', 
  placeViewport: {},
  placeAddr: '', 
  placeTimezoneId: '',
  placeTimezoneName: '',
  placeTime: '',
  placePhoto: '',
  placeReturnStatus: ''
})

// init map
const loader = new Loader({
  apiKey: props.apiKey,
  version: "weekly",
  libraries: ["places"]
}); 

loader.load().then((google)=>{        
    doShowMapDisplay.value = true
    geocoder = new google.maps.Geocoder();
})
.catch((e) => {
    console.log(e)
})

const handleInitedMap = (map) => {
    placeService = new google.maps.places.PlacesService(map);
}


const searchPlaceByName = async(nameOfPlace) => {
  const request = {
    query: nameOfPlace,
    fields: ["place_id", "name", "geometry", "formatted_address","photos"],
    language: "en"
  }
  
  return new Promise((resolve, reject) => {
    placeService.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        placeInfo.value.placeId = results[0].place_id
        placeInfo.value.placeName = results[0].name
        placeInfo.value.placeGeoLocation = results[0].geometry.location
        placeInfo.value.placeGeoLat = results[0].geometry.location.lat()
        placeInfo.value.placeGeoLng = results[0].geometry.location.lng()
        placeInfo.value.placeViewport = results[0].geometry.viewport
        placeInfo.value.placeAddr = results[0].formatted_address
        if (results[0].photos !== undefined){
          placeInfo.value.placePhoto = results[0].photos[0].getUrl({maxWidth: 400, maxHeight: 300})
        }
        else{
          placeInfo.value.placePhoto = defaultPhoto.value
        }
        
        placeInfo.value.placeReturnStatus = status          
        
        resolve('OK');
      } else {
        reject(`Error finding place from query`);
        doShowErrorFindingPlaceAlert.value = true
      }
    });
  });
}

const searchAddrByLatLng = async(lat, lng) => {
  const latlng = {
    lat: lat,
    lng: lng,
  };

  const response = await geocoder.geocode({ location: latlng });

  if (response.results[0]) {
    placeInfo.value.placeId = response.results[0].place_id
    placeInfo.value.placeName = "Current Location"
    placeInfo.value.placeGeoLocation = latlng
    placeInfo.value.placeGeoLat = lat
    placeInfo.value.placeGeoLng = lng
    placeInfo.value.placeViewport = response.results[0].geometry.viewport
    placeInfo.value.placeAddr = response.results[0].formatted_address
    placeInfo.value.placePhoto = defaultPhoto.value

  } else {
    window.alert("No results found");
  }
}

const getTimeInfoByLatLng = async(lat, lng) => {
  const url = 'https://maps.googleapis.com/maps/api/timezone/json?location='+
    lat + ',' + lng +
    '&timestamp='+ Math.floor(Date.now() / 1000) +
    '&key='+ props.apiKey
  
  const response = await fetch(url);
  const data = await response.json();
  
  placeInfo.value.placeTimezoneId = data.timeZoneId
  placeInfo.value.placeTimezoneName = data.timeZoneName
  placeInfo.value.placeTime = new Date().toLocaleString("en-US", { timeZone: data.timeZoneId });
  
}

// search info by name
watch(() => props.searchValue, async(newVal, oldVal) => {
  const res = await searchPlaceByName(props.searchValue)
  if (res === 'OK'){
    await getTimeInfoByLatLng(placeInfo.value.placeGeoLat, placeInfo.value.placeGeoLng)  
    readyToPassObj.value = Object.assign({}, placeInfo.value) 
    emits("gotSearchResult", readyToPassObj.value)
  }  
})

// serach info by lat lng
watch(() => props.latLng, async(newVal, oldVal) => {
  await searchAddrByLatLng(props.latLng[0], props.latLng[1])
  await getTimeInfoByLatLng(props.latLng[0], props.latLng[1])
  readyToPassObj.value = Object.assign({}, placeInfo.value) 
  emits("gotSearchResult", readyToPassObj.value)
})

watch(() => props.placeListToRemoveMarker, async(newVal, oldVal) => {
  placeListToRemoveMarker.value = props.placeListToRemoveMarker
})

</script>

<style>
  #logic {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
</style>