<style>
.window-head-bar {
  position: relative;
  width: 100%;
  height: 40px;
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
  width: 40px;
  margin: 0 3px;
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
        >1</li>
        <li
          :style="max"
          @mouseover="handleMouseOver('max')"
        >2</li>
        <li
          :style="close"
          @mouseover="handleMouseOver('close')"
        >3</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
    name: 'windowHeadBar',
    data: function() {
        return {}
    },
    methods: {
        handleMouseOver: function(instruct) {
            if (instruct === 'mini') {
                console.log('操作窗口执行缩小到最小化')
            }else if(instruct === 'max') {
                console.log('操作窗口执行缩小到最大化')
            }else if(instruct === 'close') {
                console.log('操作窗口执行关闭窗口')
            }
        }
    }
}
</script>
