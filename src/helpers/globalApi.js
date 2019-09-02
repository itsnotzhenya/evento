import request from './request'

const authData = {
  client_id: process.env.VUE_APP_CLIENT_ID,
  client_secret: process.env.VUE_APP_CLIENT_SECRET
}

export const uploadFile = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  return request({
    url: '/files',
    data: formData,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getMusics = (params) => request({
  url: '/musics',
  method: 'get',
  params
})

export function loginByUsername (username, password) {
  const params = Object.assign(authData, { grant_type: 'password', username, password })
  return request({
    url: `${process.env.VUE_APP_TOKEN_PATH}`,
    method: 'get',
    params
  })
}

export const register = data => {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

export function refreshToken (token) {
  const params = Object.assign(authData, { grant_type: 'refresh_token', refresh_token: token })
  return request({
    url: `${process.env.VUE_APP_TOKEN_PATH}`,
    method: 'get',
    params
  })
}

export function logout () {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo () {
  return request({
    url: '/users/current',
    method: 'get'
  })
}
