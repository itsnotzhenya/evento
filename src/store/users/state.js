import { getToken, getRefreshToken } from '@/helpers/auth'

export default {
  user: '',
  status: '',
  code: '',
  token: getToken(),
  refreshToken: getRefreshToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  setting: {
    articlePlatform: []
  },
  isAdmin: false,
  id: null,
  userInfo: null,
  twoFactor: false
}
