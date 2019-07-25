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
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(140, 157, 185, 0.41);
}
.head-bar {
  cursor: move;
}
</style>

<template>
  <transition
    :enter-active-class="'animateCss ' + enterZoom"
    :leave-active-class="'animateCss ' + leaveZoom"
  >
    <div
      v-show="windowShow"
      class="win10-style-window"
      :style="windowShowStyle"
    >
      <window-head-bar
        v-drag
        class="head-bar"
        :title="titleProp"
        @closeClicked="afterCloseClick"
        @maximize-click="maximizeBtnClick"
        @minimize-click="minimizeBtnClick"
      />
      <div
        v-html="customize"
        class="body-content"
      >
      </div>
    </div>
  </transition>
</template>

<script>
import windowHeadBar from './pluginComponent/window-head-bar'
const win10StyleWindow = {
    name: 'win10StyleWindow',
    props: {
        width: {
            type: Number,
            default: 500
        },
        height: {
            type: Number,
            default: 400
        },
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
        },
        customize: {
            type: String
        }
    },
    computed: {
        widthProp: {
            get: function() {
                this.width_data = this.width
                return this.width_data
            },
            set: function(now) {
                this.width_data = now
            }
        },
        heightProp: {
            get: function() {
                this.height_data = this.height
                return this.height_data
            },
            set: function(now) {
                this.height_data = now
            }
        },
        titleProp: {
            get: function() {
                this.title_data = this.title
                return this.title_data
            },
            set: function(now) {
                this.title_data = now
            }
        },
        topProp: {
            get: function() {
                this.top_data = this.top
                return this.top_data
            },
            set: function(now) {
                this.top_data = now
            }
        },
        leftProp: {
            get: function() {
                this.left_data = this.left
                return this.left_data
            },
            set: function(now) {
                this.left_data = now
            }
        },
        identityProp: {
            get: function() {
                this.identity_data = this.identity
                return this.identity_data
            },
            set: function(now) {
                this.identity_data = now
            }
        },
        setAnimateTimeProp: {
            get: function() {
                this.setAnimateTime_data = this.setAnimateTime
                return this.setAnimateTime_data
            },
            set: function(now) {
                this.setAnimateTime_data = now
            }
        },
        windowShowStyle: {
            get: function() {
                return {
                    width: this.width_data + 'px',
                    height: this.height_data + 'px',
                    top: this.top_data + 'px',
                    left: this.left_data + 'px',
                    animationDuration: (this.setAnimateTime_data/1000) + 's'
                }
            }
        },
        enterZoomProp: {
            get: function() {
                return this.enterZoom
            },
            set: function(now) {
                this.enterZoom = now
            }
        },
        leaveZoomProp: {
            get: function() {
                return this.leaveZoom
            },
            set: function(now) {
                this.leaveZoom = now
            }
        }
    },
    components: {
        windowHeadBar
    },
    data: function() {
        return {
            windowShow: false,
            lastWidth: 500,
            lastHeight: 400,
            lastTop: 0,
            lastLeft: 0,
            width_data: 500,
            height_data: 400,
            title_data: "Vue的桌面风格窗口插件",
            top_data: 0,
            left_data: 0,
            identity_data: '',
            setAnimateTime_data: 1500,
            enterZoom: 'zoomIn',
            leaveZoom: 'zoomOut'
        }
    },
    methods: {
        animateZoomChange(status) {
            if(status === 'mini'){
                this.enterZoom = 'zoomInUp'
                this.leaveZoom = 'zoomOutDown'
            }else if(status === 'miniRevert'){
                this.enterZoom = 'zoomIn'
                this.leaveZoom = 'zoomOut'
            }
        },
        afterCloseClick(){
            let id = ((this.identityProp === undefined || this.identityProp === null || this.identityProp === "") ? "none identity set" : this.identityProp)
            this.windowShow = false
            setTimeout(() => {
                this.$emit("closeListener", id)
                this.$el.remove(0)
            }, this.setAnimateTimeProp)
        },
        maximizeBtnClick(flag){
            if(flag === 'square'){
                // 最大化
                this.lastWidth = this.widthProp
                this.lastHeight = this.heightProp
                this.lastTop = win10StyleWindow.positionY
                this.lastLeft = win10StyleWindow.positionX
                this.widthProp = window.innerWidth
                this.heightProp = window.innerHeight
                this.topProp = 0
                this.leftProp = 0
            }else{
                // 还原
                this.widthProp = this.lastWidth
                this.heightProp = this.lastHeight
                this.topProp = this.lastTop
                this.leftProp = this.lastLeft
            }
        },
        minimizeBtnClick() {
            this.animateZoomChange('mini')
            this.windowShow = false
        },
        minimizeRevert(){
            this.windowShow = true
            setTimeout(function() {
                this.animateZoomChange('miniRevert')
            }, this.setAnimateTimeProp)
        }
    },
    mounted: function() {
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
        this.width_data = this.width
        this.height_data = this.height
        this.title_data = this.title
        this.top_data = this.top
        this.left_data = this.left
        this.identity_data = this.identity
        this.setAnimateTime_data = this.setAnimateTime
        win10StyleWindow.positionX = this.left
        win10StyleWindow.positionY = this.top
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
