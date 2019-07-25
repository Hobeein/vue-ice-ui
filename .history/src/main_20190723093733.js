import Vue from 'vue'
import App from './App.vue'
import vueWin10Window from './plugin/index.js'

Vue.use(vueWin10Window)

new Vue({
  el: '#app',
  render: h => h(App)
})
