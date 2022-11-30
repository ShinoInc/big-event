// token本地化
const TokenKey = 'big-event-token'

export const getToken = () => {
  return JSON.parse(localStorage.getItem(TokenKey))
}

export const setToken = (token) => {
  return localStorage.setItem(TokenKey, JSON.stringify(token))
}

export const removeToken = () => {
  return localStorage.removeItem(TokenKey)
}
