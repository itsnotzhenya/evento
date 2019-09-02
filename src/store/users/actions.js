import { loginByUsername, getUserInfo, refreshToken, register, loginByTwoFactorCode } from '@/helpers/globalApi'
import { setTokens, removeTokens, getRefreshToken } from '@/helpers/auth'
import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'

export default {
  LoginByUsername ({ commit }, userInfo) {
    const username = userInfo.username.trim()
    return new Promise((resolve, reject) => {
      loginByUsername(username, userInfo.password).then(response => {
        if (response.data.error && response.data.error === 'two_factor_required') {
          commit('ENABLE_TWO_FACTOR_WAIT')
          reject(response.data)
        }
        commit('SET_TOKENS', response.data)
        setTokens(response.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  async LoginByTwoFactorCode ({ commit }, code) {
    try {
      let response = await loginByTwoFactorCode(code)

      commit('SET_TOKENS', response.data)
      setTokens(response.data)
    } catch (e) {
      throw e
    }
  },
  async Register ({ commit, dispatch }, userInfo) {
    userInfo.username = userInfo.email
    try {
      let response = await register(userInfo)

      let loginData = {
        username: response.data.username,
        password: userInfo.password
      }

      await dispatch('LoginByUsername', loginData)
    } catch (error) {
      throw error
    }
  },
  GetUserInfo ({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(response => {
        if (!response.data || !response) { // Since mockjs does not support custom status codes this can only be hack
          Promise.reject(new Error('error'))
          return
        }

        const data = response.data

        if (!data.roles.includes('ROLE_ADMIN')) {
          dispatch('LogOut').then(() => {
            router.push('/')
          })
          Message.error('Отказано в доступе')
          Promise.reject(new Error({ response }))
          return
        }

        commit('SET_ROLES', data.roles)
        commit('SET_NAME', data.username)
        commit('SET_USER_INFO', data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  async RefreshToken ({ commit }) {
    const token = getRefreshToken()
    try {
      const response = await refreshToken(token)
      commit('SET_TOKENS', response.data)
      setTokens(response.data)
    } catch (err) {
      console.log('on refresh error')
      store.dispatch('LogOut')
      store.dispatch('FedLogOut')
      throw new Error(err)
    }
  },
  //  Logout
  LogOut ({ commit, dispatch }) {
    return new Promise((resolve) => {
      commit('SET_TOKENS', '')
      commit('SET_ROLES', [])
      commit('SET_NAME', null)
      commit('SET_USER_INFO', null)
      dispatch('ResetRoutes')
      removeTokens()
      resolve()
    })
  },

  // Logout
  FedLogOut ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKENS', '')
      removeTokens()
      resolve()
    })
  },

  // Dynamic permissions change
  ChangeRole ({ commit }, role) {
    return new Promise(resolve => {
      commit('SET_TOKENS', role)
      setTokens(role)
      getUserInfo(role).then(response => {
        const data = response.data
        commit('SET_ROLES', data.role)
        commit('SET_NAME', data.name)
        commit('SET_AVATAR', data.avatar)
        commit('SET_INTRODUCTION', data.introduction)
        resolve()
      })
    })
  }
}
