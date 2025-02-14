import { createStore } from "vuex";
import tools from "./tools/toolStore.js";
import histories from "./histories/historyStore.js";
import celestial_objects from "./celestial_objects/celestialObjectStore.js";

const store = createStore({
    modules: {
        tools,
        histories,
        celestial_objects
    },
});

export default store;