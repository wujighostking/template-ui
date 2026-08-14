<script setup lang="ts">
import { Delete, Edit, Plus, Refresh, Search, Sort } from '@element-plus/icons-vue'
import { ElDatePicker, ElInput, ElSelect } from 'element-plus'
import { reactive, shallowRef } from 'vue'

import type { FormItemConfig } from '@/components/FormBuilder.vue'
import CrudPage, { type CrudPageConfig } from '@/components/system/CrudPage.vue'
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
  { prop: 'perms', label: '权限标识' },
  { prop: 'component', label: '组件路径' },
  { prop: 'status', label: '状态' },
  { prop: 'createTime', label: '创建时间' },
]

const tableData: Record<string, unknown>[] = [
  {
    id: crypto.randomUUID(),
    menuName: '系统管理',
    icon: 'Setting',
    sort: 1,
    perms: 'system',
    component: 'system/index',
    status: '正常',
    createTime: '2024-01-01 09:00',
    children: [
      {
        id: crypto.randomUUID(),
        menuName: '用户管理',
        icon: 'User',
        sort: 1,
        perms: 'system:user:list',
        component: 'system/user/index',
        status: '正常',
        createTime: '2024-05-11 10:32',
      },
      {
        id: crypto.randomUUID(),
        menuName: '角色管理',
        icon: 'UserFilled',
        sort: 2,
        perms: 'system:role:list',
        component: 'system/role/index',
        status: '正常',
        createTime: '2024-05-11 10:32',
      },
      {
        id: crypto.randomUUID(),
        menuName: '菜单管理',
        icon: 'Menu',
        sort: 3,
        perms: 'system:menu:list',
        component: 'system/menu/index',
        status: '正常',
        createTime: '2024-05-11 10:32',
      },
      {
        id: crypto.randomUUID(),
        menuName: '部门管理',
        icon: 'OfficeBuilding',
        sort: 4,
        perms: 'system:dept:list',
        component: 'system/dept/index',
        status: '正常',
        createTime: '2024-05-11 10:32',
      },
      {
        id: crypto.randomUUID(),
        menuName: '岗位管理',
        icon: 'Suitcase',
        sort: 5,
        perms: 'system:post:list',
        component: 'system/post/index',
        status: '正常',
        createTime: '2024-05-11 10:32',
      },
      {
        id: crypto.randomUUID(),
        menuName: '字典管理',
        icon: 'Collection',
        sort: 6,
        perms: 'system:dict:list',
        component: 'system/dict/index',
        status: '正常',
        createTime: '2024-05-11 10:32',
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    menuName: '系统监控',
    icon: 'Monitor',
    sort: 2,
    perms: 'monitor',
    component: 'monitor/index',
    status: '正常',
    createTime: '2024-01-01 09:00',
    children: [
      {
        id: crypto.randomUUID(),
        menuName: '在线用户',
        icon: 'Bell',
        sort: 1,
        perms: 'monitor:online:list',
        component: 'monitor/online/index',
        status: '正常',
        createTime: '2024-05-11 10:33',
      },
      {
        id: crypto.randomUUID(),
        menuName: '定时任务',
        icon: 'Timer',
        sort: 2,
        perms: 'monitor:job:list',
        component: 'monitor/job/index',
        status: '正常',
        createTime: '2024-05-11 10:33',
      },
      {
        id: crypto.randomUUID(),
        menuName: '数据监控',
        icon: 'DataBoard',
        sort: 3,
        perms: 'monitor:druid:list',
        component: 'monitor/druid/index',
        status: '正常',
        createTime: '2024-05-11 10:33',
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    menuName: '系统工具',
    icon: 'Tools',
    sort: 3,
    perms: 'tool',
    component: 'tool/index',
    status: '正常',
    createTime: '2024-01-01 09:00',
    children: [
      {
        id: crypto.randomUUID(),
        menuName: '表单构建',
        icon: 'Document',
        sort: 1,
        perms: 'tool:build:list',
        component: 'tool/build/index',
        status: '正常',
        createTime: '2024-05-11 10:34',
      },
      {
        id: crypto.randomUUID(),
        menuName: '代码生成',
        icon: 'EditPen',
        sort: 2,
        perms: 'tool:gen:list',
        component: 'tool/gen/index',
        status: '正常',
        createTime: '2024-05-11 10:34',
      },
      {
        id: crypto.randomUUID(),
        menuName: '系统接口',
        icon: 'ChatDotRound',
        sort: 3,
        perms: 'tool:swagger:list',
        component: 'tool/swagger/index',
        status: '正常',
        createTime: '2024-05-11 10:34',
      },
    ],
  },
]

/** 表格选中的行 */
const multipleSelection = shallowRef<any[]>([])

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
  // 新增菜单逻辑
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
</script>

<template>
  <CrudPage :config="config" />
</template>

<style scoped lang="scss"></style>
