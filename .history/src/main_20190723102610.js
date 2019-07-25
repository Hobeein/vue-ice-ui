import Vue from 'vue'
import App from './App.vue'
import vueWin10Style from './plugin/index.js'
import animateCss from 'animate.css'

Vue.use(vueWin10Style)
Vue.use(animateCss)

new Vue({
  el: '#app',
  render: h => h(App)
})
