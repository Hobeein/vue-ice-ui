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
  <transition name="fade">
    <div
      v-show="windowShow"
      class="win10-style-window"
    >
      <div class="headBar">
        <h1>Vue的win10风格插件测试</h1>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
    name: 'win10StyleWindow',
    data: function() {
        return {
            windowShow: false
        }
    },
    mounted: function() {
        this.windowShow = true
    }
}
</script>
