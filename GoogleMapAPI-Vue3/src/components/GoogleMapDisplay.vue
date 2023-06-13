<!-- 
  Manage all the interactions with map display, including init map, manage marker and 
  change map focus.
 -->


<template>
    <div id="map">
      <!-- The map -->
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps(['placeInfo', 'placeListToRemoveMarker'])
const emits = defineEmits(['initedMap']) 

let map
const visitedPlaceIdMarkerPair = new Map()

const mapOptions = {
  center: {
    lat: 0,
    lng: 0
  },
  zoom: 4,
  streetViewControl: false,
  fullscreenControl: false
};

onMounted(()=>{
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  emits("initedMap", map)
})

// pin new marker
watch(()=> props.placeInfo, (newVal, oldVal) => {
  if (!visitedPlaceIdMarkerPair.has(props.placeInfo.placeId)) {
    const marker = new google.maps.Marker({
      position: props.placeInfo.placeGeoLocation,
      map,
    });
    visitedPlaceIdMarkerPair.set(props.placeInfo.placeId, marker)   
  }
  
  map.setCenter(props.placeInfo.placeGeoLocation);  
  map.fitBounds(props.placeInfo.placeViewport);
})

// remove marker
watch(()=> props.placeListToRemoveMarker, (newVal, oldVal) => {
  for (const placeId of props.placeListToRemoveMarker) {
    visitedPlaceIdMarkerPair.get(placeId).setMap(null)
    visitedPlaceIdMarkerPair.delete(placeId)
  }
})


</script>

<style>
  #map {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
</style>