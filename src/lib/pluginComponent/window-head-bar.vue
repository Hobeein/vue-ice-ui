<style>
.window-head-bar {
  position: relative;
  width: 100%;
  height: 40px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.15);
}
.right-button-group {
  position: absolute;
  height: 100%;
  width: auto;
  right: 0;
}
.right-button-group > ul {
  list-style: none;
  display: flex;
  position: relative;
  height: 100%;
  width: 130px;
  padding: 0;
  margin: 0;
}
.right-button-group > ul > li {
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0 0;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
.left-title-block {
  position: absolute;
  left: 0;
  width: auto;
  height: 100%;
  line-height: 40px;
  padding: 0 0 0 13px;
}
.left-title-block span {
  max-width: 250px;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 18px;
}
</style>
<template>
  <div class="window-head-bar">
    <div
      :title="title"
      class="left-title-block"
    >
      <span>{{ title }}</span>
    </div>
    <div
      @mousedown.stop="handleMousedown"
      class="right-button-group"
    >
      <ul>
        <li
          :style="mini"
          @mouseover="handleMouseOver('mini')"
          @mouseleave="handleMouseOut('mini')"
          @click="handleMinimize"
        >
          <font-awesome-icon :icon="miniIcon" />
        </li>
        <li
          :style="max"
          @mouseover="handleMouseOver('max')"
          @mouseleave="handleMouseOut('max')"
          @click="handleMaximize"
        >
          <font-awesome-icon :icon="maxIcon" />
        </li>
        <li
          :style="close"
          @mouseover="handleMouseOver('close')"
          @mouseleave="handleMouseOut('close')"
          @click.stop="handleCloseClick"
        >
          <font-awesome-icon :icon="closeIcon" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faWindowMinimize, faSquare, faWindowRestore } from '@fortawesome/free-regular-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default {
    name: 'windowHeadBar',
    components: {FontAwesomeIcon},
    props: ['title'],
    data: function() {
      return {
        miniIcon: faWindowMinimize,
        maxIcon: faSquare,
        closeIcon: faTimes,
        mini: {},
        max: {},
        close: {},
        mouseInStyle: {
            backgroundColor: 'red',
            color: 'white'
        },
        mouseOutStyle: {
            backgroundColor: '#00000000',
            color: 'black'
        }
      }
    },
    methods: {
        handleMouseOver: function(instruct) {
            this[instruct] = this.mouseInStyle
        },
        handleMouseOut: function(instruct) {
            this[instruct] = this.mouseOutStyle
        },
        handleCloseClick() {
            this.$emit("closeClicked")
        },
        handleMousedown() {},
        handleMaximize() {
          this.$emit("maximize-click", this.maxIcon.iconName)
          if(this.maxIcon.iconName === "square"){
            this.maxIcon = faWindowRestore
          }else{
            this.maxIcon = faSquare
          }
        },
        handleMinimize() {
          this.$emit('minimize-click')
        }
    }
}
</script>
