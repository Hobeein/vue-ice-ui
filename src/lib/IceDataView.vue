<style>
.ice-data-view {
  position: relative;
  width: 100%;
  height: 100%;
}
.ice-data-view .view {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
<template>
  <div class="ice-data-view">
    <div
      v-if="viewTypeCpt === 'list'"
      class="list-view view"
    >
      <data-list-view :data="viewDataCpt"></data-list-view>
    </div>
    <div
      v-show="viewTypeCpt === 'icon'"
      class="icon-view view"
    >
      <data-icon-view :data="viewDataCpt"></data-icon-view>
    </div>
    <div
      v-show="viewTypeCpt === 'tiled'"
      class="tiled-view view"
    >
      <data-tiled-view :data="viewDataCpt"></data-tiled-view>
    </div>
    <div
      v-show="viewTypeCpt === 'content'"
      class="content-view view"
    >
      <data-content-view :data="viewDataCpt"></data-content-view>
    </div>
  </div>
</template>
<script>
import dataListView from './pluginComponent/iceDataView/data-list-view.vue'
import dataIconView from './pluginComponent/iceDataView/data-icon-view.vue'
import dataTiledView from './pluginComponent/iceDataView/data-tiled-view.vue'
import dataContentView from './pluginComponent/iceDataView/data-content-view.vue'

const IceDataView = {
    name: 'IceDataView',
    props: {
        type: {
            type: String,
            default: 'list'
        },
        data: {
          type: Array,
          default: () => {
            return []
          }
        }
    },
    components: {
        dataListView,
        dataIconView,
        dataTiledView,
        dataContentView
    },
    data: function() {
        return {
            viewType: 'list',
            setViewData: []
        }
    },
    computed: {
        viewTypeCpt: {
            get() {
                return this.viewType
            },
            set(now) {
                this.viewType = now
            }
        },
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
        changeType: function(newViewType) {
            this.viewTypeCpt = newViewType
        }
    },
    created() {
      this.viewType = this.type
      this.setViewData.push(... this.data)
    }
}

export default IceDataView
</script>
