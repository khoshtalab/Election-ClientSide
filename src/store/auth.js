import axios from "axios";

export default {
    namespaced: true,
    state: {
        captchaTok: null,
        svgCaptcha: null,
        token: null,
        user: {
            firstName: null,
            lastName: null
        },

    },
    getters: {
        authenticated(state) {
            return state.token
        },
        user(state) {
            return state.user
        },
        captcha(state) {
            return state.svgCaptcha
        },
        captchaT(state) {
            return state.captchaTok
        }
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_USER(state, data) {
            state.user.firstName = data.firstname
            state.user.lastName = data.lastname
        },
        SET_CAPTCHA(state, data) {
            state.captchaTok = data.captok;
            state.svgCaptcha = data.svg.replace("\"", '"');
        }
    },
    actions: {
        async getCaptcha({commit}) {
            return axios.get('captcha').then((response) => {
                if (response.data.captok)
                    commit('SET_CAPTCHA', response.data)
            })
        },
        async login({dispatch}, credentials) {
            let response = await axios.post('Login', credentials)

            return dispatch('attempt', response.data)
        },
        async attempt({commit, state}, response) {
            if (response.status) {
                commit('SET_TOKEN', response.token)
                commit('SET_USER', response)
            }
            if (!state.token)
                return

        },

        logout({commit}) {
            commit('SET_TOKEN', null)
            commit('SET_USER', null)
        },


    },
}
