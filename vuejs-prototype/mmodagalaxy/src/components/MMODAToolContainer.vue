<template>
  <section>
    <div class="container">
      <header class="custom-header">
        <h4 class="header-title">MMODA Tool - {{ tool_main_description.name }}</h4>
      </header>

      <div class="content">
        <div class="custom-inner-container input-column">
          <header class="custom-inner-header">
            <h2 class="header-inner-title">Query Parameters</h2>
            <button class="info-button" @click="showInfo">
              <i class="info-icon">ℹ</i>
            </button>
          </header>
          <div class="tool-form">
            <div id="dynamic-inputs">
              <DynamicContent :render-function="renderFunction" />
            </div>
            <button class="submit-button" @click="submit">Submit</button>
          </div>
        </div>
        <div class="column result-column"></div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, ref } from "vue";
import { MMODAToolBuilderService } from "@/services/MMODAToolBuilderService.js";
import mmoda_isgri_description from "@/data/mmoda_tool_detail_isgri.json";

export default defineComponent({
  name: "MMODAToolContainer",
  components: {
    DynamicContent: {
      props: {
        renderFunction: {
          type: Function,
          required: true,
        },
      },
      render() {
        if (this.renderFunction) {
          return this.renderFunction();
        }
        return null;
      },
    },
  },
  setup() {
    const tool_main_description = ref({
      name: mmoda_isgri_description[0][0].instrumet,
    });

    const toolBuilderService = new MMODAToolBuilderService(mmoda_isgri_description);

    const renderFunction = toolBuilderService.generateRenderFunction();

    return {
      tool_main_description,
      renderFunction,
    };
  },
});
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

.custom-inner-container {
  border: 1px solid #dddddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 100%;
  margin: 10px auto;
}

.custom-inner-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  border-color: #dddddd;
  color: #000000;
  padding: 20px;
  border-bottom: 1px solid #e7e7e7;
}

.header-inner-title {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.header-title {
  color: #FFFFFF;
}

.info-button {
  background-color: #007d64;
  width: 6%;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 16px;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  border-radius: 5px;
}

.info-button:hover {
  opacity: 0.9;
}

.tool-form {
  padding: 20px;
}

#dynamic-inputs {

}

#dynamic-inputs div {
  width: 100%;
  margin: auto;
}

#dynamic-inputs > label {
  font-weight: bold;
}

#dynamic-inputs input {
  width: auto;
}

.submit-button {
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

.submit-button:hover {
  background-color: #007d64;
  color: white;
}

.content {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.column {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.input-column {
  flex: 3;
  min-height: 200px;
}

.result-column {
  flex: 7;
}
</style>
