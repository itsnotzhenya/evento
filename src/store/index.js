import Vue from 'vue'
import Vuex from 'vuex'
import users from './users/index'
import menu from './menu/index'
import app from './app'
import pests from './pests'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    menu,
    app,
    pests
  }
})
