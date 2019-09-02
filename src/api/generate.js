import request from '@/helpers/request'

export default (resourseName, getResourseModel = null) => ({
  get: async (id, params = {}) => {
    return request({
      method: 'get',
      url: `/${getResourseModel || resourseName}/${id}`,
      params
    })
  },
  post: async (data) => {
    return request({
      method: 'post',
      url: `/${resourseName}`,
      data
    })
  },
  put: async (id, data) => {
    return request({
      method: 'put',
      url: `/${resourseName}/${id}`,
      data
    })
  },
  delete: async (id, params = {}) => {
    await request({
      method: 'delete',
      url: `/${resourseName}/${id}`,
      params
    })
  },
  index: async (params = {}) => {
    return request({
      method: 'get',
      url: `/${getResourseModel || resourseName}`,
      params
    })
  }
})
