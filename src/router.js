import Vue from 'vue'
import Router from 'vue-router'
import LoginContainer from './components/Login/container'
import userRoutes from './components/Users/routes'
import categoryRoutes from './components/Categories/routes'
import pestRoutes from './components/Pests/routes'
import resultsRoutes from './components/Results/routes'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL || '/',
  routes: [
    {
      path: '/',
      redirect: '/predictions_results'
    },
    {
      path: '/login',
      component: LoginContainer
    },
    ...userRoutes,
    ...categoryRoutes,
    ...pestRoutes,
    ...resultsRoutes
  ]
})
