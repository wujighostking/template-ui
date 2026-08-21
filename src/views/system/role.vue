<script setup lang="ts">
import { Delete, Edit, Plus, Refresh, Search } from '@element-plus/icons-vue'
import { ElButton, ElDatePicker, ElInput, ElSelect } from 'element-plus'
import { h, reactive } from 'vue'

import type { FormItemConfig } from '@/components/FormBuilder.vue'
import FormBuilder from '@/components/FormBuilder.vue'
import TableBuilder, { type ColumnConfig } from '@/components/TableBuilder.vue'

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
  { prop: 'roleName', label: '角色名称', align: 'center' },
  { prop: 'roleCode', label: '字符代码', align: 'center' },
  { prop: 'sort', label: '排序', align: 'center' },
  { prop: 'status', label: '状态', align: 'center' },
  { prop: 'createTime', label: '创建时间', align: 'center' },
  {
    prop: 'operation',
    label: '操作',
    align: 'center',
    width: 280,
    slots: {
      default: (scope) => {
        const row = scope.row as Record<string, unknown>
        return h('div', { class: 'row-operation' }, [
          h(
            ElButton,
            {
              type: 'primary',
              link: true,
              size: 'small',
              icon: Search,
              onClick: () => handleView(row),
            },
            () => '查看',
          ),
          h(
            ElButton,
            {
              type: 'primary',
              link: true,
              size: 'small',
              icon: Edit,
              onClick: () => handleEditRow(row),
            },
            () => '编辑',
          ),
          h(
            ElButton,
            {
              type: 'danger',
              link: true,
              size: 'small',
              icon: Delete,
              onClick: () => handleDeleteRow(row),
            },
            () => '删除',
          ),
        ])
      },
    },
  },
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

/** 行内操作：查看 */
function handleView(row: Record<string, unknown>) {
  // 查看指定行角色
  console.log('查看', row)
}

/** 行内操作：编辑 */
function handleEditRow(row: Record<string, unknown>) {
  // 编辑指定行角色
  console.log('编辑', row)
}

/** 行内操作：删除 */
function handleDeleteRow(row: Record<string, unknown>) {
  // 删除指定行角色
  console.log('删除', row)
}
</script>

<template>
  <div class="role-page">
    <div class="role-page__header">
      <h2 class="role-page__title">角色管理</h2>
      <p class="role-page__subtitle">管理系统角色与权限</p>
    </div>

    <el-card shadow="never" class="role-page__search">
      <FormBuilder
        :form="searchForm"
        :form-items="formItems"
        :row-props="{ gutter: 16 }"
        label-position="right"
        label-width="auto"
      />
    </el-card>

    <el-card shadow="never" class="role-page__table">
      <div class="role-page__toolbar">
        <el-button type="primary" plain :icon="Search" @click="handleSearch">查询</el-button>
        <el-button type="default" plain :icon="Refresh" @click="handleReset">重置</el-button>
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
        <el-button type="primary" plain :icon="Edit" @click="handleEdit">编辑</el-button>
        <el-button type="danger" plain :icon="Delete" @click="handleDelete">删除</el-button>
        <el-button @click="handleAssignUser">分配用户</el-button>
        <el-button @click="handleRefresh">刷新</el-button>
      </div>

      <TableBuilder :columns="columns" :data="tableData" row-key="id" />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.role-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  .role-page__header {
    padding: 4px 4px 0;

    .role-page__title {
      margin: 0 0 8px;
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
    }

    .role-page__subtitle {
      margin: 0;
      font-size: 13px;
      color: #64748b;
    }
  }

  .role-page__search {
    border-radius: 8px;

    :deep(.el-card__body) {
      display: flex;
      align-items: center;
      min-height: 64px;
    }

    :deep(.el-form) {
      width: 100%;
    }

    :deep(.el-form-item) {
      margin-bottom: 0;
    }
  }

  .role-page__table {
    border-radius: 8px;
  }

  .role-page__toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }
}
</style>
