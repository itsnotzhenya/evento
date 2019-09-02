import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './permission'
import Vue from 'vue'
import ElementUI from 'element-ui'
import '../theme/index.css'
import './assets/fonts.css'
import locale from 'element-ui/lib/locale/lang/ru-RU'

Vue.config.productionTip = false

Vue.use(ElementUI, { locale })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
