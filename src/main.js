// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vue2TouchEvents from 'vue2-touch-events'
import vueAwesomeCountdown from 'vue-awesome-countdown'
import VueSession from 'vue-session'
import VueMask from 'v-mask'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'es6-promise/auto'

import store from './store/store'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vue2TouchEvents)
Vue.use(vueAwesomeCountdown, 'vac') // Component name, `countdown` and `vac` by default
Vue.use(VueMask, {
  placeholders: {
    H: /[A-Za-záéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÕ]+$/
  }
})

var options = { persist: true } //  Determine whether the data stored in the session may persist between tabs and browser instances.
Vue.use(VueSession, options)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store,
  components: { App }
})
