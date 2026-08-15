import type { BuildTreeOptions, TreeNode } from '@/schema/tree.ts'

export function isEmpty(val: any) {
  if (Array.isArray(val)) {
    return val.length === 0
  }

  if (val === undefined || val === null) {
    return true
  }

  if (typeof val === 'string') {
    return val.trim() === ''
  }

  return false
}

/**
 * 将扁平数据按 parentId 构建为树形结构。
 * - parentId 为 null / undefined 时视为顶级节点
 * - parentId 与某节点 id 相同时视为该节点的子节点
 * - 若 parentId 找不到对应父节点，则降级为顶级节点（避免数据丢失）
 *
 * @param list 扁平数据列表
 * @param options 字段名配置（可选）
 * @returns 树形结构数据
 */
export function buildTree<T extends TreeNode>(list: T[], options: BuildTreeOptions<T> = {}): T[] {
  const { parentKey = 'parentId', idKey = 'id', childrenKey = 'children' } = options
  const tree: T[] = []
  const map = new Map<string | number, T>()

  for (const item of list) {
    map.set(item[idKey] as string | number, item)
  }

  for (const item of list) {
    const parentId = item[parentKey]
    if (parentId === null || parentId === undefined) {
      tree.push(item)
      continue
    }

    const parent = map.get(parentId as string | number)
    if (parent) {
      if (!parent[childrenKey]) {
        ;(parent as Record<string, unknown>)[childrenKey as string] = []
      }
      ;((parent as Record<string, unknown>)[childrenKey as string] as T[]).push(item)
    } else {
      tree.push(item)
    }
  }

  return tree
}
