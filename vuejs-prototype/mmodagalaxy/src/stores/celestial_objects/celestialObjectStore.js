export default {
    namespaced: true,
    state: {
        currentObject: null,
        previousObjects: [],
        formId: null,
    },
    mutations: {
        SET_CURRENT_OBJECT(state, object) {
            if (state.currentObject) {
                state.previousObjects.push(state.currentObject);
            }
            state.currentObject = object;
        },
        ADD_PREVIOUS_OBJECT(state, object) {
            if (object) {
                state.previousObjects.push(object);
            }
        },
        REMOVE_PREVIOUS_OBJECT(state, index) {
            if (index >= 0 && index < state.previousObjects.length) {
                state.previousObjects.splice(index, 1);
            }
        },
        SET_FORM_ID(state, id) {
            state.formId = id;
        },
    },
    actions: {
        updateCurrentObject({ commit }, object) {
            commit("SET_CURRENT_OBJECT", object);
        },
        fetchCurrentObject({ state }) {
            return state.currentObject;
        },
        updatePreviousObject({ commit }, object) {
            commit("ADD_PREVIOUS_OBJECT", object);
        },
        fetchPreviousObjects({ state }) {
            return state.previousObjects;
        },
        removePreviousObject({ commit }, index) {
            commit("REMOVE_PREVIOUS_OBJECT", index);
        },
        updateFormId({ commit }, formId) {
            commit("SET_FORM_ID", formId);
        },
        fetchFormId({ state }) {
            return state.formId;
        },
    },
    getters: {
        currentObject: (state) => state.currentObject,
        previousObjects: (state) => state.previousObjects,
        formId: (state) => state.formId,
    },
};
