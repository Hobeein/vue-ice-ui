<style>
.data-list-view {
  position: relative;
  width: 100%;
  height: 100%;
}
.data-list-view > table > thead > tr > th {
  border-right: thin solid #d8d9da;
  font-size: 12px;
  color: #91b5c5;
  position: relative;
}
.data-list-view table th,
.data-list-view table td {
  box-sizing: content-box;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 5px 8px;
}
.data-list-view > table > tbody > tr:hover {
  background-color: #e6faff;
}
.data-list-view table td {
  font-size: 15px;
  color: #909090;
}
.data-list-view table td.tbody_td_fileName {
  color: #3b3b3b;
}
.data-list-view table td.tbody_td_fileName > i {
  width: 18px;
  height: 18px;
}
.data-list-view thead .resizeCtrl {
  position: absolute;
  width: 6px;
  height: 100%;
  top: 0px;
  right: 0px;
  cursor: col-resize;
}
</style>
<template>
  <div
    class="data-list-view"
    @click.stop="outterViewClick($event)"
  >
    <table
      cellspacing="0"
      :style="{tableLayout: 'fixed', width: 'calc(80% + 0px)'}"
    >
      <thead>
        <tr>
          <th id="col_1">名称<div
              id="resizeableCol_1"
              class="resizeCtrl"
            ></div>
          </th>
          <th id="col_2">修改日期<div
              id="resizeableCol_2"
              class="resizeCtrl"
            ></div>
          </th>
          <th id="col_3">类型<div
              id="resizeableCol_3"
              class="resizeCtrl"
            ></div>
          </th>
          <th id="col_4">大小<div
              id="resizeableCol_4"
              class="resizeCtrl"
            ></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in data"
          :key="index"
          @click.stop="itemClick(item, $event)"
        >
          <td class="tbody_td_fileName">
            <i
              class="ice-icon"
              :style="{ backgroundImage: 'url(' + require('../../../assets/image/icon/sm/sm_' + item.iconType + '.png') + ')' }"
            ></i>&nbsp;&nbsp;{{ item.name }}
          </td>
          <td>{{ item.updateTime }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.size }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import iceIconCss from '../../../assets/style/vue-ice-ui-icon.css'

const DataListView = {
    name: 'DataListView',
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
          this.setViewData = now
        }
      }
    },
    methods: {
      itemClick(item, ev) {
        const DOM = ev.target.parentNode
        let n = DOM.nextElementSibling
        let p = DOM.previousElementSibling
        const DomArr = []
        while (p) {
          DomArr.push(p)
          p = p.previousElementSibling
        }
        while (n) {
          DomArr.push(n)
          n = n.nextElementSibling
        }
        DOM.style.backgroundColor = '#8fcaff'
        for(let dom of DomArr) {
          dom.style.backgroundColor = null
        }
      },
      outterViewClick(ev) {
        const trTargetElement = ev.target.getElementsByTagName('tbody')[0].getElementsByTagName('tr')
        for (const domTr of trTargetElement) {
          domTr.style.backgroundColor = null
        }
      }
    },
    created() {
      let urlRequire
      for(let i of this.data) {
        try {
          urlRequire = require('../../../assets/image/icon/sm/sm_' + i.iconType + '.png')
          this.setViewData.push(i)
        } catch (error) {
          i.iconType = 'unknow'
          this.setViewData.push(i)
        }
      }
    },
    mounted() {
      const resizeDivDOM = document.getElementsByClassName('resizeCtrl')
      for (const i of resizeDivDOM) {
        i.onmousedown = function(ev) {
          ev.stopPropagation()
          const getTable = document.getElementsByClassName('data-list-view')[0].querySelector('table')
          let getTableWidth = Number.parseInt(getTable.style.width.split('+')[1])
          const getIdNumber = Number.parseInt(this.getAttribute('id').split('_')[1])
          const thisTh = document.getElementById('col_' + getIdNumber)
          const nextTh = document.getElementById('col_' + (getIdNumber + 1))
          let mouseXOld = ev.clientX
          const oldX = ev.clientX
          let tosw = thisTh.clientWidth - 16
          let nosw
          if(nextTh !== null)nosw = nextTh.clientWidth - 16
          document.onmousemove = function(event) {
            let tableOffsetX = (event.clientX - oldX)
            let mouseOffsetX = event.clientX - mouseXOld
            mouseXOld = event.clientX
            tosw = mouseOffsetX + tosw
            thisTh.style.width = tosw + 'px'
            if(nextTh !== null){
              nosw = nosw - mouseOffsetX
              nextTh.style.width = nosw + 'px'
            }else{
              let setWidth = getTableWidth + tableOffsetX
              getTable.style.width = 'calc(80% + ' + setWidth + 'px)'
            }
          }
          document.onmouseup = function() {
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      }
    },
}

export default DataListView
</script>