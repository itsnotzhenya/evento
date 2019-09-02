export default {
  SET_CODE: (state, code) => {
    state.code = code
  },
  SET_TOKENS: (state, data) => {
    state.token = data.access_token
    state.refreshToken = data.refresh_token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_SETTING: (state, setting) => {
    state.setting = setting
  },
  SET_STATUS: (state, status) => {
    state.status = status
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
    state.isAdmin = roles.includes('ROLE_ADMIN')
  },
  SET_USER_INFO (state, userInfo) {
    state.userInfo = userInfo
  },
  ENABLE_TWO_FACTOR_WAIT (state) {
    state.twoFactor = true
  }
}
