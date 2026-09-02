import type { RouteRecordRaw } from 'vue-router'

import { getMenu } from '@/api/menu.ts'
import { CODE } from '@/common/code.ts'
import router from '@/router/index.ts'
import type { MenuNode } from '@/schema/menu.ts'

const routes = import.meta.glob('@/views/**/*.vue')

export function addRoutes() {
  return getMenu().then((res) => {
    if (res.code !== CODE.SUCCESS) return

    const data = res.data ?? []

    const topMenu = handleTopMenu(data.filter((item: MenuNode) => item.parentId === null))
    const routes = handleSubMenu(
      topMenu,
      data.filter((item: MenuNode) => item.parentId !== null),
    )

    routes.forEach((route) => {
      router.addRoute(route)
    })

    return { code: CODE.SUCCESS, data: routes }
  })
}

function handleTopMenu(topMenu: MenuNode[]): RouteRecordRaw[] {
  return topMenu.map((menu) => {
    return {
      id: menu.id,
      name: menu?.name,
      path: menu.path || '',
      component: () => routes[`/src/${menu.component}`]?.(),
      children: [],
    }
  })
}

function handleSubMenu(topMenu: RouteRecordRaw[], subMenu: MenuNode[]): RouteRecordRaw[] {
  subMenu.forEach((menu) => {
    const parentId = menu.parentId
    const parentMenu = topMenu.find((menu: any) => menu?.id === parentId)

    if (null === parentMenu) return

    // let path =  menu.path
    // if (path?.endsWith('.vue')) {
    //   path = path.replace('.vue', '')
    // }
    //
    // if (path.startsWith('views')) {
    //   path = path.replace('views', '')
    // }

    parentMenu?.children?.push({
      name: menu?.name,
      path: menu.path,
      component: () => routes[`/src/${menu.component}`]?.(),
    })
  })
  return topMenu
}
