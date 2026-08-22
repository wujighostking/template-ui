<script setup lang="ts">
import { ElInput, ElInputNumber, ElMessage, ElSwitch } from 'element-plus'
import { computed, reactive, ref } from 'vue'

import { createRole, updateRole } from '@/api/role.ts'
import { CODE } from '@/common/code.ts'
import FormBuilder, { type FormItemConfig } from '@/components/FormBuilder.vue'
import type { RoleDTO } from '@/schema/role.ts'

const emit = defineEmits<{
  (e: 'handleSearch'): void
}>()

/** 表单默认值 */
function createDefaultForm(): RoleDTO {
  return {
    roleName: '',
    roleCode: '',
    description: '',
    power: 0,
  }
}

const formData = reactive<RoleDTO>(createDefaultForm())

/** 表单校验规则 */
const formRules = {
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  roleCode: [{ required: true, message: '请输入角色代码', trigger: 'blur' }],
}

/** 表单字段配置（由 FormBuilder 渲染） */
const formItems: FormItemConfig[] = [
  {
    model: 'roleName',
    label: '角色名称',
    type: ElInput,
    props: { placeholder: '请输入角色名称', clearable: true, maxlength: 50 },
    col: { span: 12 },
  },
  {
    model: 'roleCode',
    label: '角色代码',
    type: ElInput,
    props: { placeholder: '请输入角色代码，如 superAdminister', clearable: true, maxlength: 50 },
    col: { span: 12 },
  },
  {
    model: 'power',
    label: '权限级别',
    type: ElInputNumber,
    props: { min: 0, 'controls-position': 'right', style: 'width: 100%' },
    col: { span: 12 },
  },
  {
    model: 'description',
    label: '角色描述',
    type: ElInput,
    props: {
      type: 'textarea',
      autosize: { minRows: 2, maxRows: 4 },
      placeholder: '请输入角色描述',
      clearable: true,
    },
    col: { span: 24 },
  },
]

/** 弹窗状态 */
const dialogVisible = ref(false)
const dialogMode = ref<'add' | 'edit'>('add')

const dialogTitle = computed(() => (dialogMode.value === 'add' ? '新增角色' : '编辑角色'))

/** 打开弹窗：mode 用于切换标题与提交语义，data 用于回显 */
function open(mode: 'add' | 'edit', data?: Partial<RoleDTO>) {
  delete formData.id

  dialogMode.value = mode
  Object.assign(formData, createDefaultForm(), data ?? {})
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
    const { code, message } = isEdit
      ? await updateRole({ ...formData })
      : await createRole({ ...formData })
    if (code === CODE.SUCCESS) {
      emit('handleSearch')
      ElMessage.success(message ?? (isEdit ? '角色更新成功' : '角色新增成功'))
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
