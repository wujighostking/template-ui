import request from '@/api'

export function login(data: any) {
  return request({ url: '/auth/login', method: 'POST', data })
}

export function logout() {
  return request({ url: '/auth/logout', method: 'POST' })
}

export function resetPassword(data: any) {
  return request({ url: '/auth/reset-password', method: 'POST', data })
}
