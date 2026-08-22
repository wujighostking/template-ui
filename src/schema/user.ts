/**
 * 用户信息 DTO（查询、列表、详情返回结构，不包含密码）
 *
 * 字段命名与后端 UserDTO 保持一致，均使用驼峰形式。
 * 通过索引签名 `[key: string]: unknown` 兼容后端可能新增的扩展字段。
 */
export interface UserDTO {
  /** 用户 ID（字符串型雪花 ID） */
  id: string
  /** 用户名（登录账号） */
  username: string
  /** 昵称 */
  nickname?: string
  /** 手机号 */
  phoneNumber?: string
  /** 性别：0 未知，1 男，2 女 */
  gender?: number
  /** 头像 URL */
  avatar?: string
  /** 账号状态：0 禁用，1 启用 */
  status?: number
  /** 创建时间，格式：yyyy-MM-dd HH:mm:ss */
  createTime?: string
  /** 更新时间，格式：yyyy-MM-dd HH:mm:ss */
  updateTime?: string
  /** 逻辑删除标识：0 未删除，1 已删除 */
  deleted?: number
  /** 允许后端扩展其它未知字段 */
  [key: string]: unknown
}

/**
 * 用户实体（新增 / 编辑时使用，与后端 User 字段保持一致）
 *
 * id 仅在更新时需要；新增时不传或为空。
 * 密码仅在接收时有效，查询结果中不返回。
 */
export interface User {
  /** 用户 ID（更新时必传，新增时为空），字符串型雪花 ID */
  id?: string
  /** 用户名（登录账号） */
  username: string
  /** 密码（新增时必传，更新时按需传） */
  password?: string
  /** 昵称 */
  nickname?: string
  /** 手机号 */
  phoneNumber?: string

  /** 性别：0 未知，1 男，2 女 */
  gender?: number

  /** 头像 URL */
  avatar?: string
  /** 账号状态：0 禁用，1 启用 */
  status?: number
  /** 允许后端扩展其它未知字段 */
  [key: string]: unknown
}

/** 用户分页查询参数（对应后端 /user/list 的 @RequestParam） */
export interface UserQuery {
  /** 页码，从 1 开始 */
  pageNum?: number
  /** 每页条数，默认 10 */
  pageSize?: number
  /** 用户名（模糊） */
  username?: string
  /** 昵称（模糊） */
  nickname?: string
  /** 手机号（模糊） */
  phoneNumber?: string
  /** 创建时间范围 [开始时间, 结束时间] */
  createTime?: string[]
  /** 允许后端扩展其它未知字段 */
  [key: string]: unknown
}
