<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a
          href="https://vuejs.org"
          target="_blank"
        >Core Docs</a></li>
      <li><a
          href="https://forum.vuejs.org"
          target="_blank"
        >Forum</a></li>
      <li><a
          href="https://chat.vuejs.org"
          target="_blank"
        >Community Chat</a></li>
      <li><a
          href="https://twitter.com/vuejs"
          target="_blank"
        >Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a
          href="http://router.vuejs.org/"
          target="_blank"
        >vue-router</a></li>
      <li><a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >vuex</a></li>
      <li><a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >vue-loader</a></li>
      <li><a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >awesome-vue</a></li>
    </ul>

    <win10-style-window
      v-for="(item, index) in windowCount"
      :key="index"
      :identity="index"
      :top="100"
      :left="100"
      :width="700"
      :height="600"
      :setAnimateTime="1000"
      @closeListener="afterClose"
    ></win10-style-window>
    <button @click="handleBtnClick">写一些文字</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      windowCount: []
    }
  },
  methods: {
    handleBtnClick: function() {
      this.windowCount.push(1)
      const node = document.createElement('div')
      node.setAttribute('class', 'win10-style-window')
      node.setAttribute('identity', "myNode")
      node.setAttribute('width', 900)
      node.setAttribute('height', 700)
      this.$el.appendChild(node)
    },
    afterClose(index){
      console.log(index)
      this.$delete(this.windowCount, index)
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
