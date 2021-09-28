import request from '@/utils/request'

// 查询关于信息列表
export function listAbout(query) {
  return request({
    url: '/mh/about/list',
    method: 'get',
    params: query
  })
}

// 查询关于信息分页列表
export function pageAbout(query) {
  return request({
    url: '/mh/about/pagelist',
    method: 'get',
    params: query
  })
}
// 查询关于信息详细
export function getAbout(id) {
  return request({
    url: '/mh/about/' + id,
    method: 'get'
  })
}

// 新增关于信息
export function addAbout(data) {
  return request({
    url: '/mh/about',
    method: 'post',
    data: data
  })
}

// 修改关于信息
export function updateAbout(data) {
  return request({
    url: '/mh/about',
    method: 'put',
    data: data
  })
}

// 删除关于信息
export function delAbout(id) {
  return request({
    url: '/mh/about/' + id,
    method: 'delete'
  })
}

// 导出关于信息
export function exportAbout(query) {
  return request({
    url: '/mh/about/export',
    method: 'get',
    params: query
  })
}