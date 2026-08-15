<script setup lang="ts">
import { Delete, Edit, Plus, Refresh, Search, Sort } from '@element-plus/icons-vue'
import { ElDatePicker, ElInput } from 'element-plus'
import { onBeforeMount, reactive, shallowRef, useTemplateRef } from 'vue'

import { getMenu } from '@/api/menu.ts'
import type { FormItemConfig } from '@/components/FormBuilder.vue'
import CrudPage, { type CrudPageConfig } from '@/components/system/CrudPage.vue'
import CreateDialog from '@/components/system/menu/CreateDialog.vue'
import type { ColumnConfig } from '@/components/TableBuilder.vue'

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
  { type: 'selection', width: 50 },
  { prop: 'menuName', label: '菜单名称' },
  { prop: 'icon', label: '图标' },
  { prop: 'sort', label: '排序' },
  { prop: 'permission', label: '权限标识' },
  { prop: 'componentPath', label: '组件路径' },
  { prop: 'componentName', label: '组件名称' },
  { prop: 'status', label: '状态' },
  { prop: 'createTime', label: '创建时间' },
]

const tableData = shallowRef<Record<string, unknown>[]>([
  {
    id: crypto.randomUUID(),
    menuName: '系统管理',
    icon: 'Setting',
    sort: 1,
    permission: 'system',
    componentPath: 'system/index',
    componentName: 'system/index',
    status: '正常',
    createTime: '2024-01-01 09:00',
    children: [
      {
        id: crypto.randomUUID(),
        menuName: '用户管理',
        icon: 'User',
        sort: 1,
        permission: 'system:user:list',
        componentPath: 'system/user/index',
        componentName: 'system/user/index',
        status: '正常',
        createTime: '2024-05-11 10:32',
      },
      {
        id: crypto.randomUUID(),
        menuName: '角色管理',
        icon: 'UserFilled',
        sort: 2,
        permission: 'system:role:list',
        componentPath: 'system/role/index',
        componentName: 'system/role/index',
        status: '正常',
        createTime: '2024-05-11 10:32',
      },
      {
        id: crypto.randomUUID(),
        menuName: '菜单管理',
        icon: 'Menu',
        sort: 3,
        permission: 'system:menu:list',
        componentPath: 'system/menu/index',
        componentName: 'system/menu/index',
        status: '正常',
        createTime: '2024-05-11 10:32',
      },
      {
        id: crypto.randomUUID(),
        menuName: '部门管理',
        icon: 'OfficeBuilding',
        sort: 4,
        permission: 'system:dept:list',
        componentPath: 'system/dept/index',
        componentName: 'system/dept/index',
        status: '正常',
        createTime: '2024-05-11 10:32',
      },
      {
        id: crypto.randomUUID(),
        menuName: '岗位管理',
        icon: 'Suitcase',
        sort: 5,
        permission: 'system:post:list',
        componentPath: 'system/post/index',
        componentName: 'system/post/index',
        status: '正常',
        createTime: '2024-05-11 10:32',
      },
      {
        id: crypto.randomUUID(),
        menuName: '字典管理',
        icon: 'Collection',
        sort: 6,
        permission: 'system:dict:list',
        componentPath: 'system/dict/index',
        componentName: 'system/dict/index',
        status: '正常',
        createTime: '2024-05-11 10:32',
      },
    ],
  },
])

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
}

function handleReset() {
  //  重置逻辑
}

function handleAdd() {
  menuDialogRef.value?.open('add')
}
function handleEdit() {
  // 编辑菜单逻辑
}

function handleDelete() {
  // 删除菜单逻辑
}

function handleAdjustSort() {
  // 调整排序逻辑
}

onBeforeMount(() => {
  getMenu().then((res) => {
    console.log(res)

    tableData.value = res.data
  })
})
</script>

<template>
  <CrudPage :config="config" />
  <CreateDialog ref="menuDialogRef" />
</template>

<style scoped lang="scss"></style>
