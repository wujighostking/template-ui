export function getStorage(key: string) {
  return localStorage.getItem(key)
}

export function setStorage(key: string, value: any) {
  localStorage.setItem(key, value)
}

export function removeStorage(key: string) {
  localStorage.removeItem(key)
}

export function getToken() {
  return JSON.parse(getStorage('userInfo') || '{}')?.token
}
