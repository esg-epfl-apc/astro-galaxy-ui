import galaxyHistoryService from "@/services/GalaxyHistoryService";

const state = {
    histories: [],
    selectedHistory: null,
};

const getters = {
    allHistories: (state) => state.histories,
    selectedHistory: (state) => state.selectedHistory,
};

const actions = {
    async fetchHistories({ commit }) {
        try {
            const data = await galaxyHistoryService.fetchHistories();

            const historiesWithContent = await Promise.all(
                data.map(async (history) => {
                    const content = await galaxyHistoryService.fetchHistoryContent(history.id);
                    history.datasets = content;
                    return {history};
                })
            );

            console.log("History Data Store Loop");
            console.log(data);

            commit("setHistories", data);
            return data;
        } catch (error) {
            console.error("Error fetching histories:", error);
        }
    },

    selectHistory({ commit }, history) {
        commit("setSelectedHistory", history);
    },
};

const mutations = {
    setHistories(state, histories) {
        state.histories = histories;
    },
    setSelectedHistory(state, history) {
        state.selectedHistory = history;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
