<style>
* {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
}
.ice-window {
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
    :enter-active-class="'animateCss ' + enterZoomProp"
    :leave-active-class="'animateCss ' + leaveZoomProp"
  >
    <div
      v-show="windowShow"
      class="ice-window"
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
      <slot />
    </div>
  </transition>
</template>

<script>
import windowHeadBar from './pluginComponent/iceWindow/window-head-bar'
import animateCss from 'animate.css'

const IceWindow = {
    name: 'IceWindow',
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
            default: 500
        },
        customContent: {
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
            /* 窗口显示值 */
            windowShow: false,
            /* 窗口上一次的显示状态保存 */
            lastWidth: 500,
            lastHeight: 400,
            lastTop: 0,
            lastLeft: 0,
            /* 窗口宽高 */
            width_data: 500,
            height_data: 400,
            /* 窗口标题 */
            title_data: "Vue的桌面风格窗口插件",
            /* 窗口左右距离 */
            top_data: 0,
            left_data: 0,
            /* 唯一身份验证 */
            identity_data: '',
            /* 动画时间 */
            setAnimateTime_data: 1500,
            /* 设置动画效果 */
            enterZoom: 'zoomIn',
            leaveZoom: 'zoomOut'
        }
    },
    methods: {
        /* 隐藏的动画切换 */
        animateZoomChange(status) {
            if(status === 'mini'){
                this.enterZoomProp = 'zoomInUp'
                this.leaveZoomProp = 'zoomOutDown'
            }else if(status === 'miniRevert'){
                this.enterZoomProp = 'zoomIn'
                this.leaveZoomProp = 'zoomOut'
            }
        },
        /* 关闭窗口 */
        afterCloseClick(){
            let id = ((this.identityProp === undefined || this.identityProp === null || this.identityProp === "") ? "none identity set" : this.identityProp)
            this.windowShow = false
            setTimeout(() => {
                this.$emit("closeListener", id)
                this.$el.remove(0)
            }, this.setAnimateTimeProp)
        },
        /* 最大化以及还原 */
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
        /* 最小化 */
        minimizeBtnClick() {
            this.animateZoomChange('mini')
            this.windowShow = false
            this.$emit('minimizeListener', this.identityProp)
        },
        /* 最小化还原 */
        minimizeRevert(){
            this.windowShow = true
            setTimeout(() => {
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
        IceWindow.positionX = this.left
        IceWindow.positionY = this.top
    },
    directives: {
        drag: {
            bind: function(el) {
                el.onmousedown = (e) => {
                    const thisWindow = el.parentNode
                    const windowParent = thisWindow.offsetParent
                    let ox = e.offsetX
                    let oy = e.offsetY
                    document.onmousemove = (e) => {
                        let cx = e.clientX - windowParent.offsetLeft
                        let cy = e.clientY - windowParent.offsetTop
                        let left = cx - ox
                        let top = cy - oy
                        IceWindow.positionX = left
                        IceWindow.positionY = top
                        thisWindow.style.left = left + 'px'
                        thisWindow.style.top = top + 'px'
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
export default IceWindow
</script>
