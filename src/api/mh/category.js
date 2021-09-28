import request from '@/utils/request'

// 查询项目分类列表
export function listCategory(query) {
  return request({
    url: '/mh/category/list',
    method: 'get',
    params: query
  })
}

// 查询项目分类分页列表
export function pageCategory(query) {
  return request({
    url: '/mh/category/pagelist',
    method: 'get',
    params: query
  })
}
// 查询项目分类详细
export function getCategory(id) {
  return request({
    url: '/mh/category/' + id,
    method: 'get'
  })
}

// 新增项目分类
export function addCategory(data) {
  return request({
    url: '/mh/category',
    method: 'post',
    data: data
  })
}

// 修改项目分类
export function updateCategory(data) {
  return request({
    url: '/mh/category',
    method: 'put',
    data: data
  })
}

// 删除项目分类
export function delCategory(id) {
  return request({
    url: '/mh/category/' + id,
    method: 'delete'
  })
}

// 导出项目分类
export function exportCategory(query) {
  return request({
    url: '/mh/category/export',
    method: 'get',
    params: query
  })
}