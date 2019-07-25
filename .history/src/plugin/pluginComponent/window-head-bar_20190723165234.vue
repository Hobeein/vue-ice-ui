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
    <div class="left-button-group">
      <ul>
        <li
          :style="mini"
          @mouseover="handleMouseOver('mini')"
          @mouseleave="handleMouseOut('mini')"
        >1</li>
        <li
          :style="max"
          @mouseover="handleMouseOver('max')"
          @mouseleave="handleMouseOut('max')"
        >2</li>
        <li
          :style="close"
          @mouseover="handleMouseOver('close')"
          @mouseleave="handleMouseOut('close')"
          @click="handleCloseClick"
        >3</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
    name: 'windowHeadBar',
    data: function() {
        return {
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
        }
    }
}
</script>
