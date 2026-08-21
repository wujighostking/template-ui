<script setup lang="ts">
import { Delete, Edit, Plus, Refresh, Search } from '@element-plus/icons-vue'
import { ElButton, ElDatePicker, ElInput, ElSelect } from 'element-plus'
import { h, reactive } from 'vue'

import type { FormItemConfig } from '@/components/FormBuilder.vue'
import FormBuilder from '@/components/FormBuilder.vue'
import TableBuilder, { type ColumnConfig } from '@/components/TableBuilder.vue'

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
  { prop: 'username', label: '用户名', align: 'center' },
  { prop: 'nickname', label: '昵称', align: 'center' },
  { prop: 'dept', label: '部门', align: 'center' },
  { prop: 'phone', label: '手机号', align: 'center' },
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

function handleSearch() {
  // 查询逻辑
}

function handleReset() {
  //  重置逻辑
}

function handleAdd() {
  // 新增用户逻辑
}

/** 行内操作：查看 */
function handleView(row: Record<string, unknown>) {
  // 查看指定行用户
  console.log('查看', row)
}

/** 行内操作：新增（在指定行附近新增用户） */
function handleAddRow(row: Record<string, unknown>) {
  // 基于指定行新增用户
  console.log('新增', row)
}

/** 行内操作：编辑 */
function handleEditRow(row: Record<string, unknown>) {
  // 编辑指定行用户
  console.log('编辑', row)
}

/** 行内操作：删除 */
function handleDeleteRow(row: Record<string, unknown>) {
  // 删除指定行用户
  console.log('删除', row)
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
  <div class="user-page">
    <div class="user-page__header">
      <h2 class="user-page__title">用户管理</h2>
      <p class="user-page__subtitle">管理系统用户账号</p>
    </div>

    <el-card shadow="never" class="user-page__search">
      <FormBuilder
        :form="searchForm"
        :form-items="formItems"
        :row-props="{ gutter: 16 }"
        label-position="right"
        label-width="auto"
      />
    </el-card>

    <el-card shadow="never" class="user-page__table">
      <div class="user-page__toolbar">
        <el-button type="primary" plain :icon="Search" @click="handleSearch">查询</el-button>
        <el-button type="default" plain :icon="Refresh" @click="handleReset">重置</el-button>
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
        <el-button @click="handleImport">导入</el-button>
        <el-button @click="handleExport">导出</el-button>
        <el-button :icon="Refresh" @click="handleRefresh">刷新</el-button>
      </div>

      <TableBuilder :columns="columns" :data="tableData" row-key="id" />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.user-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  .user-page__header {
    padding: 4px 4px 0;

    .user-page__title {
      margin: 0 0 8px;
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
    }

    .user-page__subtitle {
      margin: 0;
      font-size: 13px;
      color: #64748b;
    }
  }

  .user-page__search {
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

  .user-page__table {
    border-radius: 8px;
  }

  .user-page__toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }
}
</style>
