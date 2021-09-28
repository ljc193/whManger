import request from '@/utils/request'

// 查询首页信息列表
export function listHome(query) {
  return request({
    url: '/mh/home/list',
    method: 'get',
    params: query
  })
}

// 查询首页信息分页列表
export function pageHome(query) {
  return request({
    url: '/mh/home/pagelist',
    method: 'get',
    params: query
  })
}
// 查询首页信息详细
export function getHome(id) {
  return request({
    url: '/mh/home/' + id,
    method: 'get'
  })
}

// 新增首页信息
export function addHome(data) {
  return request({
    url: '/mh/home',
    method: 'post',
    data: data
  })
}

// 修改首页信息
export function updateHome(data) {
  return request({
    url: '/mh/home',
    method: 'put',
    data: data
  })
}

// 删除首页信息
export function delHome(id) {
  return request({
    url: '/mh/home/' + id,
    method: 'delete'
  })
}

// 导出首页信息
export function exportHome(query) {
  return request({
    url: '/mh/home/export',
    method: 'get',
    params: query
  })
}