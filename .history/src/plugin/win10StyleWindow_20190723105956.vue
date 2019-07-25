<style>
.win10-style-window {
  position: absolute;
  top: 0;
  left: 0;
  width: 500px;
  height: 400px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 1.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <transition
    enter-active-class="animateCss bounceIn"
    leave-active-class="animateCss bounceOut"
  >
    <div
      v-show="windowShow"
      class="win10-style-window"
    >
      <window-head-bar />
      <div class="headBar">
        <h1>Vue的win10风格插件测试</h1>
      </div>
    </div>
  </transition>
</template>

<script>
import windowHeadBar from './pluginComponent/window-head-bar'
export default {
    name: 'win10StyleWindow',
    component: {
        windowHeadBar
    },
    data: function() {
        return {
            windowShow: false
        }
    },
    mounted: function() {
        this.windowShow = true
        // setTimeout(() => {
        //     this.windowShow = false
        // }, 1000)
    }
}
</script>
