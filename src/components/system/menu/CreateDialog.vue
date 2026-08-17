<script setup lang="ts">
import {
  ElInput,
  ElInputNumber,
  ElMessage,
  ElOption,
  ElRadio,
  ElRadioGroup,
  ElSelect,
} from 'element-plus'
import { computed, h, watch, reactive, ref, shallowRef } from 'vue'

import { createMenu, getTopMenu, updateMenu } from '@/api/menu.ts'
import { CODE } from '@/common/code.ts'
import FormBuilder, { type FormItemConfig } from '@/components/FormBuilder.vue'
import type { MenuDTO } from '@/schema/menu.ts'

const emit = defineEmits<{
  (e: 'handleSearch'): void
}>()

/** 父菜单下拉选项（实际项目可从接口拉取，这里以静态数据演示） */
const parentMenuOptions = shallowRef([
  // { value: 1, label: '系统管理' },

])

/** 状态下拉/单选选项：1-启用 0-禁用 */
const statusOptions = [
  { value: 1, label: '启用' },
  { value: 0, label: '禁用' },
]

/** 表单默认值 */
function createDefaultForm(): MenuDTO {
  return {
    menuName: '',
    icon: '',
    sort: 1,
    permission: '',
    componentPath: '',
    componentName: '',
    componentUrl: '',
    routerMeta: '',
    status: 1,
    parentId: undefined,
  }
}

const formData = reactive<MenuDTO>(createDefaultForm())

/** 表单校验规则 */
const formRules = {
  menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  componentName: [{ required: true, message: '请输入组件名称', trigger: 'blur' }],
  // componentPath: [{ required: true, message: '请输入组件路径', trigger: 'blur' }],
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
    model: 'componentName',
    label: '组件名称',
    type: ElInput,
    props: { placeholder: '如 User', clearable: true },
    col: { span: 12 },
  },
  {
    model: 'componentPath',
    label: '组件路径',
    type: ElInput,
    props: { placeholder: '如 system/user/index，不填则是菜单', clearable: true },
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
  {
    model: 'parentId',
    label: '父菜单ID',
    type: ElSelect,
    props: {
      placeholder: '请选择父菜单（不选则为顶级菜单）',
      clearable: true,
      style: 'width: 100%',
    },
    col: { span: 12 },
    slots: {
      default: () =>
        parentMenuOptions.value.map((item: { value: string; label: string }) =>
          h(ElOption, { key: item.value, value: item.value, label: item.label }),
        ),
    },
  },
  {
    model: 'componentUrl',
    label: '组件URL',
    type: ElInput,
    props: { placeholder: '如 /system/user', clearable: true },
    col: { span: 12 },
  },
  {
    model: 'routerMeta',
    label: '路由元信息',
    type: ElInput,
    props: {
      type: 'textarea',
      autosize: { minRows: 2, maxRows: 4 },
      placeholder: '可填写 JSON 字符串，如 {"title":"用户管理","icon":"User"}',
    },
    col: { span: 24 },
  },
]

/** 弹窗状态 */
const dialogVisible = ref(false)
const dialogMode = ref<'add' | 'edit'>('add')

const dialogTitle = computed(() => (dialogMode.value === 'add' ? '新增菜单' : '编辑菜单'))

/** 打开弹窗：mode 用于切换标题与提交语义，data 用于回显 */
function open(mode: 'add' | 'edit', data?: Partial<MenuDTO>) {
  dialogMode.value = mode
  Object.assign(formData, createDefaultForm(), data ?? {})
  formData.routerMeta = JSON.stringify(formData.routerMeta, null, 2)
  dialogVisible.value = true
}

function close() {
  dialogVisible.value = false
}

const formBuilderRef = ref<InstanceType<typeof FormBuilder>>()

/** 提交：先校验，校验通过后输出表单数据并关闭弹窗 */
async function handleSubmit() {
  if (!formBuilderRef.value) return
  try {
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

watch(dialogVisible, () => {
  if (!dialogVisible.value) return

  getTopMenu().then((res) => {
    parentMenuOptions.value = res.data.map((item: { id: string; menuName: string }) => ({
      value: item.id,
      label: item.menuName,
    }))
  })
})

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
