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
      name: 'home',
      path: '/',
      redirect: '/dashboard',
      component: () => import('@/views/home.vue'),
      children: [
        {
          name: 'dashboard',
          path: '/dashboard',
          component: () => import('@/views/dashboard.vue'),
        },
        {
          name: 'user',
          path: '/user',
          component: () => import('@/views/user.vue'),
        },
        {
          name: 'goods',
          path: '/goods',
          component: () => import('@/views/goods.vue'),
        },
        {
          name: 'order',
          path: '/order',
          component: () => import('@/views/order.vue'),
        },
        {
          name: 'statistics',
          path: '/statistics',
          component: () => import('@/views/statistics.vue'),
        },
        {
          name: 'settings',
          path: '/settings',
          component: () => import('@/views/settings.vue'),
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
