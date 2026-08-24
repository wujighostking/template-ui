import { ElMessage } from 'element-plus'
import { createRouter, createWebHistory, type RouteLocationNormalizedGeneric } from 'vue-router'

import { checkToken } from '@/api/login/checkToken.ts'
import { CODE } from '@/common/code.ts'
import { whiteList } from '@/common/constants'
import { addRoutes } from '@/router/routesHandler.ts'
import type { Role } from '@/schema/role.ts'
import { isEmpty } from '@/utils'
import { getStorage, getToken, removeStorage, setStorage } from '@/utils/storage'
import { isArray } from '@/utils/types.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // routes: routes,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login.vue'),
    },
    // {
    //   path: '/workspace',
    //   component: () => import('@/views/index.vue'),
    //   children: [
    //     {
    //       name: 'workspace',
    //       path: '/workspace',
    //       component: () => import('@/views/workspace.vue'),
    //     },
    //   ],
    // },
    // {
    //   path: '/system',
    //   component: () => import('@/views/index.vue'),
    //   children: [
    //     {
    //       name: 'user',
    //       path: '/system/user',
    //       component: () => import('@/views/system/user.vue'),
    //     },
    //     {
    //       name: 'role',
    //       path: '/system/role',
    //       component: () => import('@/views/system/role.vue'),
    //     },
    //     {
    //       name: 'menu',
    //       path: '/system/menu',
    //       component: () => import('@/views/system/menu.vue'),
    //     },
    //     {
    //       name: 'dict',
    //       path: '/system/dict',
    //       component: () => import('@/views/system/dict.vue'),
    //     },
    //   ],
    // },
  ],
})

let isFirst = true

// 前置路由导航守卫：校验 token 存在性及有效性，未通过时跳转到登录页
router.beforeEach(async (to) => {
  // 白名单（如登录/注册页）直接放行
  if (whiteList.has(to.path)) {
    return true
  }

  const token = getToken()

  // token 不存在或为空时跳转到登录页
  if (isEmpty(token)) {
    return { path: '/login' }
  }

  // token 已失效时清空并跳转到登录页
  try {
    const data = await checkToken(token!)
    if (data.code != 0) {
      ElMessage.error(data.message ?? '登录已过期，请重新登录')
      removeStorage('userInfo')
      return { path: '/login' }
    }

    const newRoles = data.data as Role[]

    const userInfo = JSON.parse(getStorage('userInfo') || '{}')
    const roles = userInfo?.role as Role[]

    if (isArray(roles) && isArray(newRoles) && roles?.length !== newRoles?.length) {
      isFirst = false
      setRole(userInfo, newRoles)
      return resetRouter(to)
    }

    const rolesMap = getRole(roles)
    const newRolesMap = getRole(newRoles)

    for (const key in rolesMap) {
      if (rolesMap[key] !== newRolesMap[key]) {
        isFirst = false
        setRole(userInfo, newRoles)
        return resetRouter(to)
      }
    }

    for (const key in newRolesMap) {
      if (rolesMap[key] !== newRolesMap[key]) {
        isFirst = false
        setRole(userInfo, newRoles)
        return resetRouter(to)
      }
    }
  } catch {
    // 校验接口异常时阻断导航，并提示
    ElMessage.error('身份验证失败，请重新登录')
    return { path: '/login' }
  }

  // 动态路由只在首次进入时注册一次，避免每次导航都重复请求并注册
  try {
    if (isFirst) {
      isFirst = false
      return resetRouter(to)
    }

    return true
  } catch {
    return { path: '/login' }
  }
})

async function resetRouter(to: RouteLocationNormalizedGeneric) {
  try {
    const res = await addRoutes()
    if (res?.code !== CODE.SUCCESS) return { path: '/login' }

    // 关键：注册完动态路由后必须返回导航目标以触发重新导航，
    // 让路由表基于最新路由重新解析，否则本次导航仍沿用旧路由表的"无匹配"结果
    return { ...to, replace: true }
  } catch {
    return { path: '/login' }
  }
}

function getRole(roles: Role[]) {
  const role = roles?.reduce(
    (pre, cur) => {
      if (cur.id) {
        pre[cur.id] = cur.version
      }

      return pre
    },
    {} as Record<string, number | undefined>,
  )
  return role
}
// todo: 更新角色的信息，避免验证不通过
function setRole(userInfo: any, newRoles: Role[], key = 'userInfo') {
  userInfo.role = newRoles
  setStorage(key, JSON.stringify(userInfo))
}

export { router as default }
