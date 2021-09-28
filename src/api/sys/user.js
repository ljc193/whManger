import request from '@/utils/request'

// 获取用户信息
export function info(data) {
	return request({
		url: '/user/' + data,
		method: 'get'
	})
}

// 分页获取用户信息
export function pageUser(query) {
	return request({
		url: '/user/pagelist',
		method: 'get',
		params: query
	})
}

// 获取用户信息
export function listUser(data) {
	return request({
		url: '/user/list',
		method: 'get',
		params: data
	})
}

// 获取用户信息
export function updatePassWord(data) {
	return request({
		url: '/user/updatePassWord',
		method: 'get',
		params: data
	})
}