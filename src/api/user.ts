import request from '@/api/index.ts'
import type { User, UserDTO, UserQuery } from '@/schema/user.ts'

/**
 * 分页查询用户列表
 *
 * 后端默认 pageNum=1, pageSize=10，支持按 username / nickname / phone / dept 等条件查询。
 */
export function getUserPage(params?: UserQuery) {
  return request({ url: '/user/list', method: 'GET', params })
}

/**
 * 根据 ID 查询用户详情
 */
export function getUserById(id: string) {
  return request({ url: '/user/info', method: 'GET', params: { id } })
}

/**
 * 创建用户
 */
export function createUser(data: User) {
  return request({ url: '/user/create', method: 'POST', data })
}

/**
 * 更新用户（id 不能为空）
 */
export function updateUser(data: User) {
  return request({ url: '/user/update', method: 'PUT', data })
}

/**
 * 根据 ID 逻辑删除用户
 */
export function deleteUserById(id: string) {
  return request({ url: '/user/delete', method: 'DELETE', params: { id } })
}

export type { User, UserDTO, UserQuery }
