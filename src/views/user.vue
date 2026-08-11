<script setup lang="ts">
import { Search, Refresh, Plus, Delete } from '@element-plus/icons-vue'

interface UserItem {
  id: number
  name: string
  role: string
  status: string
  statusColor: string
}

const users: UserItem[] = [
  { id: 1, name: '张三', role: '管理员', status: '启用', statusColor: '#22c55e' },
  { id: 2, name: '李四', role: '运营', status: '启用', statusColor: '#22c55e' },
  { id: 3, name: '王五', role: '编辑', status: '禁用', statusColor: '#ef4444' },
  { id: 4, name: '赵六', role: '访客', status: '启用', statusColor: '#22c55e' },
]

const roles = ['全部', '管理员', '运营', '编辑', '访客']
</script>

<template>
  <el-card shadow="never" class="panel">
    <template #header>
      <div class="panel__header">
        <span class="panel__title">用户管理</span>
      </div>
    </template>

    <!-- 筛选工具栏 -->
    <div class="toolbar">
      <el-input class="toolbar__search" placeholder="搜索用户名" :prefix-icon="Search" clearable />
      <el-select class="toolbar__select" placeholder="角色筛选">
        <el-option v-for="role in roles" :key="role" :label="role" :value="role" />
      </el-select>
      <el-button type="primary" :icon="Search">查询</el-button>
      <el-button :icon="Refresh">重置</el-button>
      <div class="toolbar__spacer"></div>
      <el-button type="primary" :icon="Plus">新增用户</el-button>
    </div>

    <!-- 用户表格 -->
    <el-table :data="users" class="data-table">
      <el-table-column type="selection" width="50" />
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="用户名" />
      <el-table-column prop="role" label="角色" />
      <el-table-column label="状态" width="120">
        <template #default="{ row }">
          <el-tag :color="row.statusColor" class="status-tag">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default>
          <el-button link type="primary">编辑</el-button>
          <el-button link type="danger" :icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style scoped lang="scss">
.panel {
  background: #fff;
  border-radius: 10px;
  border: none;

  :deep(.el-card__header) {
    padding: 16px 20px;
    border-bottom: 1px solid #f1f5f9;
  }

  .panel__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .panel__title {
    font-size: 15px;
    font-weight: 600;
    color: #0f172a;
  }
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;

  .toolbar__search {
    width: 220px;
  }

  .toolbar__select {
    width: 160px;
  }

  .toolbar__spacer {
    flex: 1;
  }
}

.data-table {
  :deep(.el-table__header th) {
    background: #f8fafc !important;
    color: #64748b !important;
    font-weight: 500 !important;
    font-size: 13px;
  }

  :deep(.el-table td) {
    font-size: 13px;
    color: #334155;
  }

  .status-tag {
    color: #fff;
    border: none;
  }
}
</style>
