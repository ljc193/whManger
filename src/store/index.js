import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    currentTab:null,
    tabList:[{
      path: '/',
      name: '/home',
      label: '首页',
      meta:{
        label: "首页",
        title:"home"
      },
      icon: 'home'
    }]
  },
  mutations:{
    GET_TABLIST(state,val){
         if (val.meta.title === 'home') {
            state.currentTab = null
        } else {
            state.currentTab = val
            let result = state.tabList.findIndex(item => item.name === val.name)
            result === -1 ? state.tabList.push(val) : ''

        }
    },
    //关闭标签
    CLOSE_TAB(state, val) {
        let result = state.tabList.findIndex(item => item.name === val)
        state.tabList.splice(result, 1)
    },
  }

})

export default store;
