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
            <button class="submit-button" @click="handleSubmit">Submit</button>
          </div>
        </div>
        <div class="column result-column">
          <component
              v-for="(comp, index) in components"
              :key="index"
              :is="comp.name"
              :data="comp.data"
              v-draggable
              @remove="removeComponent"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {computed, defineComponent, onMounted, onUnmounted, ref, watch} from "vue";
import { MMODAToolBuilderService } from "@/services/MMODAToolBuilderService.js";
import MMODAToolService from "@/services/MMODAToolService.js";
import mmoda_isgri_description from "@/data/mmoda_tool_detail_isgri.json";
import MMODAToolResult from "@/components/MMODAToolResult.vue";
import draggable from "@/directives/draggable.js";
import {useStore} from "vuex";

export default defineComponent({
  name: "MMODAToolContainer",
  directives: {
    draggable
  },
  components: {
    MMODAToolResult,
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
  setup(props, { emit }) {

    const tool_main_description = ref({
      name: ""
    });

    const store = useStore();

    const selectedTool = computed(() => store.getters["tools/selectedTool"]);

    //let toolBuilderService = new MMODAToolBuilderService(mmoda_isgri_description);

    //const mmodaToolService = new MMODAToolService();

    //let renderFunction = ref(toolBuilderService.generateRenderFunction());

    let renderFunction = ref();

    const components = ref([]);

    //updateTool(selectedTool.value);

    const updateTool = async (tool) => {
      console.log("Tool change", tool.name);

      const mmodaToolService = new MMODAToolService();
      const tool_description = await mmodaToolService.fetchToolDescription(tool.name);
      console.log("TOOLDESCRIPTION", tool_description);

      tool_main_description.value.name = tool_description[0][0].instrumet;

      const toolBuilderService = new MMODAToolBuilderService(tool_description);
      renderFunction.value = toolBuilderService.generateRenderFunction();
    };

    watch(selectedTool, (newTool, oldTool) => {
      if (newTool) {
        updateTool(newTool);
      }
    });

    onMounted(() => {
      if (selectedTool.value) {
        updateTool(selectedTool.value);
      }
    });

    onUnmounted(() => {

    });

    const removeComponent = (index) => {
      components.value.splice(index, 1);
    };

    const handleSubmit = () => {
      let form_data = getToolFormValues();
      console.log("form_data");
      console.log(form_data);
      console.log("tool__description");
      console.log(tool_main_description.value);
      addComponent();
      setupToolResultLoader(form_data, tool_main_description.value)
    }

    const getToolFormValues = () => {
      const container = document.getElementById('dynamic-inputs');
      const inputs = container.querySelectorAll('input, select, textarea');
      const form_data = {};

      inputs.forEach(input => {
        const name = input.name || input.id || input.getAttribute('data-name');
        if (!name) return;

        if (input.type === 'checkbox') {
          form_data[name] = input.checked;
        } else if (input.type === 'radio') {
          if (input.checked) {
            form_data[name] = input.value;
          }
        } else {
          form_data[name] = input.value;
        }
      });

      return form_data;
    }

    const addComponent = () => {
      components.value.push({
        name: "MMODAToolResult",
        json_data: { },
      });
    };

    const setupToolResultLoader = (form_data, tool_description) => {

      console.log("setup loader");

      //const form_data = getToolFormData();

      emit('show-modal', {
        component: 'MMODAResultLoader',
        props: {
          queryParameters: form_data,
          toolDescription: tool_description,
        }
      });
    }

    const getToolFormData = ()  => {
      let form_data = {};

      return form_data;
    }

    return {
      tool_main_description,
      renderFunction,
      components,
      handleSubmit,
      addComponent,
      removeComponent,
      setupToolResultLoader,
      getToolFormData,
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
  margin: 0 auto;
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
  background-color: #FFFFFF;
  position: relative;
}

* {
  user-select: none;
}

</style>
