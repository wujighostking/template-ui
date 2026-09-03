<script lang="ts" setup>
import { ArrowDown, Lock, SwitchButton, User } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { onBeforeMount, ref, shallowRef } from 'vue'
import { useRouter } from 'vue-router'

import { logout } from '@/api/login'
import AdminUserProfileDialog from '@/components/user/AdminUserProfileDialog.vue'
import AdminUserResetPasswordDialog from '@/components/user/AdminUserResetPasswordDialog.vue'
import { useUserStore } from '@/store/user.ts'
import { removeStorage } from '@/utils/storage.ts'

const profileDialogRef = ref<InstanceType<typeof AdminUserProfileDialog>>()
const resetPasswordDialogRef = ref<InstanceType<typeof AdminUserResetPasswordDialog>>()

const userStore = useUserStore()

const router = useRouter()
const roleName = shallowRef<string | undefined>('')

const getMinPowerRoleName = (): string | undefined => {
  const roles = userStore.getUserInfo().role
  if (!roles || roles.length === 0) {
    console.warn('未获取到用户角色信息，请检查登录状态')

    return undefined
  }

  let index = 0
  let minPower = Infinity
  roles.forEach((role, idx) => {
    if (role.power < minPower) {
      minPower = role.power
      index = idx
    }
  })

  return roles[index]?.roleName
}

onBeforeMount(() => {
  roleName.value = getMinPowerRoleName()
})

const handleCommand = async (command: string) => {
  if (command === 'profile') {
    profileDialogRef.value?.open()

    return
  }

  if (command == 'resetPassword') {
    resetPasswordDialogRef.value?.open()

    return
  }

  ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => logout())
    .then(() => {
      removeStorage('userInfo')
      router.replace('/login')
    })
}
</script>

<template>
  <el-dropdown @command="handleCommand">
    <div class="admin-user">
      <el-avatar :size="32" class="admin-user__avatar">A</el-avatar>
      <span class="admin-user__name">{{ roleName }}</span>
      <el-icon class="admin-user__arrow"><ArrowDown /></el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="profile">
          <el-icon><User /></el-icon>
          <span>用户信息</span>
        </el-dropdown-item>
        <el-dropdown-item command="resetPassword">
          <el-icon><Lock /></el-icon>
          <span>修改密码</span>
        </el-dropdown-item>

        <el-dropdown-item command="logout" divided>
          <el-icon><SwitchButton /></el-icon>
          <span>退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <AdminUserProfileDialog ref="profileDialogRef" />
  <AdminUserResetPasswordDialog ref="resetPasswordDialogRef" />
</template>

<style lang="scss" scoped>
.admin-user {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  // 移除 el-dropdown 触发器默认的聚焦黑框
  outline: none;

  &:focus,
  &:focus-visible {
    outline: none;
  }

  .admin-user__avatar {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: #fff;
    font-weight: 600;
  }

  .admin-user__name {
    font-size: 14px;
    color: #334155;
  }

  .admin-user__arrow {
    font-size: 12px;
    color: #64748b;
    transition: transform 0.2s;
  }

  .admin-user:hover .admin-user__arrow {
    transform: rotate(180deg);
  }
}
</style>
