<template>
  <section>
    <div class="container">
      <header class="custom-header">
        <h4 class="header-title">Tool List</h4>
      </header>

      <div id="tool-list-content">

        <div class="group-tool-section">
          <label id="section-select-label" for="sectionSelect">Choose Tool Section :</label>
          <div id="select-wrapper">
            <select id="section-select" v-model="selectedSection" @change="filterTools">
              <option v-for="section in panelSections" :key="section.panel_section_id" :value="section.panel_section_name">
                {{ section.panel_section_name }}
              </option>
            </select>
          </div>
        </div>

        <ul class="tools-list">
          <li v-for="tool in filteredTools" :key="tool.id" class="tool-item">
            <h3>{{ tool.name }} (Version: {{ tool.version }})</h3>
            <p>{{ tool.description }}</p>
            <button class="select-tool-button" @click="selectTool(tool)">Select {{ tool.name }}</button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import data from "@/data/tools.json";
import mmoda_tools from "@/data/mmoda_tools.json"
import { mapState, mapActions } from "vuex";
import {onMounted, ref, toRaw, watch} from "vue";
import store from "@/stores/index.js";

export default {
  name: "ToolList",

  setup(props, {emit}) {
    const selectedSection = ref("");
    const tools = ref([]);
    const panelSections = ref([]);
    const filteredTools = ref([]);

    const mmoda_panel = {
      panel_section_name: "MMODA Tools",
      panel_section_id: "MMODA Tools"
    }

    // const { fetchTools } = store.dispatch("tools/fetchTools");

    // onMounted(async() => {

    //   /*
    //   panelSections.value = data.map((section) => ({
    //     panel_section_name: section.name,
    //     panel_section_id: section.id,
    //   }));
    //   */

    //   try {
    //     await store.dispatch("tools/fetchTools");
    //     console.log("Fetched tools:");
    //     console.log(store.state.tools.tools);
    //     tools.value = store.state.tools.tools;

    //     const uniquePanelSections = new Set();

    //     tools.value.forEach((tool) => {
    //       const raw_tool = toRaw(tool);
    //       console.log(raw_tool.panel_section_name);
    //       if (raw_tool.panel_section_name) {
    //         uniquePanelSections.add(raw_tool.panel_section_name);
    //       }
    //     });

    //     panelSections.value = [...uniquePanelSections].map((sectionName, index) => ({
    //       panel_section_id: `section_${index}`,
    //       panel_section_name: sectionName,
    //     }));
    //     console.log("Panel sections:");
    //     console.log(uniquePanelSections);
    //     console.log(panelSections);

    //   } catch (error) {
    //     console.error("Error fetching tools:", error);
    //   }

    //   //panelSections.value.unshift(mmoda_panel);

    //   selectedSection.value = panelSections.value[0]?.panel_section_name || "";

    //   loadTools();
    // });


    const loadTools = () => {
      /*
      tools.value = data.flatMap((section) =>
          section.elems.map((tool) => ({
            id: tool.id,
            name: tool.name,
            version: tool.version,
            description: tool.description,
            panel_section_name: section.name
          }))
      );

      mmoda_tools.forEach((tool) => {
        tools.value.push({
          id: tool,
          name: tool,
          version: 1,
          description: "MMODA Tool",
          panel_section_name: "MMODA Tools",
        })
      })
      */

      filterTools();
    };

    const filterTools = () => {
      filteredTools.value = tools.value.filter(
          (tool) => tool.panel_section_name === selectedSection.value
      );
    };

    const selectTool = (tool) => {
      console.log(toRaw(tool));
      const raw_tool = toRaw(tool);
      let tool_platform = "";

      if(raw_tool.panel_section_name === "MMODA Tools") {
        tool_platform = "MMODA";
      } else {
        tool_platform = "Galaxy";
      }

      store.dispatch("tools/selectTool", raw_tool);

      const setActiveToolPlatform = (tool_platform) => {
        emit("update-active-tool", tool_platform);
        console.log(tool_platform);
      };

      setActiveToolPlatform(tool_platform)
    };

    watch(selectedSection, filterTools);

    return {
      selectedSection,
      panelSections,
      filteredTools,
      selectTool
    };
  },
  data() {
    return {
      active_tool_platform: "MMODA",
    }
  },
  methods: {
    setActiveToolPlatform(tool_platform) {
      console.log("platform event");
      this.active_tool_platform = tool_platform;
      this.$emit('update-active-tool', tool_platform);
    }
  }
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

#tool-list-content {
  padding: 20px;
}

.group-tool-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 2% 0 2% 0;
}

.group-tool-section label {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

#select-wrapper {
  position: relative;
  width: 250px;
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

.tools-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.tool-item {
  flex: 1 1 calc(25% - 20px);
  box-sizing: border-box;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
  max-width: calc(25% - 20px);
}

.tool-item h3 {
  margin: 0 0 10px 0;
}

.tool-item p {
  margin: 0 0 10px 0;
  color: gray;
}

.select-tool-button {
  background-color: #ffffff;
  color: #007d64;
  width: 100%;
  border: 2px solid #007d64;
  border-radius: 8px;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.select-tool-button:hover {
  background-color: #007d64;
  color: white;
}

@media (max-width: 768px) {
  .tool-item {
    flex: 1 1 calc(50% - 20px);
    max-width: calc(50% - 20px);
  }
}

@media (max-width: 480px) {
  .tool-item {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
</style>
