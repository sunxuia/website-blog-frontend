import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: {},
        history: []
    },
    getters: {
        user: state => state.user,
        history: state => state.history
    },
    mutations: {
        setUser (state, user) {
            state.user = user
        },
        addHistory (state, from) {
            state.history.push(from)
        }
    }
})

export default store
