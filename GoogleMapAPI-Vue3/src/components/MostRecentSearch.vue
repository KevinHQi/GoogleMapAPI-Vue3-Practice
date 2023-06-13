<!-- 
    Display info of most recent searched place, include current address.
 -->

<template>
    <v-card 
        v-if="searchResult.placeName"
        :height="props.isLargeScreen ? '40%' : '70%'"
        max-height="400px"
        >     
        <v-img
            :height="props.isLargeScreen ? '60%' : '50%'"
            cover
            :src="searchResult.placePhoto"
        >
            <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular
                    color="grey-lighten-4"
                    indeterminate
                    ></v-progress-circular>
                </div>
            </template>
        </v-img>

        <v-card-item>
            <v-card-title>{{ searchResult.placeName }}</v-card-title>

            <v-card-subtitle>
                <span class="me-1">{{ searchResult.placeAddr }}</span>
            </v-card-subtitle>
        </v-card-item>

        <v-divider class="mx-4 mb-1"></v-divider>
        <v-card-text>
            <div>
                {{ `${searchResult.placeTimezoneName}, ${searchResult.placeTime}` }}
            </div>
        </v-card-text>
        

    </v-card>
    <v-img v-else class="placeHolder" src="../assets/plane.png" opacity="0.5"></v-img>
    
</template>

<script setup>

const props = defineProps(['searchResult', 'isLargeScreen'])

</script>

<style>
.placeHolder {
  opacity: 0.3;
}
</style>