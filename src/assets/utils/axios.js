//import axios from 'Axios'
//import {Message} from "element-ui"
//import router from "@/router"
//var timeOut = 0;
//if(process.env.NODE_ENV == 'development') {     // 测试
//	 axios.defaults.baseURL = "";
//}else {  // 正式
//  axios.defaults.baseURL = "";
//}
//// 设置默认请求头
//axios.defaults.headers = {
//	"Content-Type": "application/x-www-form-urlencoded"
//}
////设置axios请求超时时间
//axios.defaults.timeout = 2*60*1000;
////配置发送请求前的拦截器
//axios.interceptors.request.use(config => {
//	if(config.method == 'post'){
//		//此处可以做发送处理
//
//	}
//	return config;
//}, error => {
//	return Promise.reject(error);
//});
//// 配置响应拦截器
//axios.interceptors.response.use(res => {
//	//这里面写所需要的代码对返回结果处理
//
//
//	return Promise.resolve(res);
//}, error => {
//	if (error && error.response) {
//
//	  switch (error.response.status) {
//
//	    case 400:
//	      error.message = "错误请求"
//	      break
//	    case 401:
//	      error.message = "未授权，请联系管理员"
//	      break
//	    case 403:
//	      error.message = "拒绝访问"
//	      break
//	    case 404:
//	      error.message = "请求错误,未找到该资源"
//	      break
//	    case 405:
//	      error.message = "请求方法未允许"
//	      break
//	    case 408:
//	      error.message = "请求超时"
//	      break
//	    case 500:
//	      error.message = "服务器端出错"
//	      break
//	    case 501:
//	      error.message = "网络未实现"
//	      break
//	    case 502:
//	      error.message = "网络错误"
//	      break
//	    case 503:
//	      error.message = "服务不可用"
//	      break
//	    case 504:
//	      error.message = "网络超时"
//	      break
//	    case 505:
//	      error.message = "http版本不支持该请求"
//	      break
//	    case 520:
//	      error.message = "未登录，请您登陆";
//	      sessionStorage.clear();
//	      router.push({
//	        path: "/login"
//	      })
//	      break
//	    default:
//	      error.message = `连接错误${error.response.status}`
//	  }
//	} else {
//	  error.message = "连接到服务器失败,请检查网络！"
//	}
//
//	return Promise.reject(error);
//});
//
//export default axios;
