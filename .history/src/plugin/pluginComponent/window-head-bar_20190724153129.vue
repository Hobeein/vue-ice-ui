<style>
.window-head-bar {
  position: relative;
  width: 100%;
  height: 40px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.15);
}
.left-button-group {
  position: absolute;
  height: 100%;
  width: auto;
  right: 0;
}
.left-button-group > ul {
  list-style: none;
  display: flex;
  position: relative;
  height: 100%;
  width: 130px;
  padding: 0;
  margin: 0;
}
.left-button-group > ul > li {
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0 0;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
</style>
<template>
  <div class="window-head-bar">
    <div
      @mousedown.stop="handleMousedown"
      class="left-button-group"
    >
      <ul>
        <li
          :style="mini"
          @mouseover="handleMouseOver('mini')"
          @mouseleave="handleMouseOut('mini')"
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
        handleCloseClick(){
            this.$emit("closeClicked")
        },
        handleMousedown(){},
        handleMaximize(){
          console.log(this.maxIcon)
          if(this.maxIcon.iconName === "square"){
            this.maxIcon = faWindowRestore
          }else{
            this.maxIcon = faSquare
          }
        }
    }
}
</script>
