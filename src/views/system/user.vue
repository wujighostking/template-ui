<script setup lang="ts">
import { Delete, Edit, Plus, Refresh, Search } from '@element-plus/icons-vue'
import { ElDatePicker, ElInput, ElSelect } from 'element-plus'
import { reactive } from 'vue'

import type { FormItemConfig } from '@/components/FormBuilder.vue'
import CrudPage, { type CrudPageConfig } from '@/components/system/CrudPage.vue'
import type { ColumnConfig } from '@/components/TableBuilder.vue'

const searchForm = reactive<Record<string, unknown>>({
  username: '',
  nickname: '',
  dept: '',
  phone: '',
})

const formItems: FormItemConfig[] = [
  {
    model: 'username',
    label: '用户名',
    type: ElInput,
    props: { placeholder: '请输入用户名', clearable: true },
    col: { span: 6 },
  },
  {
    model: 'nickname',
    label: '昵称',
    type: ElInput,
    props: { placeholder: '请输入昵称', clearable: true },
    col: { span: 6 },
  },
  {
    model: 'dept',
    label: '部门',
    type: ElSelect,
    props: { placeholder: '请输入部门', clearable: true },
    col: { span: 6 },
  },
  {
    model: 'phone',
    label: '手机号',
    type: ElInput,
    props: { placeholder: '请输入手机号', clearable: true },
    col: { span: 6 },
  },
  {
    model: 'createTime',
    label: '创建时间',
    type: ElDatePicker,
    props: { placeholder: '请输入创建时间', clearable: true, type: 'datetimerange' },
    col: { span: 6, style: { marginTop: '8px' } },
  },
]

const columns: ColumnConfig[] = [
  { type: 'selection', width: 50 },
  { prop: 'username', label: '用户名' },
  { prop: 'nickname', label: '昵称' },
  { prop: 'dept', label: '部门' },
  { prop: 'phone', label: '手机号' },
  { prop: 'createTime', label: '创建时间' },
]

const tableData: Record<string, unknown>[] = [
  {
    username: 'admin',
    nickname: '超级管理员',
    dept: '研发部',
    phone: '15888888888',
    createTime: '2024-01-01 09:00',
  },
  {
    username: 'zhangsan',
    nickname: '张三',
    dept: '研发部',
    phone: '13800138001',
    createTime: '2024-05-11 14:30',
  },
  {
    username: 'lisi',
    nickname: '李四',
    dept: '产品部',
    phone: '13800138002',
    createTime: '2024-05-15 09:15',
  },
]

const config: CrudPageConfig = {
  title: '用户管理',
  subtitle: '管理系统用户账号',
  formItems,
  formModel: searchForm,
  columns,
  data: tableData,
  toolbar: [
    { text: '查询', type: 'primary', plain: true, icon: Search, onClick: handleSearch },
    { text: '重置', type: 'default', plain: true, icon: Refresh, onClick: handleReset },
    { text: '新增', type: 'primary', icon: Plus, onClick: handleAdd },
    { text: '编辑', type: 'primary', plain: true, icon: Edit, onClick: handleEdit },
    { text: '删除', type: 'danger', plain: true, icon: Delete, onClick: handleDelete },
    { text: '导入', onClick: handleImport },
    { text: '导出', onClick: handleExport },
    { text: '刷新', icon: Refresh, onClick: handleRefresh },
  ],
}

function handleSearch() {
  // 查询逻辑
}

function handleReset() {
  //  重置逻辑
}

function handleAdd() {
  // 新增用户逻辑
}
function handleEdit() {
  // 编辑用户逻辑
}

function handleDelete() {
  // 删除用户逻辑
}

function handleImport() {
  // 导入逻辑
}

function handleExport() {
  // 导出逻辑
}

function handleRefresh() {
  // 刷新逻辑
}
</script>

<template>
  <CrudPage :config="config" />
</template>
