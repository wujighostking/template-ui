/** MenuDTO 字段定义（用于新增 / 编辑菜单表单，与后端实体保持一致） */
export interface MenuDTO {
  menuName: string
  icon: string
  sort: number
  permission: string
  path: string
  name: string
  url: string
  meta: Record<string, any>
  status: number
  /** 父菜单 ID：null / undefined 表示顶级菜单 */
  parentId: string | null | undefined
}

/** 后端返回的菜单节点（用于菜单管理表格展示） */
export interface MenuNode extends MenuDTO {
  id: string
  createTime?: string
  updateTime?: string
  deleted?: number
  children?: MenuNode[]
  [key: string]: unknown
}
