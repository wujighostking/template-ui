import { defineStore } from 'pinia'
import { shallowRef } from 'vue'

import { getMenu } from '@/api/menu.ts'
import { CODE } from '@/common/code.ts'
import type { MenuItem } from '@/schema/adminAside.ts'
import { useUserStore } from '@/store/user.ts'
import { buildMenuTree } from '@/utils/menu.ts'

const useMenuStore = defineStore('menu', () => {
  const userStore = useUserStore()

  const menus = shallowRef<MenuItem[]>()

  const getNewMenus = () => {
    const userInfo = userStore.getUserInfo()
    getMenu({ userId: userInfo.id }).then((res) => {
      if (res.code === CODE.SUCCESS) {
        menus.value = buildMenuTree(res.data ?? [])
      }
    })
  }
  return {
    menus,
    getNewMenus,
  }
})

export default useMenuStore
