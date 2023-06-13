<!-- 
    A custom alert based on exist framework component.
 -->

<template>
    <v-snackbar timeout="4000" :color="alertType" location="top" max-width="0">        
        <div class="text-h6 text-center">
            <v-icon :icon="typeIconNamePair[alertType]"></v-icon>
            <slot></slot>
        </div>        
    </v-snackbar>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['alertType'])

const typeIconNamePair = ref({
    "success": "mdi-check-circle",
    "info": "mdi-information",
    "warning": "mdi-alert",
    "error": "mdi-close-octagon"
})

</script>

<style>
#alertText {
    text-align: center;
}
</style>