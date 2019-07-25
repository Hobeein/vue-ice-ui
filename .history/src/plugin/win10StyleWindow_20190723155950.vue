<style>
* {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
}
.win10-style-window {
  position: absolute;
  top: 0;
  left: 0;
  width: 500px;
  height: 400px;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(140, 157, 185, 0.41);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 1.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.head-bar {
  cursor: move;
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
      <window-head-bar
        v-drag
        class="head-bar"
      />
      <div class="headBar">
        <h1>Vue的win10风格插件测试</h1>
      </div>
    </div>
  </transition>
</template>

<script>
import windowHeadBar from './pluginComponent/window-head-bar'
const win10StyleWindow = {
    name: 'win10StyleWindow',
    components: {
        windowHeadBar
    },
    data: function() {
        return {
            windowShow: false
        }
    },
    mounted: function() {
        this.windowShow = true
        const elm = document.getElementsByClassName(this.$el.className)
        const count = elm.length
        if(count !== 1){
            console.log(this)
            console.log(this.$el.style.top)
            const lastTop = elm[count-2].style.top
            const lastLeft = elm[count-2].style.left
            this.$el.style.top = (Number.parseInt(lastTop) + 25) + 'px'
            this.$el.style.left = (Number.parseInt(lastLeft) + 25) + 'px'
            console.log(lastTop, lastLeft)
        }
    },
    directives: {
        drag: {
            bind: function(el) {
                el.onmousedown = (e) => {
                    const parentWindow = el.parentNode
                    let ox = e.offsetX
                    let oy = e.offsetY
                    document.onmousemove = (e) => {
                        let cx = e.clientX
                        let cy = e.clientY
                        let left = cx - ox
                        let top = cy - oy
                        win10StyleWindow.positionX = left
                        win10StyleWindow.positionY = top
                        parentWindow.style.left = left + 'px'
                        parentWindow.style.top = top + 'px'
                    }
                    document.onmouseup = (e) => {
                        document.onmousemove = null
                        document.onmouseup = null
                    }
                }
            }
        }
    }
}
export default win10StyleWindow
</script>
