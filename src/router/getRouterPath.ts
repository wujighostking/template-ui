import type { RouteRecordRaw } from 'vue-router'

export function getRouterPath(viewsMap: Record<string, () => Promise<unknown>>): RouteRecordRaw[] {
  const routesName = new Set<string>()

  const routes = Object.entries(viewsMap).map(([key, component]) => {
    const name = key.split('/').pop()?.replace('.vue', '')!
    if (__DEV__ && routesName.has(name)) {
      // oxlint-disable-next-line no-console
      console.error(`路由名称重复: ${name}`)
    }

    routesName.add(name)
    return {
      name,
      path: key.replace('/src/views', '').replace('.vue', '').toLowerCase(),
      component,
    }
  })

  return routes
}
