<script setup lang="ts">
import { Lock } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { reactive, ref } from 'vue'

import { resetPassword } from '@/api/login'
import { CODE } from '@/common/code.ts'
import { getStorage } from '@/utils/storage.ts'

/** 修改密码表单数据 */
interface ResetPasswordForm {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

function createDefaultForm(): ResetPasswordForm {
  return {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }
}

const dialogVisible = ref(false)
const loading = ref(false)

const form = reactive<ResetPasswordForm>(createDefaultForm())
const formRef = ref<FormInstance>()

/** 校验规则：所有字段必填，密码长度 6-20，确认密码需与新密码一致 */
const rules: FormRules<ResetPasswordForm> = {
  oldPassword: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    {
      validator: (_rule, value, callback) => {
        if (value !== form.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}

/** 打开弹窗：重置表单并显示 */
function open() {
  Object.assign(form, createDefaultForm())
  formRef.value?.clearValidate()
  dialogVisible.value = true
}

function close() {
  dialogVisible.value = false
}

/** 提交修改密码：先校验，再请求 /auth/reset-password */
async function handleSubmit() {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
  } catch {
    // 校验失败，由 Element Plus 自动展示错误信息
    return
  }

  loading.value = true

  try {
    // 从本地缓存中读取当前登录用户的 id，作为修改密码的入参
    const userInfo = JSON.parse(getStorage('userInfo') || '{}')
    const { code, message } = await resetPassword({
      id: userInfo.id,
      oldPassword: form.oldPassword,
      newPassword: form.newPassword,
    })

    if (code === CODE.SUCCESS) {
      ElMessage.success(message ?? '密码修改成功')
      close()
    } else {
      ElMessage.error(message ?? '密码修改失败')
    }
  } catch (error) {
    if (__DEV__) {
      console.error('修改密码失败', error)
    }
    ElMessage.error('密码修改失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

defineExpose({ open, close })
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    title="修改密码"
    width="440px"
    destroy-on-close
    draggable
    append-to-body
    :close-on-click-modal="false"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="84px"
      class="reset-password-form"
      @keyup.enter="handleSubmit"
    >
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input
          v-model="form.oldPassword"
          type="password"
          placeholder="请输入旧密码"
          show-password
          clearable
        >
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model="form.newPassword"
          type="password"
          placeholder="请输入新密码"
          show-password
          clearable
        >
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="form.confirmPassword"
          type="password"
          placeholder="请再次输入新密码"
          show-password
          clearable
        >
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">确 定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.reset-password-form {
  :deep(.el-form-item__label) {
    font-size: 14px;
    color: #334155;
  }

  :deep(.el-input__wrapper) {
    padding-left: 4px;
  }

  :deep(.el-input__prefix) {
    display: flex;
    align-items: center;
    color: #94a3b8;
  }
}
</style>
