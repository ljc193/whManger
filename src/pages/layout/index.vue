<template>
  <div id='layout'>
    <div class='app_header'>
      <app-header @collapse = 'collapse'></app-header>
       <tab-bar></tab-bar>
    </div>
    <div class='app_menu'>
      <side-bar :collapse='collapses'></side-bar>
    </div>
     <div class='app_main'>
       <router-view/>
     </div>
  </div>
</template>

<script>
  import SideBar from './components/menu/SideBar.vue'
  import tabBar from './components/tabBar.vue'
  import appHeader from './components/header.vue'
  export default {
    components:{
      SideBar,tabBar,appHeader
    },
    data() {
      return {
        collapses:false,
      }
    },
    methods:{
      collapse(data) {
        this.collapses = data;
      }
    }
  }
</script>

<style lang='less'>
   #layout {
     position: relative;
     overflow: hidden;
     height: 100%;
     .app_header {
        position: absolute;
        width: calc(100% - 180px);
        margin-left: 180px;
     }
     .app_main {
       margin: 80px 0 0 180px;
       padding: 30px;
     }
     .app_menu {

     }
   }
</style>
