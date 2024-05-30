// import Vue from 'vue'
// import Vuex from 'vuex'
//
// Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hasLogin: false,
    userName: '',
    spring: {
      id: 0,
      extract: '',
      feature: ''
    },
    category: [],
    isMobile: false
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
    },
    setSpring(state, provider) {
      state.spring = provider
    },
    setMobile(state, provider) {
      state.isMobile = provider
    }
  },
  getters: {
    getHasLogin(state) {
      return state.hasLogin
    }
  }
})

export default store
