import MMODAJobResult from '@/models/MMODAJobResult.js'

export default {
    namespaced: true,
    state: () => ({
        jobResults: []
    }),
    mutations: {
        ADD_JOB_RESULT(state, rawData) {
            const jobResult = new MMODAJobResult(rawData);
            state.jobResults.push(jobResult);
        },
        REMOVE_JOB_RESULT(state, jobId) {
            state.jobResults = state.jobResults.filter(j => j.getJobId() !== jobId);
        },
        CLEAR_JOB_RESULTS(state) {
            state.jobResults = [];
        }
    },
    actions: {
        addJobResult({ commit }, data) {
            commit('ADD_JOB_RESULT', data);
        },
        removeJobResult({ commit }, jobId) {
            commit('REMOVE_JOB_RESULT', jobId);
        },
        clearAll({ commit }) {
            commit('CLEAR_JOB_RESULTS');
        }
    },
    getters: {
        getAll: (state) => state.jobResults,
        getByJobId: (state) => (id) =>
            state.jobResults.find(j => j.getJobId() === id),
        getRunningJobs: (state) =>
            state.jobResults.filter(j => !j.isDone() && !j.isFailed()),
        getCompletedJobs: (state) =>
            state.jobResults.filter(j => j.isDone()),
        getFailedJobs: (state) =>
            state.jobResults.filter(j => j.isFailed())
    }
}
