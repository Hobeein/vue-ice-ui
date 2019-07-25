import Vue from 'vue'
import App from './App.vue'
import vueWin10Style from './plugin/index.js'

Vue.use(vueWin10Style)

new Vue({
  el: '#app',
  render: h => h(App)
})
