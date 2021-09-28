import request from '@/utils/request'

// 查询网站基础信息列表
export function listWebsiteInformation(query) {
  return request({
    url: '/mh/websiteInformation/list',
    method: 'get',
    params: query
  })
}

// 查询网站基础信息分页列表
export function pageWebsiteInformation(query) {
  return request({
    url: '/mh/websiteInformation/pagelist',
    method: 'get',
    params: query
  })
}
// 查询网站基础信息详细
export function getWebsiteInformation(id) {
  return request({
    url: '/mh/websiteInformation/' + id,
    method: 'get'
  })
}

// 新增网站基础信息
export function addWebsiteInformation(data) {
  return request({
    url: '/mh/websiteInformation',
    method: 'post',
    data: data
  })
}

// 修改网站基础信息
export function updateWebsiteInformation(data) {
  return request({
    url: '/mh/websiteInformation',
    method: 'put',
    data: data
  })
}

// 删除网站基础信息
export function delWebsiteInformation(id) {
  return request({
    url: '/mh/websiteInformation/' + id,
    method: 'delete'
  })
}

// 导出网站基础信息
export function exportWebsiteInformation(query) {
  return request({
    url: '/mh/websiteInformation/export',
    method: 'get',
    params: query
  })
}