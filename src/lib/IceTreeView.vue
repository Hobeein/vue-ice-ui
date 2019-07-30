<style>
@import url("style/vue-ice-ui-default.css");
@import url("style/vue-ice-ui-icon.css");
.ice-tree-view {
  position: relative;
  text-align: left;
}
.ice-tree-view > li {
  display: block;
  margin: 0;
}
.ice-tree-view > li > .list-content {
  position: relative;
}
.ice-tree-view > li > .list-content > .list-name {
  position: relative;
  margin: 5px 0 5px 0;
  height: 25px;
  line-height: 25px;
  cursor: pointer;
  display: flex;
}
.ice-tree-view > li > .list-content > .list-name:hover {
  background-color: #e6faff;
}
.ice-tree-view .list-children {
  position: relative;
  overflow-y: hidden;
}
.ice-tree-view .list-caret {
  position: relative;
  display: inline-block;
  width: 18px;
  height: 100%;
  line-height: 25px;
  text-align: center;
  cursor: pointer;
}
.ice-tree-view .list-item-body {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>

<template>
  <ul class="ice-tree-view">
    <li
      v-for="(item, index) in dataCpt"
      :key="item.id"
    >
      <div class="list-content">
        <div
          class="list-name"
          :style="{ paddingLeft: (leftMultiplierCpt * 23) + 'px' }"
        >
          <div
            class="list-caret"
            @click="listToggle(index, $event)"
          >
            <span
              v-if="item.children != undefined && item.children != null && item.children != null && item.children.length > 0"
              class="ice-caret-right"
              style="transition: all 0.2s;"
            ></span>
            <span
              v-else
              class="ice-caret-transparent"
            ></span>
          </div>
          <div
            class="list-item-body"
            @click="itemClick(item)"
          >
            <i :class="'ice-icon ' + item.icon + '-sm'"></i>
            <span class="treeName">{{ item.title }}</span>
          </div>
        </div>
        <transition
          @before-enter="beforeItemShow"
          @before-leave="beforeItemLeave"
        >
          <div
            class="list-children"
            v-show="item.isShow"
          >
            <ice-tree-view
              v-if="item.children != undefined && item.children != null && item.children != null"
              :data="item.children"
              :leftMultiplier="leftMultiplierCpt + 1"
            />
          </div>
        </transition>
      </div>
    </li>
  </ul>
</template>
<script>
const IceTreeView = {
    name: 'IceTreeView',
    props: {
        data: {
            type: Array
        },
        leftMultiplier: {
            type: Number,
            default: 0
        }
    },
    data: function() {
        return {
            dataSet: [],
            dataItem: {
              id: "唯一标识",
              icon: "flie",
              prop: "属性名",
              title: "显示名",
              isShow: false,
              children: []
            },
            leftMultiplierSet: 0
        }
    },
    methods: {
      listToggle(index, el) {
        let isRotate = false
        for(let i of el.target.classList){
          if(i === 'ice-clockwise-rotate90'){
            isRotate = true
          }
        }
        if(isRotate){
          el.target.classList.remove('ice-clockwise-rotate90')
          this.dataCpt[index].isShow = false
        }else{
          el.target.classList.add('ice-clockwise-rotate90')
          this.dataCpt[index].isShow = true
        }
      },
      beforeItemShow(el) {
        el.style.display = 'block'
        const elHeight = el.offsetHeight
        el.style.height = '0px'
        let heightNow = 0
        const t = setInterval(() => {
          heightNow = (heightNow + (elHeight / 20))
          el.style.height = heightNow + 'px'
          if(Number.parseInt(el.style.height) >= elHeight){
            el.style.height = 'auto'
            clearInterval(t)
          }
        }, 10)
      },
      beforeItemLeave(el) {
        el.setAttribute('style', 'display: none;')
      },
      itemClick(item) {
        this.$emit('item-click', item)
      }
    },
    computed: {
        dataCpt: {
            get(){
                return this.dataSet
            },
            set(now){
              this.dataSet = now
            }
        },
        leftMultiplierCpt: {
            get(){
                return this.leftMultiplierSet
            }
        }
    },
    created() {
        const getData = JSON.parse(JSON.stringify(this.data))
        for(let item of getData){
          let dItem = Object.assign({}, this.dataItem, item)
          this.dataSet.push(dItem)
        }
        this.leftMultiplierSet = this.leftMultiplier
    },
}
export default IceTreeView
</script>
