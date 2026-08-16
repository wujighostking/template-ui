import type { RouteRecordRaw } from 'vue-router'

import { getMenu } from '@/api/menu.ts'
import { CODE } from '@/common/code.ts'
import type { MenuNode } from '@/schema/menu.ts'
import { isObject } from '@/utils/types.ts'

import router, { routes as staticRoutes } from './'

const routes = import.meta.glob('@/views/**/*.vue')

export function addRoutes() {
  return getMenu().then((res) => {
    if (res.code !== CODE.SUCCESS) return

    const topRoutes = handleTopMenu(res.data.filter((item: MenuNode) => item.parentId === null))
    const routes = handleSubMenu(
      topRoutes,
      res.data.filter((item: MenuNode) => item.parentId !== null),
    )
    router.clearRoutes()

    staticRoutes.forEach((route) => router.addRoute(route))

    routes.forEach((route) => router.addRoute(route))

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

function handleSubMenu(topRoutes: RouteRecordRaw[], subMenus: MenuNode[]): RouteRecordRaw[] {
  subMenus.forEach((menu, index) => {
    const route = topRoutes.find((routes) => routes.meta?.id === menu.parentId)

    if (!route) return

    if (!route.children) {
      route.children = []
    }

    const component = routes[`/src/${menu.componentPath}.vue`]

    if (component) {
      route.children.push({
        name: menu.componentName ?? menu.menuName,
        path: menu.componentUrl?.trim() || menu.componentPath.replace('views', ''),
        component: component,
      })
    }

    handleSubMenu(route.children, subMenus.slice(index + 1))
  })

  return topRoutes
}
