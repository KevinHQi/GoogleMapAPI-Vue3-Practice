<!-- 
    Display list of search history, return selected place to delete.
 -->

<template>
    <v-card :height="props.isLargeScreen ? '50%' : '100%'" v-if="props.placeListToRender.length">
        <v-card :height="props.isLargeScreen ? '75%' : '60%'">
        <v-virtual-scroll
            v-if="props.placeListToRender.length"
            :items="props.placeListToRender"
            :height="props.isLargeScreen ? '30vh' : '60vh'"
            >
            <template v-slot:default="{ item }">
                <v-list-item
                    :key="item.placeId"
                    :title="item.placeName"
                    :subtitle="item.placeAddr"   
                    >
                    <template v-slot:prepend>
                        <v-avatar>
                            <v-checkbox
                                v-model="checkedValue"
                                color="info"
                                :value="item.placeId"
                                :key="item.placeId"
                                :id="item.placeId"
                                hide-details
                            ></v-checkbox>  
                        </v-avatar>
                        <v-avatar size="36px">
                            <v-img
                                cover
                                alt="Avatar"
                                :src="item.placePhoto"
                            ></v-img>
                        </v-avatar>
                    </template>
            
                </v-list-item>
            </template>
        </v-virtual-scroll>
        </v-card>
        
        <v-pagination
            v-model="pageIndex"
            :length="pageIndexRange"
            :total-visible="4"
        ></v-pagination>
        

        <v-btn 
            v-if="props.placeListToRender.length"
            :height="props.isLargeScreen ? '5vh' : '10vh'"
            variant="tonal"
            color="error"
            :disabled="!checkedValue.length"
            @click="passPlacesToDelete"
            block>
            DELETE
        </v-btn>

    </v-card>

</template>

<script setup>
import { watch } from 'vue';
import { ref } from 'vue';

const props = defineProps(['placeListToRender', 'pageIndexRange', 'isLargeScreen'])
const emits = defineEmits(['pageIndexChanged', 'deleteChosenPlaces'])

let pageIndex = ref(1)
let checkedValue = ref([])

const passPlacesToDelete = () => {
    emits("deleteChosenPlaces", [...checkedValue.value])
    checkedValue.value = []
}

watch(()=> pageIndex.value, (newVal, oldVal) => {
    emits("pageIndexChanged", pageIndex.value)
})


</script>

<style>
</style>