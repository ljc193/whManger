import request from '@/utils/request'

// 查询职位信息列表
export function listPosition(query) {
  return request({
    url: '/mh/position/list',
    method: 'get',
    params: query
  })
}

// 查询职位信息分页列表
export function pagePosition(query) {
  return request({
    url: '/mh/position/pagelist',
    method: 'get',
    params: query
  })
}
// 查询职位信息详细
export function getPosition(id) {
  return request({
    url: '/mh/position/' + id,
    method: 'get'
  })
}

// 新增职位信息
export function addPosition(data) {
  return request({
    url: '/mh/position',
    method: 'post',
    data: data
  })
}

// 修改职位信息
export function updatePosition(data) {
  return request({
    url: '/mh/position',
    method: 'put',
    data: data
  })
}

// 删除职位信息
export function delPosition(id) {
  return request({
    url: '/mh/position/' + id,
    method: 'delete'
  })
}

// 导出职位信息
export function exportPosition(query) {
  return request({
    url: '/mh/position/export',
    method: 'get',
    params: query
  })
}