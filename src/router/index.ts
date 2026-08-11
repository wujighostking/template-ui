import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ...getRouterPath(viewsMap),
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: 'home',
      path: '/home',
      component: () => import('@/views/home.vue'),
      children: [
        {
          name: 'dashboard',
          path: '/home/dashboard',
          component: () => import('@/views/home/dashboard.vue'),
        },
        {
          name: 'user',
          path: '/home/user',
          component: () => import('@/views/home/user.vue'),
        },
        {
          name: 'goods',
          path: '/home/goods',
          component: () => import('@/views/home/goods.vue'),
        },
        {
          name: 'order',
          path: '/home/order',
          component: () => import('@/views/home/order.vue'),
        },
        {
          name: 'statistics',
          path: '/home/statistics',
          component: () => import('@/views/home/statistics.vue'),
        },
        {
          name: 'settings',
          path: '/home/settings',
          component: () => import('@/views/home/settings.vue'),
        },
      ],
    },
  ],
})

export default router
