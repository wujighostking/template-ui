import { createRouter, createWebHistory } from 'vue-router'

import { getRouterPath } from './getRouterPath'
const viewsMap = import.meta.glob('@/views/**/*.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: getRouterPath(viewsMap),
})

export default router
