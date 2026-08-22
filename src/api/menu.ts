import request from '@/api/index.ts'
import type { MenuDTO } from '@/schema/menu.ts'

export function createMenu(data: MenuDTO) {
  return request({ url: '/menu/create', method: 'POST', data })
}

export function getMenu() {
  return request({ url: '/menu/list', method: 'GET' }, false)
}

export function getTopMenu() {
  return request({ url: '/menu/top', method: 'GET' })
}

export function updateMenu(data: MenuDTO) {
  return request({ url: '/menu/update', method: 'PUT', data })
}

export function deleteMenu(ids: number[]) {
  return request({ url: `/menu/delete`, method: 'POST', data: ids })
}
