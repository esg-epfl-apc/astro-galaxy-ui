<template>
  <section>
    <div class="container">
      <header class="custom-header">
        <h4 class="header-title">MMODA Search</h4>
      </header>
      <div class="form-container">
        <div class="input-group">
          <label for="objectName">Object name</label>
          <input type="text" id="objectName" v-model="objectName" placeholder="1E 1740.7-2942" />
          <input type="text" id="formId" v-model="formId" placeholder="" />
          <div class="button-group">
            <button class="file-search-button" @click="resolve">Resolve</button>
            <button class="file-search-button" @click="explore">Explore</button>
          </div>
        </div>

        <div class="input-group">
          <div class="input-row">
            <label for="ra">RA</label>
            <input type="number" id="ra" v-model="ra" placeholder="Enter RA" step="0.01" />

            <label for="dec">Dec</label>
            <input type="number" id="dec" v-model="dec" placeholder="Enter Dec" step="0.01" />
          </div>

          <div class="input-row">
            <label for="startTime">Start time</label>
            <input type="text" id="startTime" v-model="startTime" placeholder="Enter start time" />

            <label for="endTime">End time</label>
            <input type="text" id="endTime" v-model="endTime" placeholder="Enter end time" />
          </div>

          <div class="input-row">
            <div class="group-select-time">
              <label for="time-select">Time unit</label>
              <div id="select-wrapper">
                <select id="time-select" v-model="timeUnit">
                  <option value="ISO">ISO/ISOT</option>
                  <option value="MJD">MJD</option>
                </select>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {getCurrentInstance, isRuntimeOnly, ref, toRaw} from "vue";
import mmodaFileSearchService from "@/services/MMODAFileSearchService.js";
import mmodaGalleryService from "@/services/MMODAGalleryService.js";
import {useStore} from "vuex";
import CelestialObject from "@/models/CelestialObject.js"

export default {
  name: "MMODAFileSearch",

  setup() {
    const objectName = ref("");
    const formId = ref("");
    const ra = ref(null);
    const dec = ref(null);
    const startTime = ref("");
    const endTime = ref("");
    const timeUnit = ref("ISO");
    const celestialObject = ref(null);

    const store = useStore();
    const { emit } = getCurrentInstance();

    console.log(formId);

    const resolve = async () => {
      console.log("Resolving object:", objectName.value);
      /*
      const object_data_gallery = await mmodaGalleryService.fetchGallery(toRaw(objectName.value));
      console.log(object_data_gallery);
       */
      const object_data = await mmodaFileSearchService.resolveObject(toRaw(objectName.value), toRaw(formId.value));
      /*
      console.log(object_data[0]);
      console.log(object_data[1].args);
      ra.value = object_data[1].args.ra;
      dec.value = object_data[1].args.dec;
      */

      console.log(object_data);
      console.log(object_data.title);
      console.log(object_data.source_dec);
      console.log(object_data.source_ra);
      console.log(object_data.url);

      celestialObject.value = new CelestialObject(
          object_data.title,
          object_data.alternative_names_long_str,
          object_data.nid,
          object_data.source_dec,
          object_data.source_ra,
          object_data.url,
          object_data.url_preview
      )

      ra.value = object_data.source_ra;
      dec.value = object_data.source_dec;

      await store.dispatch("celestial_objects/updateCurrentObject", celestialObject.value);
    };

    const explore = () => {
      console.log("Explore "+objectName.value);
      //store.dispatch("celestial_objects/updateCurrentObject", objectName.value);
      //store.dispatch("celestial_objects/updateCurrentObject", objectName.value);
      //store.dispatch("celestial_objects/updateFormId", formId.value);
      emit("reload-gallery");
    };

    return {
      objectName,
      formId,
      ra,
      dec,
      startTime,
      endTime,
      timeUnit,
      resolve,
      explore,
    };
  },
};
</script>

<style scoped>

.container {
  border: 1px solid #007d64;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 100%;
  margin: 10px auto;
}

.custom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #007d64;
  border-color: #dddddd;
  color: #000000;
  padding: 0px 5px 0px 10px;
}

.header-title {
  color: #FFFFFF;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  width: 50%;
  margin: auto;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.file-search-button {
  background-color: #ffffff;
  color: #007d64;
  border: 2px solid #007d64;
  border-radius: 8px;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.file-search-button:hover {
  background-color: #007d64;
  color: white;
}

.input-row {
  display: contents;
  gap: 10px;
  align-items: center;
}

input{
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: auto;
  font-weight: bold;
}

label {
  font-weight: bold;
  font-size: 18px;
}

.group-select-time {
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.group-select-time label {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

#select-wrapper {
  position: relative;
  width: 100%;
  margin-top: 1%;
}

#select-wrapper select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px 40px 10px 10px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
}

#select-wrapper select:focus {
  border-color: #007d64;
  background-color: #fff;
  outline: none;
}

#select-wrapper select:hover {
  border-color: #007d64;
}

#select-wrapper::after {
  content: "▼";
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 14px;
  color: #333;
}
</style>
