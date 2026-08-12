import { createRouter, createWebHistory } from 'vue-router'

import { whiteList } from '@/common/constants'
import { isEmpty } from '@/utils'
import { getStorage } from '@/utils/storage'

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

// 前置路由导航守卫：token 不存在或为空时跳转到登录页
router.beforeEach((to) => {
  const token = getStorage('token')

  // 白名单（如登录/注册页）直接放行
  if (whiteList.has(to.path)) {
    return true
  }

  if (isEmpty(token)) {
    return { path: '/login' }
  }

  return true
})

export default router
