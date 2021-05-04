import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import 'font-awesome/css/font-awesome.min.css'
import VueHtml5Editor from 'vue-html5-editor'
import options from './utils/mdEdit'

Vue.use(ElementUI)
Vue.use(VueHtml5Editor, options)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
