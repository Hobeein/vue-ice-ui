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
}
.left-button-group > ul > li {
  position: relative;
  height: 100%;
  width: 33%;
}
</style>
<template>
  <div class="window-head-bar">
    <div class="left-button-group">
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
    name: 'windowHeadBar',
    data: function() {
        return {}
    }
}
</script>
