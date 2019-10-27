import Vue from 'vue'
import Vuex from 'vuex'
import users from './users/index'
import menu from './menu/index'
import events from './events/index'
import app from './app'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    menu,
    events,
    app
  }
})
