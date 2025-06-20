<template>
  <section>
    <div class="tool-card">
      <h2 class="tool-title">Selected Tool: {{ tool_description.name }}</h2>
      <div class="tool-info">
        <span class="tool-attribute"><strong>ID: </strong> {{ tool_description.id }}</span>
        <span class="tool-attribute"><strong>Version: </strong> {{ tool_description.version }}</span>
        <span class="tool-attribute"><strong>Description: </strong> {{ tool_description.description }}</span>
      </div>

      <div class="form-container-tool">
        <form @submit.prevent="handleSubmit">
          <div v-for="(input, index) in tool_inputs" :key="index" class="form-group">
            <label v-if="['text', 'integer', 'checkbox', 'select'].includes(input.type)">
              {{ input.label }}
            </label>
            <input
                v-if="input.type === 'text'"
                type="text"
                :id="input.name"
                :name="input.name"
                v-model="tool_inputs[input.name]"
                class="form-control"
            />
            <input
                v-if="input.type === 'integer'"
                type="number"
                :id="input.name"
                :name="input.name"
                v-model="tool_inputs[input.name]"
                class="form-control"
            />
            <input
                v-else-if="input.type === 'checkbox'"
                type="checkbox"
                :id="input.name"
                :name="input.name"
                v-model="tool_inputs[input.name]"
                class="form-check-input"
            />
            <select
                v-else-if="input.type === 'select'"
                :id="input.name"
                :name="input.name"
                v-model="tool_inputs[input.name]"
                class="form-select"
            >
              <option v-for="(option, i) in input.options" :key="i" :value="option[1]">
                {{ option[0] }}
              </option>
            </select>

          </div>
          <button type="submit" class="btn btn-primary">Run tool</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>

import data from "@/data/tool.json";

import {computed, h, reactive, ref, toRaw, watch} from "vue";
import { useStore } from "vuex";
import { mapState, mapActions, mapGetters } from "vuex";
import galaxyToolService from "@/services/GalaxyToolService.js";
import mmoda_isgri_description from "@/data/mmoda_tool_detail_isgri.json"
import store from "@/stores/index.js";

export default {
  name: "ToolContent",

  setup() {


    const tool_description = ref({});
    const tool_inputs = ref([]);

    /*
    console.log(`Model Class: ${data.model_class}`);
    console.log(`ID: ${data.id}`);
    console.log(`Name: ${data.name}`);
    console.log(`Version: ${data.version}`);
    console.log(`Description: ${data.description}`);

    tool_description.id = data.id
    tool_description.name = data.name
    tool_description.version = data.version
    tool_description.description = data.description

    console.log("Inputs:");
    data.inputs.forEach((input, index) => {
      console.log(`  Input ${index + 1}:`);
      console.log(`    Name: ${input.name}`);
      console.log(`    Type: ${input.type}`);
      console.log(`    Label: ${input.label}`);
      console.log(`    Value: ${input.text_value}`);
      if (input.options && input.options.length > 0) {
        console.log(`    Options: ${JSON.stringify(input.options)}`);
      }

      tool_inputs.push({name: input.name, type: input.type, label: input.label});
    });

    data.inputs.forEach(input => {
      const inputObject = {};

      Object.entries(input).forEach(([key, value]) => {
        inputObject[key] = value;
      });

      tool_inputs.push(inputObject);
    });


    const store = useStore();

    const tool_description = computed(() => store.getters["tools/selectedTool"]);

    const tool_inputs = computed(() => {
      if (!tool_description.value || !tool_description.value.inputs) {
        return [];
      }
      return tool_description.value.inputs.map((input) => ({
        ...input,
        value: input.defaultValue || "",
      }));
    });

    const formData = reactive({});

    watch(
        tool_inputs,
        (newInputs) => {
          newInputs.forEach((input) => {
            if (!(input.name in formData)) {
              formData[input.name] = input.value || "";
            }
          });
        },
        { immediate: true }
    );
    */

    const store = useStore();

    const tool_description_from_store = computed(() => store.getters["tools/selectedTool"]);
    console.log(tool_description_from_store);

    console.log("----------")
    const selected_history = computed(() => store.getters["histories/selectedHistory"]);
    console.log(selected_history);

    let hydrated_tool = null;

    const handleSubmit = () => {
      console.log("Form submitted with data:");
      console.log(tool_inputs.value);

      let state_inputs = toRaw(hydrated_tool.state_inputs);

      /*
      raw_inputs_value.forEach((input) => {
        if(typeof input === "string") {}
        if (state_inputs.hasOwnProperty(input.name)) {
          state_inputs[input.name] = input.text_value;
        }
      });
      */

      for(const key in state_inputs) {
        if(tool_inputs.value[key] !== 'undefined') {
          state_inputs[key] = tool_inputs.value[key];
        }
      }

      console.log(state_inputs);

      console.log(selected_history);

      galaxyToolService.runTool(hydrated_tool.id, hydrated_tool.version, selected_history?.value.id, state_inputs);
      galaxyToolService.uploadFile();
    };

    const updateContent = async (tool) => {

      tool_inputs.value = [];

      console.log(selected_history?.value);
      const selected_history_raw = selected_history?.value;

      console.log(selected_history_raw);

      hydrated_tool =  await galaxyToolService.fetchToolHydrated(tool.id, selected_history_raw.id);

      console.log(hydrated_tool);

      tool_description.value.id = tool.id
      tool_description.value.name = tool.name
      tool_description.value.version = tool.version
      tool_description.value.description = tool.description

      console.log("Inputs:");
      hydrated_tool.inputs.forEach((input, index) => {
        console.log(`Input ${index + 1}:`);
        console.log(`Name: ${input.name}`);
        console.log(`Type: ${input.type}`);
        console.log(`Label: ${input.label}`);
        console.log(`Value: ${input.text_value}`);
        if (input.options && input.options.length > 0) {
          console.log(`Options: ${JSON.stringify(input.options)}`);
        }

        //tool_inputs.push({name: input.name, type: input.type, label: input.label});
      });

      hydrated_tool.inputs.forEach(input => {
        const inputObject = {};

        Object.entries(input).forEach(([key, value]) => {
          inputObject[key] = value;
        });

        tool_inputs.value.push(inputObject);
      });
    };

    return {
      tool_description,
      tool_inputs,
      tool_description_from_store,
      handleSubmit,
      selected_history,
      updateContent,
      hydrated_tool
    };
  },
  computed: {
    ...mapGetters("tools", ["selectedTool"]),
  },
  watch: {
    selectedTool(selected_tool, old_tool) {
      console.log("Selected tool changed:", selected_tool);
      if(selected_tool.panel_section_name !== "MMODA Tools") {
        this.updateContent(selected_tool);
      }
    },
  },
  methods: {

  },

};
</script>

<style scoped>
.tool-card {
  display: flex;
  flex-direction: column;
  /*max-width: 800px;*/
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 20px auto;
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

.form-container {
  width: 300px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: left;
}

.form-container-tool {
  width: 300px;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: left;
}

.form-container label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.form-container input[type="text"],
.form-container input[type="number"],
.form-container select,
.form-container input[type="checkbox"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-container input[type="checkbox"] {
  width: auto;
}

.form-container button {
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

.form-container button:hover {
  background-color: #45a049;
}
</style>