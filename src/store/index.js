import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userName: '',
		category: []
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true
			state.userName = provider
		},
		logout(state) {
			state.hasLogin = false
			state.userName = ''
		},
		setCategory(state, provider) {
			state.category = provider
		}
	},
	getters: {
		getHasLogin(state) {
			return state.hasLogin
		},
		getCategory(state) {
			return state.category
		}
	}
})

export default store
