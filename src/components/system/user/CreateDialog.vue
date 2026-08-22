<script setup lang="ts">
import { ElInput, ElMessage, ElOption, ElRadio, ElRadioGroup, ElSelect } from 'element-plus'
import { computed, h, reactive, ref } from 'vue'

import { createUser, updateUser } from '@/api/user.ts'
import { CODE } from '@/common/code.ts'
import FormBuilder, { type FormItemConfig } from '@/components/FormBuilder.vue'
import type { User } from '@/schema/user.ts'

const emit = defineEmits<{
  (e: 'handleSearch'): void
}>()

/** 表单默认值 */
function createDefaultForm(): User {
  return {
    username: '',
    password: '',
    nickname: '',
    phoneNumber: '',
    gender: 1,
  }
}

const formData = reactive<User>(createDefaultForm())

/** 表单校验规则：新增时密码必填，编辑时可选 */
const formRules = computed(() => ({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password:
    dialogMode.value === 'add' ? [{ required: true, message: '请输入密码', trigger: 'blur' }] : [],
}))

/** 性别选项：0 未知，1 男，2 女 */
const genderOptions = [
  { value: 1, label: '男' },
  { value: 2, label: '女' },
]

/** 状态下拉选项：1-启用 0-禁用 */
const statusOptions = [
  { value: 0, label: '启用' },
  { value: 1, label: '禁用' },
]

/** 表单字段配置（由 FormBuilder 渲染） */
const formItems: FormItemConfig[] = [
  {
    model: 'username',
    label: '用户名',
    type: ElInput,
    props: { placeholder: '请输入用户名（登录账号）', clearable: true, maxlength: 50 },
    col: { span: 12 },
  },
  {
    model: 'password',
    label: '密码',
    type: ElInput,
    props: {
      type: 'password',
      showPassword: true,
      placeholder: '新增时必填，编辑时不填则不修改',
      clearable: true,
      maxlength: 50,
    },
    col: { span: 12 },
  },
  {
    model: 'nickname',
    label: '昵称',
    type: ElInput,
    props: { placeholder: '请输入昵称', clearable: true, maxlength: 50 },
    col: { span: 12 },
  },
  {
    model: 'phoneNumber',
    label: '手机号',
    type: ElInput,
    props: { placeholder: '请输入手机号', clearable: true, maxlength: 20 },
    col: { span: 12 },
  },

  {
    model: 'gender',
    label: '性别',
    type: ElRadioGroup,
    col: { span: 12 },
    slots: {
      default: () =>
        genderOptions.map((item) =>
          h(ElRadio, { key: item.value, value: item.value }, () => item.label),
        ),
    },
  },
]

/** 弹窗状态 */
const dialogVisible = ref(false)
const dialogMode = ref<'add' | 'edit'>('add')

const dialogTitle = computed(() => (dialogMode.value === 'add' ? '新增用户' : '编辑用户'))

/** 打开弹窗：mode 用于切换标题与提交语义，data 用于回显 */
function open(mode: 'add' | 'edit', data?: Partial<User>) {
  delete formData.id
  dialogMode.value = mode
  // 编辑时清空密码字段，避免误提交旧密码
  Object.assign(formData, createDefaultForm(), data ?? {})
  if (mode === 'edit') formData.password = ''
  dialogVisible.value = true
}

function close() {
  dialogVisible.value = false
}

const formBuilderRef = ref<InstanceType<typeof FormBuilder>>()

/** 提交：先校验，校验通过后按模式调用创建 / 更新接口并关闭弹窗 */
async function handleSubmit() {
  if (!formBuilderRef.value) return
  try {
    await formBuilderRef.value.validate()
    const isEdit = dialogMode.value === 'edit'
    const payload = { ...formData }
    // 编辑且密码为空时不传密码
    if (isEdit && !payload.password) delete payload.password
    const { code, message } = isEdit ? await updateUser(payload) : await createUser(payload)
    if (code === CODE.SUCCESS) {
      emit('handleSearch')
      ElMessage.success(message ?? (isEdit ? '用户更新成功' : '用户新增成功'))
      close()
    }
  } catch {
    // 校验失败，Element Plus 会自动展示错误信息
  }
}

defineExpose({ open, close })
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="50%"
    destroy-on-close
    draggable
    append-to-body
  >
    <FormBuilder
      ref="formBuilderRef"
      :form="formData"
      :form-items="formItems"
      :rowProps="{ gutter: 16 }"
      :rules="formRules"
      label-width="100px"
      label-position="right"
    />

    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
