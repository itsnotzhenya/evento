import Vue from 'vue'
import Router from 'vue-router'
import LoginContainer from './components/Login/container'
import AnswerContainer from './components/Answers/container'
import userRoutes from './components/Users/routes'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL || '/',
  routes: [
    {
      path: '/',
      redirect: '/users'
    },
    {
      path: '/login',
      component: LoginContainer
    },
    {
      path: '/answers/:id',
      component: AnswerContainer
    },
    ...userRoutes
  ]
})
