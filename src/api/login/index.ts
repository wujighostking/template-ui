import request from '@/api'

export function login(data: any) {
  return request('/auth/login', { method: 'POST', data })
}
