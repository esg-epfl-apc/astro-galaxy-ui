import { createStore } from "vuex";
import tools from "./tools/toolStore.js";
import histories from "./histories/historyStore.js";
import celestial_objects from "./celestial_objects/celestialObjectStore.js";
import mmoda_jobs from "@/stores/mmoda_jobs/jobStore.js";
import mmoda_job_results from "@/stores/mmoda_jobs/jobResultStore.js";
import users from "./users/userStore.js"

const store = createStore({
    modules: {
        tools,
        histories,
        celestial_objects,
        mmoda_jobs,
        mmoda_job_results,
        users
    },
});

export default store;