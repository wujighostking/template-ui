<script lang="ts" setup>
import { ElInput, ElInputNumber, ElMessage, ElRadio, ElRadioGroup } from 'element-plus'
import { computed, h, reactive, ref, useTemplateRef } from 'vue'

import { createMenu, updateMenu } from '@/api/menu.ts'
import { CODE } from '@/common/code.ts'
import FormBuilder, { type FormItemConfig } from '@/components/FormBuilder.vue'
import MonacoEditor from '@/components/MonacoEditor/index.vue'
import type { MenuDTO, MenuNode } from '@/schema/menu.ts'

const emit = defineEmits<{
  (e: 'handleSearch'): void
}>()

const monacoEditorRef = useTemplateRef('monacoEditor')

/** 状态下拉/单选选项：1-启用 0-禁用 */
const statusOptions = [
  { value: 0, label: '启用' },
  { value: 1, label: '禁用' },
]

/** 表单默认值 */
function createDefaultForm(): MenuDTO {
  return {
    menuName: '',
    icon: '',
    sort: 1,
    permission: '',
    path: '',
    component: '',
    name: '',
    url: '',
    meta: undefined,
    status: 0,
    parentId: undefined,
  }
}

const formData = reactive<MenuDTO>(createDefaultForm())

/** 表单校验规则 */
const formRules = {
  menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  component: [{ required: true, message: '请输入文件路径', trigger: 'blur' }],
  path: [{ required: true, message: '请输入组件路由', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }],
}

/** 表单字段配置（由 FormBuilder 渲染） */
const formItems: FormItemConfig[] = [
  {
    model: 'menuName',
    label: '菜单名称',
    type: ElInput,
    props: { placeholder: '请输入菜单名称', clearable: true, maxlength: 50 },
    col: { span: 12 },
  },
  {
    model: 'name',
    label: '组件名称',
    type: ElInput,
    props: { placeholder: '如 User', clearable: true },
    col: { span: 12 },
  },
  {
    model: 'component',
    label: '文件路径',
    type: ElInput,
    props: { placeholder: '如 system/user/index.vue', clearable: true },
    col: { span: 12 },
  },
  {
    model: 'status',
    label: '状态',
    type: ElRadioGroup,
    col: { span: 12 },
    slots: {
      default: () =>
        statusOptions.map((item) =>
          h(ElRadio, { key: item.value, value: item.value }, () => item.label),
        ),
    },
  },
  {
    model: 'path',
    label: '组件路由',
    type: ElInput,
    props: { placeholder: '如 system/user', clearable: true },
    col: { span: 12 },
  },
  {
    model: 'icon',
    label: '菜单图标',
    type: ElInput,
    props: { placeholder: '请输入图标名称，如 Setting', clearable: true },
    col: { span: 12 },
  },
  {
    model: 'sort',
    label: '排序号',
    type: ElInputNumber,
    props: { min: 0, 'controls-position': 'right', style: 'width: 100%' },
    col: { span: 12 },
  },
  {
    model: 'permission',
    label: '权限标识',
    type: ElInput,
    props: { placeholder: '如 system:user:list', clearable: true, maxlength: 100 },
    col: { span: 12 },
  },
  // {
  //   model: 'url',
  //   label: '组件URL',
  //   type: ElInput,
  //   props: { placeholder: '如 /system/user', clearable: true },
  //   col: { span: 12 },
  // },
  {
    model: 'MonacoEditor',
    label: '路由元信息',
    col: { span: 24 },
  },
]

/** 弹窗状态 */
const dialogVisible = ref(false)
const dialogMode = ref<'add' | 'edit'>('add')

const dialogTitle = computed(() => (dialogMode.value === 'add' ? '新增菜单' : '编辑菜单'))

/** 打开弹窗：mode 用于切换标题与提交语义，data 用于回显 */
function open(mode: 'add' | 'edit', data?: MenuNode) {
  dialogMode.value = mode
  if (mode === 'edit') {
    Object.assign(formData, createDefaultForm(), data ?? {})
  } else if (mode === 'add') {
    formData.parentId = data?.id
  }

  // formData.meta = JSON.stringify(formData.meta, null, 2)
  dialogVisible.value = true
}

function close() {
  Object.assign(formData, createDefaultForm())

  dialogVisible.value = false
}

const formBuilderRef = ref<InstanceType<typeof FormBuilder>>()

/** 提交：先校验，校验通过后输出表单数据并关闭弹窗 */
async function handleSubmit() {
  if (!formBuilderRef.value) return
  try {
    formData.meta = monacoEditorRef.value?.getValue()
    await formBuilderRef.value.validate()
    let code, message

    if (dialogMode.value === 'add') {
      ;({ code, message } = await createMenu({ ...formData }))
    } else if (dialogMode.value === 'edit') {
      // 编辑菜单逻辑

      ;({ code, message } = await updateMenu({ ...formData }))
    }

    if (code === CODE.SUCCESS) {
      emit('handleSearch')
      ElMessage.success(message ?? '菜单新增成功')
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
    append-to-body
    destroy-on-close
    draggable
    width="50%"
  >
    <FormBuilder
      ref="formBuilderRef"
      :form="formData"
      :form-items="formItems"
      :rowProps="{ gutter: 16 }"
      :rules="formRules"
      label-position="right"
      label-width="100px"
    >
      <template #MonacoEditor>
        <el-form-item v-model="formData.meta" label="路由元信息">
          <MonacoEditor ref="monacoEditor" v-model="formData.meta" />
        </el-form-item>
      </template>
    </FormBuilder>

    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
