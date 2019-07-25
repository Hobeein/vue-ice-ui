import win10Window from './win10StyleWindow.vue'

let winXWindow = {
    install: function (Vue, options) {
        Vue.component(win10Window.name, win10Window)
    }
}

export default winXWindow