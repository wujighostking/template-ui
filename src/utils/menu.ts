import type { MenuItem } from '@/schema/adminAside.ts'
import { buildTree } from '@/utils/index.ts'

const routes = import.meta.glob('@/views/**/*.vue')

/**
 * 菜单树节点（兼容后端返回的扁平菜单数据）
 *
 * 继承自 MenuItem，并补充 id / parentId 字段以支持按父子关系构建树形结构。
 */
export interface MenuTreeNode extends MenuItem {
  /** 节点唯一标识 */
  id: string
  /** 父节点 id，null / undefined 表示顶级节点 */
  parentId: string | number | null
  /** 子节点 */
  children?: MenuTreeNode[]
  /** 兼容通用树结构（TreeNode 的索引签名约束） */
  [key: string]: unknown
}

/**
 * 将扁平菜单数据按 parentId 构建为 MenuItem 树形结构。
 *
 * 规则：
 * - parentId 为 null / undefined 时视为顶级节点
 * - parentId 与某节点 id 相同时视为该节点的子节点
 * - 若 parentId 找不到对应父节点，则降级为顶级节点（避免数据丢失）
 *
 * @param list 后端返回的扁平菜单数据
 * @returns 符合 MenuItem 结构的树形菜单
 */
export function buildMenuTree(list: MenuTreeNode[]): MenuItem[] {
  list = list.map((item) => {
    if (item.path.startsWith('views')) {
      item.path = item.path.replace('views', '')
    }

    if (item.path.endsWith('.vue')) {
      item.path = item.path.replace('.vue', '')
    }

    return item
  })
  return buildTree<MenuTreeNode>(list) as MenuItem[]
}
