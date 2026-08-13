<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { ElInput, ElSelect } from 'element-plus'
import { ref } from 'vue'

import FormBuilder, { type FormItemConfig } from '@/components/FormBuilder.vue'
import TableBuilder, { type ColumnConfig } from '@/components/TableBuilder.vue'

const searchForm = ref<Record<string, unknown>>({
  username: '',
  nickname: '',
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
]

const columns: ColumnConfig[] = [
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

function handleAdd() {
  // 新增用户逻辑
}

function handleImport() {
  // 导入逻辑
}

function handleExport() {
  // 导出逻辑
}
</script>

<template>
  <div class="user">
    <div class="user__header">
      <h2 class="user__title">用户管理</h2>
      <p class="user__subtitle">管理系统用户账号</p>
    </div>

    <el-card shadow="never" class="user__search">
      <FormBuilder :form="searchForm" :form-items="formItems" :rowProps="{ gutter: 16 }" />
    </el-card>

    <el-card shadow="never" class="user__table">
      <div class="user__toolbar">
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
        <el-button @click="handleImport">导入</el-button>
        <el-button @click="handleExport">导出</el-button>
      </div>

      <TableBuilder :columns="columns" :data="tableData" />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.user {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  .user__header {
    padding: 4px 4px 0;

    .user__title {
      margin: 0 0 8px;
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
    }

    .user__subtitle {
      margin: 0;
      font-size: 13px;
      color: #64748b;
    }
  }

  .user__search {
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

  .user__table {
    border-radius: 8px;
  }

  .user__toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }
}
</style>
