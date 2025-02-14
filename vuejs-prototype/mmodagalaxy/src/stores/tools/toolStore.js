import galaxyToolService from "@/services/GalaxyToolService.js"
import mmodaToolService from "@/services/MMODAToolService.js"

//import galaxy_tools from "@/data/tools.json";
import mmoda_tools from "@/data/mmoda_tools.json"


export default {
    namespaced: true,
    state: {
        tools: [],
        selectedTool: null,
    },
    mutations: {
        SET_TOOLS(state, tools) {
            state.tools = tools;
        },
        SET_SELECTED_TOOL(state, tool) {
            console.log(tool);
            state.selectedTool = tool;
        },
    },
    actions: {
        fetchTools1({ commit }) {
            /*
            const tools = {};

            const galaxy_tools = galaxyToolService.fetchTools();
            const mmoda_tools = "";

            tools.value = galaxy_tools.flatMap((section) =>
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


            const galaxy_tools = galaxyToolService.fetchTools();
            //const mmoda_tools = mmodaToolService.fetchTools();
            const mmoda_tools = [];

            const tools = {...mmoda_tools, ...galaxy_tools}

            commit("SET_TOOLS", tools);
            */

        },
        async fetchTools({ commit }) {
            try {

                const galaxyTools = await galaxyToolService.fetchTools();
                //const mmodaTools = await mmodaToolService.fetchTools();

                const formattedGalaxyTools = galaxyTools.flatMap((section) =>
                    section.elems.map((tool) => ({
                        id: tool.id,
                        name: tool.name,
                        version: tool.version,
                        description: tool.description,
                        panel_section_name: section.name,
                    }))
                );

                const formattedMMODATools = mmoda_tools.map((tool) => ({
                    id: tool,
                    name: tool,
                    version: 1,
                    description: "MMODA Tool",
                    panel_section_name: "MMODA Tools",
                }));

                const combinedTools = [...formattedMMODATools, ...formattedGalaxyTools];

                commit("SET_TOOLS", combinedTools);
            } catch (error) {
                console.error("Error fetching tools:", error);

                const formattedMMODATools = mmoda_tools.map((tool) => ({
                    id: tool,
                    name: tool,
                    version: 1,
                    description: "MMODA Tool",
                    panel_section_name: "MMODA Tools",
                }));

                const combinedTools = [...formattedMMODATools];

                commit("SET_TOOLS", combinedTools);
            }
        },
        selectTool({ commit }, tool) {
            commit("SET_SELECTED_TOOL", tool);
        },
    },
    getters: {
        tools: (state) => state.tools,
        selectedTool: (state) => state.selectedTool,
    },
};