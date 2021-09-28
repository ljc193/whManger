import request from '@/utils/request'

// 查询招聘信息列表
export function listRecruit(query) {
  return request({
    url: '/mh/recruit/list',
    method: 'get',
    params: query
  })
}

// 查询招聘信息分页列表
export function pageRecruit(query) {
  return request({
    url: '/mh/recruit/pagelist',
    method: 'get',
    params: query
  })
}
// 查询招聘信息详细
export function getRecruit(id) {
  return request({
    url: '/mh/recruit/' + id,
    method: 'get'
  })
}

// 新增招聘信息
export function addRecruit(data) {
  return request({
    url: '/mh/recruit',
    method: 'post',
    data: data
  })
}

// 修改招聘信息
export function updateRecruit(data) {
  return request({
    url: '/mh/recruit',
    method: 'put',
    data: data
  })
}

// 删除招聘信息
export function delRecruit(id) {
  return request({
    url: '/mh/recruit/' + id,
    method: 'delete'
  })
}

// 导出招聘信息
export function exportRecruit(query) {
  return request({
    url: '/mh/recruit/export',
    method: 'get',
    params: query
  })
}