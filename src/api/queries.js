import request from '../helpers/request'

export const postFile = (data) => {
  return request({
    url: `/files`,
    method: 'post',
    data
  })
}
