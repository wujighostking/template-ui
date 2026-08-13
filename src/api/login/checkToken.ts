import request from '@/api'

export function checkToken(token: string) {
  return request({ url: '/auth/check-token', method: 'Post', data: { token } })
}
