<template>
  <div id='tabBar'>
    <el-tabs v-model="editableTabsValue" type="card"  @tab-remove="removeTab" @tab-click='handleClick'>
      <el-tab-pane
        v-for="(item, index) in tabList"
        :key="item.name"
        :label="item.meta.label"
        :name="item.name"
        :closable="item.name !== '/home'"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
      data() {
        return {
          editableTabsValue: this.$route.name,
        }
      },
      computed:{
        tabList() {
          return this.$store.state.tabList;
        }
      },
      mounted() {
      },
      methods:{
        handleClick(val) {
          if (val.name === this.$route.name) {
            return
          }
           this.editableTabsValue = val.name;
           this.$router.push('.'+val.name)
        },
        removeTab(targetName) {
          let length = this.tabList.length - 1,index=0;

          // 如果关闭的标签不是当前路由的话，就不跳转
          if (targetName !== this.$route.name) {
             this.$store.commit('CLOSE_TAB',targetName)
            return
          }
          this.tabList.forEach((item,inx)=>{
            if(item.name === targetName) {
              index = inx;
            }
          })
          this.$store.commit('CLOSE_TAB',targetName)
          // 关闭的标签是最右边的话，往左边跳转一个
          if (index === length) {
            this.$router.push('.' + this.tabList[index - 1].name)
          } else {
            // 否则往右边跳转
            this.$router.push('.' + this.tabList[index].name)
          }
        }
      },
      watch:{
        $route:{
          handler(val) {
            this.editableTabsValue = val.name;
          }
        }
      }
  }
</script>

<style lang='less'>
  #tabBar {
    height: 30px;
    line-height: 30px;
    .el-tabs__header {
      margin: 0;
    }
    .el-tabs__item {
      height: 30px;
      line-height: 30px;
      font-size: 12px;
    }
  }
</style>
