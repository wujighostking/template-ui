<script setup lang="ts">
import { Delete, Edit, Plus, Refresh, Search, Sort } from '@element-plus/icons-vue'
import { ElDatePicker, ElInput, ElMessage } from 'element-plus'
import { onBeforeMount, reactive, shallowRef, useTemplateRef } from 'vue'

import { getMenu } from '@/api/menu.ts'
import type { FormItemConfig } from '@/components/FormBuilder.vue'
import CrudPage, { type CrudPageConfig } from '@/components/system/CrudPage.vue'
import CreateDialog from '@/components/system/menu/CreateDialog.vue'
import type { ColumnConfig } from '@/components/TableBuilder.vue'
import type { MenuNode } from '@/schema/menu.ts'
import { buildTree } from '@/utils'

const searchForm = reactive<Record<string, unknown>>({
  menuName: '',
  status: '',
  createTime: '',
})

const formItems: FormItemConfig[] = [
  {
    model: 'menuName',
    label: '菜单名称',
    type: ElInput,
    props: { placeholder: '请输入菜单名称', clearable: true },
    col: { span: 6 },
  },
  {
    model: 'status',
    label: '菜单状态',
    type: ElInput,
    props: { placeholder: '请输入菜单状态', clearable: true },
    col: { span: 6 },
  },
  {
    model: 'createTime',
    label: '创建时间',
    type: ElDatePicker,
    props: { placeholder: '请选择创建时间', clearable: true, type: 'datetimerange' },
    col: { span: 6 },
  },
]

const columns: ColumnConfig[] = [
  { type: 'selection', width: 50, selectable: () => true },
  { prop: 'menuName', label: '菜单名称', minWidth: 180 },
  { prop: 'icon', label: '图标' },
  { prop: 'sort', label: '排序', width: 80 },
  { prop: 'permission', label: '权限标识', minWidth: 180 },
  { prop: 'componentPath', label: '组件路径' },
  { prop: 'componentName', label: '组件名称' },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'createTime', label: '创建时间', width: 180 },
]

const tableData = shallowRef<MenuNode[]>([])

/** 表格选中的行 */
const multipleSelection = shallowRef<any[]>([])

/** 新增菜单弹窗引用 */
const menuDialogRef = useTemplateRef<InstanceType<typeof CreateDialog>>('menuDialogRef')

const config: CrudPageConfig = {
  title: '菜单管理',
  subtitle: '管理菜单权限',
  formItems,
  formModel: searchForm,
  columns,
  data: tableData,
  treeProps: { children: 'children' },
  defaultExpandAll: true,
  onSelectionChange: (selection) => {
    multipleSelection.value = selection
  },
  toolbar: [
    { text: '查询', type: 'primary', plain: true, icon: Search, onClick: handleSearch },
    { text: '重置', type: 'default', plain: true, icon: Refresh, onClick: handleReset },
    { text: '新增', type: 'primary', icon: Plus, onClick: handleAdd },
    { text: '编辑', type: 'primary', plain: true, icon: Edit, onClick: handleEdit },
    { text: '删除', type: 'danger', plain: true, icon: Delete, onClick: handleDelete },
    { text: '调整排序', plain: true, icon: Sort, onClick: handleAdjustSort },
  ],
}

function handleSearch() {
  // 查询逻辑
  getMenu().then((res) => {
    /**
     * 后端返回的是扁平数据，每个节点带有 parentId 字段：
     * - parentId 为 null 时为顶级菜单
     * - parentId 不为 null 时为对应 id 节点的子菜单
     * 通过 buildTree 转换为 el-table 所需的 children 树形结构
     */
    tableData.value = buildTree<MenuNode>(res.data ?? [])
  })
}

function handleReset() {
  //  重置逻辑
}

function handleAdd() {
  menuDialogRef.value?.open('add')
}
function handleEdit() {
  // 编辑菜单逻辑
  if (multipleSelection.value.length === 0) {
    ElMessage.warning('请先选择一条数据进行编辑')
    return
  } else if (multipleSelection.value.length > 1) {
    ElMessage.warning('选择多条数据编辑，默认编辑第一条数据')
  }

  menuDialogRef.value?.open('edit', multipleSelection.value[0])
}

function handleDelete() {
  // 删除菜单逻辑
}

function handleAdjustSort() {
  // 调整排序逻辑
}

onBeforeMount(() => {
  handleSearch()
})
</script>

<template>
  <CrudPage :config="config" />
  <CreateDialog ref="menuDialogRef" @handle-search="handleSearch" />
</template>

<style scoped lang="scss"></style>
