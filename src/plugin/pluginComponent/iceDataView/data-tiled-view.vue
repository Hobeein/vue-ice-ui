<style>
.data-tiled-view {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  height: 100%;
}
.data-tiled-view .tiledView-item {
  position: relative;
  height: 55px;
  width: 170px;
  padding: 3px 8px 3px 32px;
  display: flex;
}
.data-tiled-view .tiledView-item:hover {
  background-color: #e6faff;
}
.data-tiled-view .tiledView-item > i {
  width: 48px;
  height: 48px;
  top: 0;
}
.data-tiled-view .tiledView-item > .tiledItem-info {
  position: relative;
  height: 100%;
  width: calc(100% - 56px);
  margin-left: 8px;
}
.data-tiled-view .tiledView-item > .tiledItem-info > .tiledInfo-name,
.data-tiled-view .tiledView-item > .tiledItem-info > .tiledInfo-type,
.data-tiled-view .tiledView-item > .tiledItem-info > .tiledInfo-size {
  text-overflow: ellipsis;
  overflow: hidden;
  height: 18px;
  font-size: 15px;
}
.data-tiled-view .tiledView-item > .tiledItem-info > .tiledInfo-type,
.data-tiled-view .tiledView-item > .tiledItem-info > .tiledInfo-size {
  color: #8a8a8a;
  font-size: 14px;
}
</style>
<template>
  <div
    class="data-tiled-view"
    @click.stop="outterViewClick($event)"
  >
    <div
      class="tiledView-item"
      v-for="(item, index) in viewDataCpt"
      :key="index"
      @click.stop="tiledItemClick(item, $event)"
    >
      <i
        class="ice-icon"
        :style="{ backgroundImage: 'url(' + require('../../../assets/image/icon/lg/lg_' + item.iconType + '.png') + ')' }"
      ></i>
      <div class="tiledItem-info">
        <div class="tiledInfo-name">
          <span>{{ item.name }}</span>
        </div>
        <div class="tiledInfo-type">
          <span>{{ item.type }}</span>
        </div>
        <div class="tiledInfo-size">
          <span>{{ item.size }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import iceIconCss from '../../../assets/style/vue-ice-ui-icon.css'

const DataTiledView = {
    name: 'DataTiledView',
    props: {
        data: {
            type: Array
        }
    },
    data: function() {
        return {
            setViewData: []
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
        tiledItemClick(item, ev) {
            let getTiledBox = ev.target
            let box
            while (getTiledBox.getAttribute('class') !== 'tiledView-item') {
                box = getTiledBox.parentElement
                getTiledBox = box
            }
            let prevElement = getTiledBox.previousSibling
            let nextElement = getTiledBox.nextSibling
            const siblings = []
            while(prevElement) {
                siblings.push(prevElement)
                prevElement = prevElement.previousSibling
            }
            while(nextElement) {
                siblings.push(nextElement)
                nextElement = nextElement.nextSibling
            }
            for (const item of siblings) {
                item.style.backgroundColor = null
            }
            getTiledBox.style.backgroundColor = '#8fcaff'
        },
        outterViewClick(ev) {
            const tiledElements = ev.target.getElementsByClassName('tiledView-item')
            for (const domTiled of tiledElements) {
                domTiled.style.backgroundColor = null
            }
        }
    },
    created() {
        let urlRequire
        for(const i of this.data) {
            try {
                urlRequire = require('../../../assets/image/icon/md/md_' + i.iconType + '.png')
                this.setViewData.push(i)
            } catch (error) {
                i.iconType = 'unknow'
                this.setViewData.push(i)
            }
        }
    },
}

export default DataTiledView
</script>
