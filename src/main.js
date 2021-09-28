// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from '@/assets/utils/axios.js'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import '@/assets/styles/common.less';
import '@/assets/styles/index.less';
import { getToken} from '@/utils/auth'
import { imgUrlchange} from '@/utils/utils'
import { parseTime, resetForm, addDateRange, selectDictLabel, download ,selectObjectById} from "@/utils/sharepig";
import Pagination from "@/components/Pagination";
import {baseUrl } from "@/utils/baseUrl";
import store from './store'

// 全局组件挂载
Vue.component('Pagination', Pagination)
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectObjectById = selectObjectById
Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}
Vue.prototype.$baseUrl=baseUrl;
Vue.prototype.$https = axios;
Vue.config.productionTip = false
Vue.prototype.$imgUrlchange=imgUrlchange;
Vue.prototype.$uploadUrl= baseUrl+ 'common/upload',
Vue.use(ElementUI);
Vue.prototype.$getToken=getToken;
/* eslint-disable no-new  */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
