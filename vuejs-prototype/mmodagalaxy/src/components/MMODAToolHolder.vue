<template>
    <!-- button @click="updateParameters">Update Parameters</button-->
    <div class="container-tool">
      <div class="column-inputs-tool">
        <div id="dynamic-inputs">
          <DynamicContent :render-function="renderFunction" />
        </div>
        <div class="tool-card">
          <h2 class="tool-title">Selected Tool: {{ tool_main_description.name }}</h2>
          <div class="tool-info">
            <span class="tool-attribute"><strong>ID: </strong> {{ tool_main_description.id }}</span>
            <span class="tool-attribute"><strong>Version: </strong> {{ tool_main_description.version }}</span>
            <span class="tool-attribute"><strong>Description: </strong> {{ tool_main_description.description }}</span>
          </div>
          <div class="form-container-tool">
            <form @submit.prevent="handleSubmit" v-html="instrument_form"></form>
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>

      <div class="column-results-tool">
        <div class="tool-run">
          Tool Run
        </div>
      </div>
    </div>
</template>

<script>
import {defineComponent, toRaw} from "vue";
import { mapGetters } from "vuex";
import {ref} from "vue";
import galaxyToolService from "@/services/GalaxyToolService.js";
import {MMODAToolBuilderService} from "@/services/MMODAToolBuilderService.js";
import MMODAToolService from "@/services/MMODAToolService.js"
import mmoda_isgri_description from "@/data/mmoda_tool_detail_isgri.json"
import store from "@/stores/index.js";


export default defineComponent({
  name: "DynamicInputComponent",
  components: {
    DynamicContent: {
      props: ["renderFunction"],
      render() {
        //return this.renderFunction();
      },
    },
  },
  setup() {
    const parameters = [
      { name: "radius", value: 15.0, units: "deg", optional: false },
      { name: "E1_keV", value: 20.0, units: "keV", optional: false },
      { name: "E2_keV", value: 40.0, units: "keV", optional: false },
      { name: "osa_version", value: "OSA11.2", units: "str", optional: false },
    ];

    console.log("MMODA Tool rendering");

    const tool_main_description = ref({});

    let renderFunction;
    const mmoda_tool_service = new MMODAToolService();
    let mmoda_tool_builder_service = null;
    let tool_description = null;

    let instrument_form = ref("");

    const updateParameters = () => {
      inputService.templateData.parameters.push({
        name: "new_param",
        value: "",
        units: "str",
        optional: true,
      });
    };

    const handleSubmit = (event) => {
      const form = event.target;
      const formData = new FormData(form);

      const formValues = {};
      formData.forEach((value, key) => {
        formValues[key] = value;
      });

      console.log(formValues);
    };

    const updateTool = async (tool) => {

      console.log(tool)

      tool_main_description.value.id = tool.id
      tool_main_description.value.name = tool.name
      tool_main_description.value.version = tool.version
      tool_main_description.value.description = tool.description

      //tool_description =  await mmoda_tool_service.fetchToolDescription(tool.name);

      tool_description = mmoda_isgri_description;
      let tool_parameters = tool_description[0][3];

      console.log(tool_description);
      console.log(tool_parameters);

      console.log(tool.name);

      /*
      tool_description = await mmoda_tool_service.fetchToolDescription(tool.name);

      mmoda_tool_builder_service = new MMODAToolBuilderService(tool_description);
      renderFunction = mmoda_tool_builder_service.generateRenderFunction();

      //renderFunction();
      instrument_form.value = mmoda_tool_builder_service.generateToolHTML();
      //console.log(instrument_form);
      */
    };

    return { renderFunction, updateParameters, updateTool, tool_main_description, mmoda_tool_service, mmoda_tool_builder_service, instrument_form };
  },

  computed: {
    ...mapGetters("tools", ["selectedTool"]),
  },
  watch: {
    selectedTool(selected_tool, old_tool) {
      console.log("Selected tool changed:", selected_tool);
      this.updateTool(selected_tool);
    },
  },
  methods: {

  },

});
</script>
<style>

.container-tool {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  gap: 20px;
  box-sizing: border-box;
}

.column-inputs-tool {
  flex: 0 0 20%;
  max-width: 20%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.column-results-tool {
  flex: 0 0 80%;
  max-width: 80%;
  box-sizing: border-box;
}

.tool-run {
  width: 100%;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  font-size: 1.2em;
  text-align: center;
}

.tool-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 0 auto;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.tool-title {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 15px;
}

.tool-info {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  color: #555;
}

.tool-attribute {
  font-size: 1em;
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.form-container-tool {
  width: 100%;
  max-width: 300px;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: left;
}

.form-container-tool label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.form-container-tool input[type="text"],
.form-container-tool input[type="number"],
.form-container-tool select,
.form-container-tool input[type="checkbox"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-container-tool input[type="checkbox"] {
  width: auto;
}

.form-container-tool button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.form-container-tool button:hover {
  background-color: #45a049;
}

@media (max-width: 768px) {
  .container {
    flex-wrap: wrap;
  }

  .column-inputs-tool,
  .column-results-tool {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

</style>
