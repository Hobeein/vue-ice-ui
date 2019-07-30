import iceWindow from './IceWindow.vue'
import iceTreeView from './IceTreeView.vue'

let vue_ice_ui = {
    install: function (Vue, options) {
        Vue.component(iceWindow.name, iceWindow)
        Vue.component(iceTreeView.name, iceTreeView)
    }
}

export default vue_ice_ui