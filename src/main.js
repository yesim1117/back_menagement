import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'element-ui/lib/theme-chalk/index.css'
import ElementUI, { MessageBox } from 'element-ui'
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(ElementUI)

import axios from 'axios'
// 配置请求的的根路径
axios.defaults.baseURL = 'http://120.53.16.101:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  // 拦截器
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
