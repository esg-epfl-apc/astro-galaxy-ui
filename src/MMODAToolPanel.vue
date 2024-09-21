<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    const props = defineProps(['tool_data'])
    
    
    const tool_spec = ref(null)

    onMounted(() => {    
        // id = "upload1"
        axios.get("/api/tools/crbeam_astro_tool_pr79/build?version=latest&tool_version=latest")
        .then(response => {
            tool_spec.value = response.data
            console.log(response.data)
        })
    })
    
</script>


<template>
    <div>                 
        <div>
            {{ tool_data }}
        </div>
        <!-- <div class="form-item form-type-radio form-item-use-scws">
            <input name="mmoda_isgri_use_scws" type="radio" id="edit-use-scws-form-list" value="form_list" class="form-radio" />  <label class="option" for="edit-use-scws-form-list">Custom list </label>
            <input name="mmoda_isgri_use_scws" type="radio" id="edit-use-scws-user-file" value="user_file" class="form-radio" />  <label class="option" for="edit-use-scws-user-file">Custom list in file </label>            
        </div> -->
        <div>
            <div v-if="tool_spec">                
                <div>
                    {{ tool_spec.inputs }}
                </div>
                <div v-for="input in tool_spec.inputs[0].cases">
                    <label>{{ input.value }}</label>
                    <input type="text" v-model="input.value" />
                </div>            
            </div>
        </div>
    </div>
</template>

