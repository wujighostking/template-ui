import { ElMessage } from 'element-plus'
import { createRouter, createWebHistory } from 'vue-router'

import { checkToken } from '@/api/login/checkToken'
import { CODE } from '@/common/code.ts'
import { whiteList } from '@/common/constants'
import { addRoutes } from '@/router/routesHandler.ts'
import { isEmpty } from '@/utils'
import { getStorage, removeStorage } from '@/utils/storage'

const routes = [
  {
    path: '/',
    redirect: '/workspace',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
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
  //   name: 'SystemManage',
  //   path: '/system',
  //   component: () => import('@/views/index.vue'),
  //   children: [
  //     {
  //       name: 'user',
  //       path: '/system/user',
  //       component: () => import('@/views/system/user.vue'),
  //     },
  //   ],
  // },

  // {
  //   path: '/',
  //   redirect: '/workspace',
  //   component: () => import('@/views/index.vue'),
  //   children: [
  //     {
  //       name: 'workspace',
  //       path: '/workspace',
  //       component: () => import('@/views/workspace.vue'),
  //     },
  //     {
  //       name: 'user',
  //       path: '/system/user',
  //       component: () => import('@/views/system/user.vue'),
  //     },
  //     {
  //       name: 'menu',
  //       path: '/system/menu',
  //       component: () => import('@/views/system/menu.vue'),
  //     },
  //   ],
  // },
  // ],
})

let isFirst = true

// 前置路由导航守卫：校验 token 存在性及有效性，未通过时跳转到登录页
router.beforeEach(async (to) => {
  // 白名单（如登录/注册页）直接放行
  if (whiteList.has(to.path)) {
    return true
  }

  const token = getStorage('token')

  // token 不存在或为空时跳转到登录页
  if (isEmpty(token)) {
    return { path: '/login' }
  }

  // token 已失效时清空并跳转到登录页
  try {
    const data = await checkToken(token!)
    if (data.code != 0) {
      ElMessage.error(data.message ?? '登录已过期，请重新登录')
      removeStorage('token')
      return { path: '/login' }
    }
  } catch {
    // 校验接口异常时阻断导航，并提示
    ElMessage.error('身份验证失败，请重新登录')
    return { path: '/login' }
  }

  // 动态路由只在首次进入时注册一次，避免每次导航都重复请求并注册
  try {
    const res = await addRoutes()
    if (res?.code !== CODE.SUCCESS) return { path: '/login' }

    // 关键：注册完动态路由后必须返回导航目标以触发重新导航，
    // 让路由表基于最新路由重新解析，否则本次导航仍沿用旧路由表的"无匹配"结果
    if (isFirst) {
      isFirst = false
      return { ...to, replace: true }
    }

    return true
  } catch {
    return { path: '/login' }
  }
})

export { router as default, routes }
