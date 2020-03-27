import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)

import axios from 'axios'
axios.defaults.baseURL = ''
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
