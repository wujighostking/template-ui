import request from '@/api'

export function checkToken(token: string) {
  return request('/auth/check-token', { method: 'Post', data: { token } })
}
