<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { checkToken } from '@/api/login/checkToken'
import { whiteList } from '@/common/constants'
import { getStorage, removeStorage } from '@/utils/storage'

const route = useRoute()
const router = useRouter()

function check() {
  if (whiteList.has(location.pathname) || route) return

  const token = getStorage('token')
  checkToken(token!).then((data: any) => {
    if (data.code == 0) return

    ElMessage.error('登录已过期，请重新登录')
    removeStorage('token')
    router.replace('/login')
  })
}

watch(() => route.path, check, { immediate: true, flush: 'post' })
</script>

<template>
  <router-view />
</template>

<style scoped></style>
