<style>
.data-content-view {
  position: relative;
  width: 100%;
  height: 100%;
}
.data-content-view .contentView-item {
  position: relative;
  width: calc(100% - 35px);
  height: 32px;
  padding: 8px 0 8px 35px;
  display: flex;
  border-bottom: #cccccc solid thin;
}
.data-content-view .contentView-item:hover {
  background-color: #e6faff;
}
.data-content-view .contentView-item > i {
  width: 32px;
  height: 32px;
  top: 0;
}
.data-content-view .contentView-item > .contentItem-info {
  position: relative;
  width: calc(100% - 20px);
  padding-left: 20px;
  height: 100%;
  display: flex;
}
.data-content-view
  .contentView-item
  > .contentItem-info
  > .itemInfo-nameAndCreater {
  position: relative;
  width: 45%;
  height: 100%;
}
.data-content-view
  .contentView-item
  > .contentItem-info
  > .itemInfo-typeAndSize {
  position: relative;
  width: 25%;
  height: 100%;
}
.data-content-view
  .contentView-item
  > .contentItem-info
  > .itemInfo-createAndUpdataTime {
  position: relative;
  width: 30%;
  height: 100%;
}
.data-content-view .contentView-item > .contentItem-info .infoDetails {
  position: relative;
  height: 19px;
  width: 100%;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
}
.data-content-view
  .contentView-item
  > .contentItem-info
  .infoDetails.content-itemInfo-name {
  font-size: 17px;
}
.data-content-view .contentView-item > .contentItem-info .infoDetails > label {
  color: #979797;
}
</style>
<template>
  <div
    class="data-content-view"
    @click.stop="outterViewClick($event)"
  >
    <div
      class="contentView-item"
      v-for="(item, index) in viewDataCpt"
      :key="index"
      @click.stop="contentItemClick(item, $event)"
    >
      <i
        class="ice-icon"
        :style="{ backgroundImage: 'url(' + require('../../../assets/image/icon/md/md_' + item.iconType + '.png') + ')' }"
      ></i>
      <div class="contentItem-info">
        <div class="itemInfo-nameAndCreater">
          <div
            v-if="item.name"
            class="infoDetails content-itemInfo-name"
          >
            <span>{{ item.name }}</span>
          </div>
          <div
            v-if="item.creater"
            class="infoDetails content-itemInfo-creater"
          >
            <label>creater:</label>
            <span>{{ item.creater }}</span>
          </div>
        </div>
        <div class="itemInfo-typeAndSize">
          <div
            v-if="item.type"
            class="infoDetails content-itemInfo-type"
          >
            <label>type:</label>
            <span>{{ item.type }}</span>
          </div>
          <div
            v-if="item.size"
            class="infoDetails content-itemInfo-size"
          >
            <label>size:</label>
            <span>{{ item.size }}</span>
          </div>
        </div>
        <div class="itemInfo-createAndUpdateTime">
          <div
            v-if="item.createTime"
            class="infoDetails content-itemInfo-createTime"
          >
            <label>create time:</label>
            <span>{{ item.createTime }}</span>
          </div>
          <div
            v-if="item.updateTime"
            class="infoDetails content-itemInfo-updateTime"
          >
            <label>update time:</label>
            <span>{{ item.updateTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import iceIconCss from '../../../assets/style/vue-ice-ui-icon.css'

const DataContentView = {
    name: 'DataContentView',
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
        contentItemClick(item, ev) {
            let getContentBox = ev.target
            let box
            while (getContentBox.getAttribute('class') !== 'contentView-item') {
                box = getContentBox.parentElement
                getContentBox = box
            }
            let prevElement = getContentBox.previousSibling
            let nextElement = getContentBox.nextSibling
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
            getContentBox.style.backgroundColor = '#8fcaff'
        },
        outterViewClick(ev) {
            const contentElements = ev.target.getElementsByClassName('contentView-item')
            for (const domContent of contentElements) {
                domContent.style.backgroundColor = null
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

export default DataContentView
</script>
