<script setup lang="ts">
import { Delete, Edit, Plus, Refresh, Search } from '@element-plus/icons-vue'
import { ElDatePicker, ElInput, ElSelect } from 'element-plus'
import { reactive, shallowRef } from 'vue'

import type { FormItemConfig } from '@/components/FormBuilder.vue'
import CrudPage, { type CrudPageConfig } from '@/components/system/CrudPage.vue'
import type { ColumnConfig } from '@/components/TableBuilder.vue'

const searchForm = reactive<Record<string, unknown>>({
  roleName: '',
  roleCode: '',
  status: '',
  createTime: '',
})

const formItems: FormItemConfig[] = [
  {
    model: 'roleName',
    label: '角色名称',
    type: ElInput,
    props: { placeholder: '请输入角色名称', clearable: true },
    col: { span: 6 },
  },
  {
    model: 'roleCode',
    label: '字符代码',
    type: ElInput,
    props: { placeholder: '请输入字符代码', clearable: true },
    col: { span: 6 },
  },
  {
    model: 'status',
    label: '状态',
    type: ElSelect,
    props: { placeholder: '请选择状态', clearable: true },
    col: { span: 6 },
  },
  {
    model: 'createTime',
    label: '创建时间',
    type: ElDatePicker,
    props: { placeholder: '请输入创建时间', clearable: true, type: 'datetimerange' },
    col: { span: 6 },
  },
]

const columns: ColumnConfig[] = [
  { type: 'selection', width: 50 },
  { prop: 'roleName', label: '角色名称' },
  { prop: 'roleCode', label: '字符代码' },
  { prop: 'sort', label: '排序' },
  { prop: 'status', label: '状态' },
  { prop: 'createTime', label: '创建时间' },
]

const tableData: Record<string, unknown>[] = [
  {
    roleName: '超级管理员',
    roleCode: 'admin',
    sort: 1,
    status: '正常',
    createTime: '2024-01-01 09:00',
  },
  {
    roleName: '普通用户',
    roleCode: 'common',
    sort: 2,
    status: '正常',
    createTime: '2024-03-15 10:20',
  },
  {
    roleName: '审计员',
    roleCode: 'audit',
    sort: 3,
    status: '正常',
    createTime: '2024-04-20 11:08',
  },
]

/** 表格选中的行 */
const multipleSelection = shallowRef<any[]>([])

const config: CrudPageConfig = {
  title: '角色管理',
  subtitle: '管理系统角色与权限',
  formItems,
  formModel: searchForm,
  columns,
  data: tableData,
  onSelectionChange: (selection) => {
    multipleSelection.value = selection
  },
  toolbar: [
    { text: '查询', type: 'primary', plain: true, icon: Search, onClick: handleSearch },
    { text: '重置', type: 'default', plain: true, icon: Refresh, onClick: handleReset },
    { text: '新增', type: 'primary', icon: Plus, onClick: handleAdd },
    { text: '编辑', type: 'primary', plain: true, icon: Edit, onClick: handleEdit },
    { text: '删除', type: 'danger', plain: true, icon: Delete, onClick: handleDelete },
    { text: '分配用户', onClick: handleAssignUser },
    { text: '刷新', onClick: handleRefresh },
  ],
}

function handleSearch() {
  // 查询逻辑
}

function handleReset() {
  // 重置逻辑
}

function handleAdd() {
  // 新增角色逻辑
}

function handleEdit() {
  // 编辑角色逻辑
}

function handleDelete() {
  // 删除角色逻辑
}

function handleAssignUser() {
  // 分配用户逻辑
}

function handleRefresh() {
  // 刷新逻辑
}
</script>

<template>
  <CrudPage :config="config" />
</template>
