import MMODAJob from '@/models/MMODAJob.js'

export default {
    namespaced: true,
    state: () => ({
        jobs: []
    }),
    mutations: {
        ADD_JOB(state, { internal_id, parameters }) {
            const job = new MMODAJob(internal_id, parameters)
            state.jobs.push(job)
        },
        REMOVE_JOB(state, internal_id) {
            state.jobs = state.jobs.filter(job => job.internal_id !== internal_id)
        },
        CLEAR_JOBS(state) {
            state.jobs = []
        }
    },
    actions: {
        addJob({ commit }, { internal_id, parameters }) {
            commit('ADD_JOB', { internal_id, parameters })
        },
        removeJob({ commit }, internal_id) {
            commit('REMOVE_JOB', internal_id)
        },
        clearJobs({ commit }) {
            commit('CLEAR_JOBS')
        }
    },
    getters: {
        allJobs: (state) => state.jobs,
        getJobById: (state) => (id) => state.jobs.find(job => job.internal_id === id)
    }
}
