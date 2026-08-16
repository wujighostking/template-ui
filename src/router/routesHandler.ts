import type { RouteRecordRaw } from 'vue-router'

import { getMenu } from '@/api/menu.ts'
import { CODE } from '@/common/code.ts'
import type { MenuNode } from '@/schema/menu.ts'
import { isObject } from '@/utils/types.ts'

import router from './'

const routes = import.meta.glob('@/views/**/*.vue')

export function addRoutes() {
  return getMenu().then((res) => {
    if (res.code !== CODE.SUCCESS) return

    const topMenus = handleTopMenu(res.data.filter((item: MenuNode) => item.parentId === null))
    topMenus.forEach((route) => router.addRoute(route))

    return res
  })
}

function handleTopMenu(topMenus: MenuNode[]): RouteRecordRaw[] {
  const menus: RouteRecordRaw[] = []

  topMenus.forEach((menu) => {
    const name = menu.componentName ?? menu.menuName
    const path = menu.componentUrl?.trim() || menu.componentPath.replace('views', '')

    const meta = isObject(menu.routerMeta)
      ? menu.routerMeta
      : menu.routerMeta?.trim()?.length > 0
        ? JSON.parse(menu.routerMeta)
        : {}

    const component = routes[`/src/${menu.componentPath}.vue`]

    const route = component
      ? {
          path,
          meta: { ...meta, id: menu.id },
          component: () => import('@/views/index.vue'),
          children: [
            {
              name,
              path,
              component: component,
            },
          ],
        }
      : {
          path,
          meta: { ...meta, id: menu.id },
          component: () => import('@/views/index.vue'),
        }

    menus.push(route)
  })

  return menus
}
