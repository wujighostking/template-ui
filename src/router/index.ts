import { ElMessage } from 'element-plus'
import { createRouter, createWebHistory } from 'vue-router'

import { checkToken } from '@/api/login/checkToken'
import { whiteList } from '@/common/constants'
import { isEmpty } from '@/utils'
import { getStorage, removeStorage } from '@/utils/storage'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ...getRouterPath(viewsMap),
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login.vue'),
    },
    {
      path: '/',
      redirect: '/workspace',
      component: () => import('@/views/index.vue'),
      children: [
        {
          name: 'workspace',
          path: '/workspace',
          component: () => import('@/views/workspace.vue'),
        },
        {
          name: 'user',
          path: '/system/user',
          component: () => import('@/views/system/user.vue'),
        },
        {
          name: 'menu',
          path: '/system/menu',
          component: () => import('@/views/system/menu.vue'),
        },
        {
          name: 'role',
          path: '/system/role',
          component: () => import('@/views/system/role.vue'),
        },
        {
          name: 'dept',
          path: '/system/dept',
          component: () => import('@/views/system/dept.vue'),
        },
        {
          name: 'post',
          path: '/system/post',
          component: () => import('@/views/system/post.vue'),
        },
        {
          name: 'dict',
          path: '/system/dict',
          component: () => import('@/views/system/dict.vue'),
        },
        {
          name: 'online',
          path: '/monitor/online',
          component: () => import('@/views/monitor/online.vue'),
        },
        {
          name: 'job',
          path: '/monitor/job',
          component: () => import('@/views/monitor/job.vue'),
        },
        {
          name: 'data',
          path: '/monitor/data',
          component: () => import('@/views/monitor/data.vue'),
        },
        {
          name: 'build',
          path: '/tool/build',
          component: () => import('@/views/tool/build.vue'),
        },
        {
          name: 'gen',
          path: '/tool/gen',
          component: () => import('@/views/tool/gen.vue'),
        },
        {
          name: 'swagger',
          path: '/tool/swagger',
          component: () => import('@/views/tool/swagger.vue'),
        },
      ],
    },
  ],
})

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
    const data: any = await checkToken(token!)
    if (data.code != 0) {
      ElMessage.error('登录已过期，请重新登录')
      removeStorage('token')
      return { path: '/login' }
    }
  } catch {
    // 校验接口异常时阻断导航，并提示
    ElMessage.error('接口异常，请重试')
    return false
  }

  return true
})

export default router
