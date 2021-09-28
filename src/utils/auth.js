const TokenKey = 'token'
const KeyKey = 'changekey'


export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
}

export function getByKey(key) {
  return sessionStorage.getItem(key)
}

export function setByKey(key,data) {
  return sessionStorage.setItem(key, data)
}