/**
 * 角色信息（登录返回 data 中嵌入的角色对象）
 *
 * 字段命名与后端实体保持一致，均使用驼峰形式。
 * 通过索引签名 `[key: string]: unknown` 兼容后端可能新增的扩展字段。
 */
export interface Role {
  /** 角色 ID（字符串型雪花 ID） */
  id: string
  /** 角色名称 */
  roleName: string
  /** 角色编码（如 superAdminister） */
  roleCode: string
  /** 角色描述 */
  description: string
  /** 权限级别（数字越小权限越高） */
  power: number
  /** 创建时间，格式：yyyy-MM-dd HH:mm:ss */
  createTime?: string
  /** 更新时间，格式：yyyy-MM-dd HH:mm:ss */
  updateTime?: string
  /** 逻辑删除标识：0 未删除，1 已删除 */
  deleted?: number
  /** 版本号 */
  version?: number
  /** 允许后端扩展其它未知字段 */
  [key: string]: unknown
}

/**
 * 角色表单 DTO（用于新增 / 编辑角色，与后端 RoleDTO 字段保持一致）
 *
 * id 仅在更新时需要；新增时不传或为空。
 */
export interface RoleDTO {
  /** 角色 ID（更新时必传，新增时为空），字符串型雪花 ID */
  id?: string
  /** 角色名称 */
  roleName: string
  /** 角色编码（如 superAdminister） */
  roleCode: string
  /** 角色描述 */
  description?: string
  /** 权限级别（数字越小权限越高） */
  power: number
  /** 允许后端扩展其它未知字段 */
  [key: string]: unknown
}

/** 角色分页查询参数（对应后端 /role/list 的 @RequestParam） */
export interface RoleQuery {
  /** 页码，从 1 开始 */
  page?: number
  /** 每页条数，默认 10 */
  size?: number
  /** 角色名称（模糊） */
  roleName?: string
  /** 角色编码（模糊） */
  roleCode?: string
  /** 允许后端扩展其它未知字段 */
  [key: string]: unknown
}
