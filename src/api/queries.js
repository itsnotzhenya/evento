import request from '../helpers/request'

export const postFileQueries = (data) => {
  return request({
    url: `/files`,
    method: 'post',
    data
  })
}
