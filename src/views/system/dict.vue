<script setup lang="ts">
import { Delete, Edit, Plus, Refresh, Search } from '@element-plus/icons-vue'
import { ElInput, ElOption, ElSelect, ElSwitch } from 'element-plus'
import { reactive, h, shallowRef } from 'vue'

import type { FormItemConfig } from '@/components/FormBuilder.vue'
import Switch from '@/components/Switch.vue'
import CrudPage, { type CrudPageConfig } from '@/components/system/CrudPage.vue'
import type { ColumnConfig } from '@/components/TableBuilder.vue'

const searchForm = reactive<Record<string, unknown>>({
  dictName: '',
  dictType: '',
  status: '',
})

const formItems: FormItemConfig[] = [
  {
    model: 'dictName',
    label: '字典名称',
    type: ElInput,
    props: { placeholder: '请输入字典名称', clearable: true },
    col: { span: 6 },
  },
  {
    model: 'dictType',
    label: '字典类型',
    type: ElInput,
    props: { placeholder: '请输入字典类型', clearable: true },
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
]

const columns: ColumnConfig[] = [
  { type: 'selection', width: 50 },
  { prop: 'dictName', label: '字典名称' },
  { prop: 'dictType', label: '字典类型' },
  { prop: 'dictLabel', label: '字典标签' },
  { prop: 'dictValue', label: '字典键值' },
  {
    prop: 'status',
    label: '状态',
    slots: {
      default: () =>
        h(Switch, {
          activeText: '正常',
          inactiveText: '禁用',
          activeValue: 0,
          inactiveValue: 1,
        }),
    },
  },
]

const tableData: Record<string, unknown>[] = [
  {
    id: crypto.randomUUID(),
    dictName: '性别',
    dictType: 'gender',
    dictLabel: '性别',
    dictValue: '-1',
    status: '正常',
    children: [
      {
        id: crypto.randomUUID(),
        dictType: 'man',
        dictLabel: '男',
        dictValue: '0',
        listClass: 'primary',
        status: '正常',
      },
      {
        id: crypto.randomUUID(),
        dictType: 'woman',
        dictLabel: '女',
        dictValue: '1',
        listClass: 'success',
        status: '正常',
      },
    ],
  },
]

/** 表格选中的行 */
const multipleSelection = shallowRef<any[]>([])

const config: CrudPageConfig = {
  title: '字典管理',
  subtitle: '维护系统字典数据',
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
    { text: '刷新', icon: Refresh, onClick: handleRefresh },
  ],
}

function handleSearch() {
  // 查询逻辑
}

function handleReset() {
  // 重置逻辑
}

function handleAdd() {
  // 新增字典逻辑
}

function handleEdit() {
  // 编辑字典逻辑
}

function handleDelete() {
  // 删除字典逻辑
}

function handleRefresh() {
  // 刷新逻辑
}
</script>

<template>
  <CrudPage :config="config" />
</template>

<style scoped lang="scss"></style>
