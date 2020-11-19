import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getItem('TOKEN_KEY')
  },
  mutations: {
    setUser (state, user) {
      state.token = user
      setItem('TOKEN_KEY', state.token)
    }
  },
  actions: {
  },
  modules: {
  }
})
