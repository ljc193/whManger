import request from '@/utils/request'

// 查询网站菜单信息列表
export function listMenu(query) {
  return request({
    url: '/mh/menu/list',
    method: 'get',
    params: query
  })
}

// 查询网站菜单信息分页列表
export function pageMenu(query) {
  return request({
    url: '/mh/menu/pagelist',
    method: 'get',
    params: query
  })
}
// 查询网站菜单信息详细
export function getMenu(id) {
  return request({
    url: '/mh/menu/' + id,
    method: 'get'
  })
}

// 新增网站菜单信息
export function addMenu(data) {
  return request({
    url: '/mh/menu',
    method: 'post',
    data: data
  })
}

// 修改网站菜单信息
export function updateMenu(data) {
  return request({
    url: '/mh/menu',
    method: 'put',
    data: data
  })
}

// 删除网站菜单信息
export function delMenu(id) {
  return request({
    url: '/mh/menu/' + id,
    method: 'delete'
  })
}

// 导出网站菜单信息
export function exportMenu(query) {
  return request({
    url: '/mh/menu/export',
    method: 'get',
    params: query
  })
}