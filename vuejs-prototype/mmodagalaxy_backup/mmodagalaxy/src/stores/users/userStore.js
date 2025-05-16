import User from '@/models/User'

export default {
    namespaced: true,
    state: () => ({
        user: new User()
    }),
    mutations: {
        SET_SESSION_ID(state, sessionId) {
            state.user.session_id = sessionId;
        },
        SET_TOKEN(state, token) {
            state.user.token = token;
        },
        RESET_USER(state) {
            state.user = new User();
        }
    },
    actions: {
        setSession({ commit }, sessionId) {
            commit('SET_SESSION_ID', sessionId);
        },
        setToken({ commit }, token) {
            commit('SET_TOKEN', token);
        },
        resetUser({ commit }) {
            commit('RESET_USER');
        }
    },
    getters: {
        getUser: (state) => state.user,
        getSessionId: (state) => state.user.session_id,
        getToken: (state) => state.user.token
    }
}
