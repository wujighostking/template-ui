import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { UserInfo } from '@/schema/user.ts'

export const useUserStore = defineStore(
  'user',
  () => {
    // @ts-ignore
    const userInfo = ref<UserInfo>({})
    const power = computed(() => {
      const powers = userInfo.value?.role?.map((role) => role.power)

      return powers ? Math.min(...powers) : Infinity
    })

    function getUserInfo() {
      return userInfo.value
    }
    function setUserInfo(info: UserInfo) {
      userInfo.value = info
    }

    return {
      userInfo,
      power,

      getUserInfo,
      setUserInfo,
    }
  },
  {
    persist: {
      key: 'user',
      pick: ['userInfo'],
    },
  },
)
