import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { Notification, Message } from 'element-ui'
import { getToken} from '@/utils/auth'
import {baseUrl } from "@/utils/baseUrl";
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: baseUrl,
  // 超时
  timeout: 10000
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['token'] =  getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
//	console.log(config.headers)
//	console.log(config)
	if(config.method === "get"){
		config.headers["Content-Type"]= "application/x-www-form-urlencoded"
		config.data =  qs.stringify(config.data, { indices: false })
	}

		if(config.method === "post"||config.method === "put"){
			config.headers["Content-Type"]= "application/json;charset=utf-8"
		}
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(res => {
    const code = res.data.code
    if (code === 401) {
      MessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
      })
    } else if (code !== 200) {
    	console.log(res)
      Notification.error({
        title: res.data.msg
      })
      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
