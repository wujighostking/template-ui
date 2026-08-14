<script setup lang="ts">
import { Delete, Edit, Plus, Refresh, Search } from '@element-plus/icons-vue'
import { ElDatePicker, ElInput, ElOption, ElSelect } from 'element-plus'
import { reactive, h, shallowRef } from 'vue'

import type { FormItemConfig } from '@/components/FormBuilder.vue'
import CrudPage, { type CrudPageConfig } from '@/components/system/CrudPage.vue'
import type { ColumnConfig } from '@/components/TableBuilder.vue'

const searchForm = reactive<Record<string, unknown>>({
  postCode: '',
  postName: '',
  status: '',
  createTime: '',
})

const formItems: FormItemConfig[] = [
  {
    model: 'postCode',
    label: '岗位编码',
    type: ElInput,
    props: { placeholder: '请输入岗位编码', clearable: true },
    col: { span: 6 },
  },
  {
    model: 'postName',
    label: '岗位名称',
    type: ElInput,
    props: { placeholder: '请输入岗位名称', clearable: true },
    col: { span: 6 },
  },
  {
    model: 'status',
    label: '状态',
    type: ElSelect,
    props: { placeholder: '请选择状态', clearable: true },
    col: { span: 6 },
    slots: {
      default: () => [
        h(ElOption, { label: '正常', value: 0 }),
        h(ElOption, { label: '禁用', value: 1 }),
      ],
    },
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
  { type: 'selection', width: 50 },
  { prop: 'postCode', label: '岗位编码' },
  { prop: 'postName', label: '岗位名称' },
  { prop: 'sort', label: '排序' },
  { prop: 'status', label: '状态' },
  { prop: 'createTime', label: '创建时间' },
]

const tableData: Record<string, unknown>[] = [
  {
    postCode: 'ceo',
    postName: '董事长',
    sort: 1,
    status: '正常',
    createTime: '2024-01-01 09:00',
  },
  {
    postCode: 'cto',
    postName: '研发总监',
    sort: 2,
    status: '正常',
    createTime: '2024-01-15 14:30',
  },
  {
    postCode: 'pm',
    postName: '产品经理',
    sort: 3,
    status: '正常',
    createTime: '2024-02-01 10:15',
  },
]

/** 表格选中的行 */
const multipleSelection = shallowRef<any[]>([])

const config: CrudPageConfig = {
  title: '岗位管理',
  subtitle: '维护岗位信息',
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
  // 新增岗位逻辑
}
function handleEdit() {
  // 编辑岗位逻辑
}

function handleDelete() {
  // 删除岗位逻辑
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

<style scoped lang="scss"></style>
