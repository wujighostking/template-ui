/** MenuDTO 字段定义（与后端实体保持一致） */
export interface MenuDTO {
  menuName: string
  icon: string
  sort: number
  permission: string
  componentPath: string
  componentName: string
  componentUrl: string
  routerMeta: string
  status: number
  parentId: number | undefined
}
