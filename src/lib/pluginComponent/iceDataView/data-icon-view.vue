<style>
.data-icon-view {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  height: 100%;
}
.data-icon-view > .icon-view-item {
  transition: all 1s, background-color 0.1s;
  position: relative;
  margin-left: 10px;
  padding: 8px 3px 3px;
  /* cursor: pointer; */
}
.data-icon-view > .icon-view-item:hover {
  background-color: #e6faff;
}
.data-icon-view > .icon-view-item > .iconViewItem-icon {
  position: relative;
  width: 70%;
  margin: 0 auto;
  /* background-color: #e4f5ff; */
  text-align: center;
}
.data-icon-view > .icon-view-item > .iconViewItem-icon > i {
  width: 48px;
  height: 48px;
}
.data-icon-view > .icon-view-item > .iconViewItem-name {
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
<template>
  <div
    class="data-icon-view"
    @click.stop="outterViewClick($event)"
  >
    <div
      style="width: 90px; height: 100px;"
      class="icon-view-item"
      v-for="(item, index) in viewDataCpt"
      :key="index"
      :title="item.name + '\n类型：' + item.type + '\n大小：' + item.size"
      @click.stop="iconViewClick(item, $event)"
    >
      <div class="iconViewItem-icon">
        <i
          v-if="item.iconUrl == undefined || item.iconUrl == null"
          :style="{backgroundImage: 'url(' + require('../../../assets/image/icon/lg/lg_' + item.iconType + '.png') + ')'}"
          class="ice-icon"
        ></i>
        <i
          v-else
          :style="{ backgroundImage: 'url(' + item.iconUrl + ')' }"
        ></i>
      </div>
      <div class="iconViewItem-name">{{ item.name }}</div>
    </div>
  </div>
</template>
<script>
import iceIconCss from '../../../assets/style/vue-ice-ui-icon.css'

const DataIconView = {
    name: 'DataIconView',
    props: {
        data: {
            type: Array
        }
    },
    data: function() {
        return {
            setViewData: [],
            setIconUrl: '',
            defaultIconUrl: require('../../../assets/image/icon/lg/lg_unknow.png')
        }
    },
    computed: {
        viewDataCpt: {
            get() {
                return this.setViewData
            },
            set(now) {
                this.setViewData = []
                this.setViewData.push(... now)
            }
        }
    },
    methods: {
      iconViewClick(item, ev) {
        let getItemBox = ev.target
        let box
        while(getItemBox.getAttribute('class') !== 'icon-view-item'){
          box = getItemBox.parentElement
          getItemBox = box
        }
        let prevElement = getItemBox.previousSibling
        let nextElement = getItemBox.nextSibling
        const siblings = []
        while(prevElement){
          siblings.push(prevElement)
          prevElement = prevElement.previousSibling
        }
        while(nextElement){
          siblings.push(nextElement)
          nextElement = nextElement.nextSibling
        }
        for (const item of siblings) {
          item.style.backgroundColor = null
        }
        getItemBox.style.backgroundColor = '#8fcaff'
      },
      outterViewClick(ev) {
        const iconElements = ev.target.getElementsByClassName('icon-view-item')
        for (const domIcon of iconElements) {
          domIcon.style.backgroundColor = null
        }
      }
    },
    created() {
      let urlRequire
      for(let i of this.data) {
        try {
          urlRequire = require('../../../assets/image/icon/lg/lg_' + i.iconType + '.png')
          this.setViewData.push(i)
        } catch (error) {
          i.iconType = 'unknow'
          this.setViewData.push(i)
        }
      }
    },
}

export default DataIconView
</script>
