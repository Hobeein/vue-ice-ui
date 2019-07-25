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
    enter-active-class="animateCss bounceIn"
    leave-active-class="animateCss bounceOut"
  >
    <div
      v-show="windowShow"
      class="win10-style-window"
      :style="windowShowStyle"
    >
      <window-head-bar
        v-drag
        class="head-bar"
        @closeClicked="afterCloseClick"
        @maximize-click="maximizeBtnClick"
      />
      <div class="body-content">
        <h1>{{ titleProp }}</h1>
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
        }
    },
    computed: {
        widthProp: {
            get: function() {
                return this.width
            },
            set: function(now) {
                this.width = now
            }
        },
        heightProp: {
            get: function() {
                return this.height
            },
            set: function(now) {
                this.height = now
            }
        },
        titleProp: {
            get: function() {
                return this.title
            },
            set: function(now) {
                this.title = now
            }
        },
        topProp: {
            get: function() {
                return this.top
            },
            set: function(now) {
                this.top = now
            }
        },
        leftProp: {
            get: function() {
                return this.left
            },
            set: function(now) {
                this.left = now
            }
        },
        identityProp: {
            get: function() {
                return this.identity
            },
            set: function(now) {
                this.identity = now
            }
        },
        setAnimateTimeProp: {
            get: function() {
                return this.setAnimateTime
            },
            set: function(now) {
                this.setAnimateTime = now
            }
        },
        windowShowStyle: {
            get: function() {
                console.log(this.width)
                return {
                    width: this.widthProp + 'px',
                    height: this.heightProp + 'px',
                    top: this.topProp + 'px',
                    left: this.leftProp + 'px',
                    animationDuration: (this.setAnimateTimeProp/1000) + 's'
                }
            },
            // set: function(now) {
            //     console.log(now)
            //     return {
            //         width: this.widthProp + 'px',
            //         height: this.heightProp + 'px',
            //         top: this.topProp + 'px',
            //         left: this.leftProp + 'px',
            //         animationDuration: (this.setAnimateTimeProp/1000) + 's'
            //     }
            // }
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
            lastLeft: 0
        }
    },
    methods: {
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
                this.lastTop = this.topProp
                this.lastLeft = this.leftProp
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
