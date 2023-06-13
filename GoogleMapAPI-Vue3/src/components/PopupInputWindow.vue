<!-- 
    Just for collect google map api.
 -->

<template>
    <v-dialog id="inputPopupWindow" v-model="doLunach" persistent class="text-center" width="auto">
        <v-card>
            <v-card-title>
                <span class="text-h5"> {{ title }} </span>
            </v-card-title>
            <v-form @submit.prevent>
                <v-text-field                                                
                    :label="hint"
                    :value = "input"
                    v-model="input"
                    @keyup.enter="handleSubmit"
                    type="password"
                ></v-text-field>
                <v-btn color="blue-darken-1" variant="text" @click="handleSubmit">
                    Submit
                </v-btn>
            </v-form>    
        </v-card>
    </v-dialog>
    <SnackbarAlert v-model="doShowErrorAlert" alertType="error">
        Field is required!
    </SnackbarAlert>
</template>

<script setup>
import { ref } from 'vue';
import SnackbarAlert from './SnackbarAlert.vue';

const props = defineProps(['title', 'hint'])
const emit = defineEmits(['gotInputValue'])

let doLunach = ref(true) 
let input = ref("")
let doShowErrorAlert = ref(false)

const handleSubmit = () => {
    if (input.value.length){
        emit('gotInputValue',input.value)
    }
    else{
        doShowErrorAlert.value = true
    }    
}

</script>
.inputPopupWindow { 
    width="60%",
    align
}
<style>

</style>