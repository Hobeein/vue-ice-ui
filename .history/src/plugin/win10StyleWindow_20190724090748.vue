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
  width: 500px;
  height: 400px;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(140, 157, 185, 0.41);
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
      :style="{top: top + 'px', left: left + 'px', 'animate-duration': (setAnimateTime/1000) + 's'}"
    >
      <window-head-bar
        v-drag
        class="head-bar"
        @closeClicked="afterCloseClick"
      />
      <div class="body-content">
        <h1>{{ title }}</h1>
      </div>
    </div>
  </transition>
</template>

<script>
import windowHeadBar from './pluginComponent/window-head-bar'
const win10StyleWindow = {
    name: 'win10StyleWindow',
    props: {
        title: {
            type: String,
            default: "Vue的桌面风格窗口插件"
        },
        top: {
            type: Number,
            default: 0
        },
        left: {
            type: Number,
            default: 0
        },
        identity: {
            required: true
        },
        setAnimateTime: {
            type: Number,
            default: 1500
        }
    },
    components: {
        windowHeadBar
    },
    data: function() {
        return {
            windowShow: false
        }
    },
    methods: {
        afterCloseClick(){
            const setTime = this.setAnimateTime >= 1500 ? 700 : this.setAnimateTime
            let id = ((this.identity === undefined || this.identity === null || this.identity === "") ? "none identity set" : this.identity)
            this.windowShow = false
            setTimeout(() => {
                this.$emit("closeListener", id)
                this.$el.remove(0)
            }, setTime)
        }
    },
    mounted: function() {
        console.log(this.setAnimateTime)
        this.windowShow = true
        const elm = document.getElementsByClassName(this.$el.className)
        const count = elm.length
        if(count !== 1){
            this.$nextTick(() => {
                const lastTop = elm[count-2].style.top || 0
                const lastLeft = elm[count-2].style.left || 0
                this.$el.style.top = (Number.parseInt(lastTop) + 25) + 'px'
                this.$el.style.left = (Number.parseInt(lastLeft) + 45) + 'px'
            })
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
