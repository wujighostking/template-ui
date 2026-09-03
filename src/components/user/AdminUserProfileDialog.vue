<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

import { useUserStore } from '@/store/user.ts'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const dialogVisible = ref(false)

const genderText = computed(() => {
  const map: Record<number, string> = { 0: '未知', 1: '男', 2: '女' }

  return map[userInfo.value.gender ?? 0] ?? '未知'
})

const roleNames = computed(
  () => userInfo.value.role?.map((role) => role.roleName).join('、') || '无',
)

const avatarText = computed(() => userInfo.value.nickname?.slice(0, 1) || 'A')

const birthdayText = computed(() => userInfo.value.birthday?.slice(0, 10) || '-')

/** 打开弹窗：从本地存储读取用户信息并回显 */
function open() {
  dialogVisible.value = true
}

function close() {
  dialogVisible.value = false
}

defineExpose({ open, close })
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    append-to-body
    destroy-on-close
    draggable
    title="用户信息"
    width="440px"
  >
    <div class="profile">
      <div class="profile__header">
        <el-avatar :size="64" :src="userInfo.avatar || undefined" class="profile__avatar">
          {{ avatarText }}
        </el-avatar>
        <div class="profile__meta">
          <p class="profile__nickname">{{ userInfo.nickname || '-' }}</p>
          <p class="profile__roles">{{ roleNames }}</p>
        </div>
      </div>

      <el-descriptions :column="1" border class="profile__desc">
        <el-descriptions-item label="手机号">
          {{ userInfo.phoneNumber || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="性别">{{ genderText }}</el-descriptions-item>
        <el-descriptions-item label="生日">{{ birthdayText }}</el-descriptions-item>
        <el-descriptions-item label="注册时间">
          {{ userInfo.createTime || '-' }}
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <template #footer>
      <el-button type="primary" @click="close">关闭</el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.profile {
  .profile__header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }

  .profile__avatar {
    flex-shrink: 0;
    font-size: 26px;
    font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
  }

  .profile__meta {
    min-width: 0;
  }

  .profile__nickname {
    margin: 0 0 6px;
    font-size: 18px;
    font-weight: 600;
    color: #1e293b;
  }

  .profile__roles {
    margin: 0;
    font-size: 13px;
    color: #64748b;
  }

  .profile__desc {
    :deep(.el-descriptions__label) {
      width: 90px;
    }
  }
}
</style>
