import request from '@/api/index.ts'
import type { Role, RoleDTO, RoleQuery } from '@/schema/role.ts'

/**
 * 分页查询角色列表
 *
 * 后端默认 page=1, size=10，支持按 roleName / roleCode 模糊查询。
 */
export function getRolePage(params?: RoleQuery) {
  return request({ url: '/role/list', method: 'GET', params })
}

/**
 * 根据 ID 查询角色详情
 */
export function getRoleById(id: string) {
  return request({ url: '/role/info', method: 'GET', params: { id } })
}

/**
 * 创建角色
 */
export function createRole(data: RoleDTO) {
  return request({ url: '/role/create', method: 'POST', data })
}

/**
 * 更新角色（id 不能为空）
 */
export function updateRole(data: RoleDTO) {
  return request({ url: '/role/update', method: 'PUT', data })
}

/**
 * 根据 ID 逻辑删除角色
 */
export function deleteRoleById(id: string) {
  return request({ url: '/role/delete', method: 'DELETE', params: { id } })
}

export type { Role, RoleDTO, RoleQuery }
