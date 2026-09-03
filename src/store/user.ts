import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { UserInfo } from '@/schema/user.ts'

export const useUserStore = defineStore(
  'user',
  () => {
    // @ts-ignore
    const userInfo = ref<UserInfo>({})

    function getUserInfo() {
      return userInfo.value
    }
    function setUserInfo(info: UserInfo) {
      userInfo.value = info
    }

    return {
      userInfo,

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
