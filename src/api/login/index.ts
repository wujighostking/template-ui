import request from '@/api'

export function login(data: any) {
  return request({ url: '/auth/login', method: 'POST', data })
}
