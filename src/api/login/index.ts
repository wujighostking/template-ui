import request from '@/api'

export function login(data: any) {
  return request({ url: '/auth/login', method: 'POST', data })
}

export function logout() {
  return request({ url: '/auth/logout', method: 'POST' })
}
