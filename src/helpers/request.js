import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getToken } from '@/helpers/auth'

let requestQueue = []
let lastRequest = {}

const service = axios.create()

let isPending = false

const serviceDecorator = config => {
  const checking = config.url.indexOf(process.env.VUE_APP_TOKEN_PATH) === -1
  if (isPending && checking) {
    return new Promise(function (resolve, reject) {
      requestQueue.push({ config, resolve, reject })
    })
  }

  return new Promise(async function (resolve, reject) {
    if (checking) {
      config.url = `${process.env.VUE_APP_API_PATH}${config.url}`
      lastRequest = { config, resolve, reject }
    }
    try {
      const response = await service(config)
      resolve(response)
    } catch (error) {
      console.log(`Error in request: ${error}`)
      Message.error('Неправильный логин или пароль')
      reject(error)
    }
  })
}

service.interceptors.request.use(
  config => {
    config.headers = {
      accept: 'application/json',
      'Content-Type': 'application/json'
    }
    const token = store.getters.token || getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.log('error on request', error)
    return Promise.reject(error)
  }
)

async function refreshToken () {
  return new Promise(resolve => {
    store
      .dispatch('users/RefreshToken')
      .then(() => {
        resolve()
      })
      .catch(() => {
        console.log('here')
        Message.error('Ошибка авторизации, пожалуйста пройдите авторизацию')
        router.push({ path: '/login' })
      })
  })
}

function resendPendingRequests () {
  requestQueue.forEach(async deferredRequest => {
    const config = deferredRequest.config
    const resolve = deferredRequest.resolve
    try {
      const response = await service(config)
      resolve(response)
    } catch (error) {
      console.log(`errResolve ${error}`)
    }
  })
  requestQueue = []
}

service.interceptors.response.use(
  response => {
    lastRequest = {}
    return response
  },
  async (error, request) => {
    if (error.response && error.response.status === 401) {
      if (error.response.data.error === 'access_denied') {
        store.dispatch('LogOut').then(() => {
          router.push('/login')
        })
        return Message.error('Нет доступа')
      }
      if (!isPending) {
        console.log('here')
        isPending = true
        refreshToken().then(() => {
          isPending = false
          resendPendingRequests()
        })
      }

      return new Promise((resolve, reject) => {
        lastRequest.resolve = resolve
        lastRequest.reject = reject
        requestQueue.push({ resolve, reject, config: error.config })
      })
    }
    // if (error.response && error.response.data.detail) {
    //   Message.error(error.response.data.detail)
    // }

    return new Promise((resolve, reject) => {
      reject(error)
    })
  }
)

export default serviceDecorator
