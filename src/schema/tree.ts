/**
 * 通用树形节点结构（任意可拥有 id / parentId / children 的对象）
 */
export interface TreeNode {
  id?: string | number | null
  parentId?: string | number | null
  children?: TreeNode[]
  [key: string]: unknown
}

/**
 * 构建树形结构的配置项
 */
export interface BuildTreeOptions<T extends TreeNode> {
  /** parentId 字段名，默认 'parentId' */
  parentKey?: keyof T
  /** 当前节点 id 字段名，默认 'id' */
  idKey?: keyof T
  /** 子节点字段名，默认 'children' */
  childrenKey?: keyof T
}
