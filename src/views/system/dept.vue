<script setup lang="ts">
import { Delete, Edit, Plus, Refresh, Search, Sort } from '@element-plus/icons-vue'
import { ElDatePicker, ElInput, ElSelect } from 'element-plus'
import { reactive, shallowRef } from 'vue'

import type { FormItemConfig } from '@/components/FormBuilder.vue'
import CrudPage, { type CrudPageConfig } from '@/components/system/CrudPage.vue'
import type { ColumnConfig } from '@/components/TableBuilder.vue'

const searchForm = reactive<Record<string, unknown>>({
  deptName: '',
  leader: '',
  status: '',
  createTime: '',
})

const formItems: FormItemConfig[] = [
  {
    model: 'deptName',
    label: '部门名称',
    type: ElInput,
    props: { placeholder: '请输入部门名称', clearable: true },
    col: { span: 6 },
  },
  {
    model: 'leader',
    label: '负责人',
    type: ElInput,
    props: { placeholder: '请输入负责人', clearable: true },
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
    props: {
      placeholder: '请选择创建时间',
      clearable: true,
      type: 'datetimerange',
    },

    col: { span: 6 },
  },
]

const columns: ColumnConfig[] = [
  { type: 'selection', width: 50 },
  { prop: 'deptName', label: '部门名称' },
  { prop: 'leader', label: '负责人' },
  { prop: 'sort', label: '排序' },
  { prop: 'status', label: '状态' },
  { prop: 'createTime', label: '创建时间' },
]

const tableData: Record<string, unknown>[] = [
  {
    deptName: '科技公司',
    leader: '张总',
    sort: 1,
    status: '正常',
    createTime: '2024-01-01 09:00',
  },
  {
    deptName: '研发部',
    leader: '李工',
    sort: 1,
    status: '正常',
    createTime: '2024-01-15 14:30',
  },
  {
    deptName: '产品部',
    leader: '王经理',
    sort: 2,
    status: '正常',
    createTime: '2024-02-01 10:15',
  },
]

/** 表格选中的行 */
const multipleSelection = shallowRef<any[]>([])

const config: CrudPageConfig = {
  title: '部门管理',
  subtitle: '管理组织架构',
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
    { text: '调整排序', plain: true, icon: Sort, onClick: handleAdjustSort },
    { text: '导入', onClick: handleImport },
  ],
}

function handleSearch() {
  // 查询逻辑
}

function handleReset() {
  //  重置逻辑
}

function handleAdd() {
  // 新增部门逻辑
}
function handleEdit() {
  // 编辑部门逻辑
}

function handleDelete() {
  // 删除部门逻辑
}

function handleAdjustSort() {
  // 调整排序逻辑
}

function handleImport() {
  // 导入逻辑
}
</script>

<template>
  <CrudPage :config="config" />
</template>

<style scoped lang="scss"></style>
