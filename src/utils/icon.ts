/**
 * 菜单图标统一使用 iconify 名称（格式：`prefix:name`）。
 * 兼容历史数据：旧菜单直接存储 Element Plus 组件名（如 `Setting`），
 * 这里按 `ep` 前缀图标集（小写命名）映射，如 `Setting` -> `ep:setting`。
 */
export function resolveMenuIcon(icon?: string): string {
  if (!icon) return ''
  const raw = icon.trim()
  if (!raw) return ''
  return raw.includes(':') ? raw : `ep:${raw.toLowerCase()}`
}

/** 取 iconify 名称中的图标名部分（去掉 `prefix:`），无前缀时返回原值 */
export function iconifyIconName(icon?: string): string {
  if (!icon) return ''
  const raw = icon.trim()
  const index = raw.indexOf(':')
  return index === -1 ? raw : raw.slice(index + 1)
}
