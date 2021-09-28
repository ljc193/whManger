import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
import layout from '@/pages/layout'
import { getToken,removeToken } from '@/utils/auth'
import menuList from '@/utils/menu.js'  // 获取菜单
import store from '../store/index.js'
Vue.use(Router)

//console.log(menuList)
let superRouter = [];
for(var i=0;i<menuList.length;i++) {
//	console.log(menuList[i])
	addSuperRouter(menuList[i])
}
function addSuperRouter(data){

		if(data && data.children && data.children.length){
			for (var i=0;i<data.children.length;i++) {
				addSuperRouter(data.children[i]);
			}
		}else{
			//赋值
			let routerData = data;
			superRouter.push({
				path: data.path.substring(1),
				name: data.path.replace(data.path[0],data.path[0].toUpperCase()),
				component: _import(data.url),
				meta: {
				title: data.path.substring(1),
				label: data.title
				}
			});
		}
}
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      component: layout,
      children:superRouter
    },{
      path: '/login',
      name: 'Login',
      component: _import('login/login')
    }
  ]
})
router.beforeEach((to,form,next)=>{
	let _this = new Vue();
	if(to.path != '/login'){

		if(getToken()){
			if (to.matched.length ===0) {  //如果未匹配到路由
				form.name ? next() : next('/error');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
			} else {
        		store.commit('GET_TABLIST',to)
				next();    //如果匹配到正确跳转
			}
		}else{
			next('/login');
		}


	}else{
		removeToken();
		next();
	}
});
 export default router;
