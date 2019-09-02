const ACCESS_TOKEN = 'access-token'
const REFRESH_TOKEN = 'refresh-token'

export const getToken = () => localStorage.getItem(ACCESS_TOKEN)

export const setTokens = (data) => {
  localStorage.setItem(ACCESS_TOKEN, data.access_token)
  localStorage.setItem(REFRESH_TOKEN, data.refresh_token)
}

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(REFRESH_TOKEN)
}

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN)
}
