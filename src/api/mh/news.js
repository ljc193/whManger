import request from '@/utils/request'

// 查询新闻信息列表
export function listNews(query) {
  return request({
    url: '/mh/news/list',
    method: 'get',
    params: query
  })
}

// 查询新闻信息分页列表
export function pageNews(query) {
  return request({
    url: '/mh/news/pagelist',
    method: 'get',
    params: query
  })
}
// 查询新闻信息详细
export function getNews(id) {
  return request({
    url: '/mh/news/' + id,
    method: 'get'
  })
}

// 新增新闻信息
export function addNews(data) {
  return request({
    url: '/mh/news',
    method: 'post',
    data: data
  })
}

// 修改新闻信息
export function updateNews(data) {
  return request({
    url: '/mh/news',
    method: 'put',
    data: data
  })
}

// 删除新闻信息
export function delNews(id) {
  return request({
    url: '/mh/news/' + id,
    method: 'delete'
  })
}

// 导出新闻信息
export function exportNews(query) {
  return request({
    url: '/mh/news/export',
    method: 'get',
    params: query
  })
}