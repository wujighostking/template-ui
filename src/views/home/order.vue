<script setup lang="ts">
import { Search, Refresh } from '@element-plus/icons-vue'

interface OrderItem {
  id: string
  goods: string
  user: string
  amount: string
  status: string
  statusColor: string
  time: string
}

const orders: OrderItem[] = [
  {
    id: 'DD20240801',
    goods: '蓝牙耳机',
    user: '张三',
    amount: '¥299.00',
    status: '已完成',
    statusColor: '#22c55e',
    time: '2026-08-01 10:30',
  },
  {
    id: 'DD20240802',
    goods: '智能手表',
    user: '李四',
    amount: '¥1,299.00',
    status: '处理中',
    statusColor: '#f59e0b',
    time: '2026-08-02 14:20',
  },
  {
    id: 'DD20240803',
    goods: '无线充电器',
    user: '王五',
    amount: '¥159.00',
    status: '待付款',
    statusColor: '#ef4444',
    time: '2026-08-03 09:10',
  },
  {
    id: 'DD20240804',
    goods: '机械键盘',
    user: '赵六',
    amount: '¥499.00',
    status: '已取消',
    statusColor: '#94a3b8',
    time: '2026-08-04 16:45',
  },
]

const statusOptions = ['全部', '已完成', '处理中', '待付款', '已取消']
</script>

<template>
  <el-card shadow="never" class="panel">
    <template #header>
      <div class="panel__header">
        <span class="panel__title">订单管理</span>
      </div>
    </template>

    <!-- 筛选工具栏 -->
    <div class="toolbar">
      <el-input
        class="toolbar__search"
        placeholder="搜索订单编号"
        :prefix-icon="Search"
        clearable
      />
      <el-select class="toolbar__select" placeholder="订单状态">
        <el-option v-for="s in statusOptions" :key="s" :label="s" :value="s" />
      </el-select>
      <el-button type="primary" :icon="Search">查询</el-button>
      <el-button :icon="Refresh">重置</el-button>
    </div>

    <!-- 订单表格 -->
    <el-table :data="orders" class="data-table">
      <el-table-column prop="id" label="订单编号" width="150" />
      <el-table-column prop="goods" label="商品名称" />
      <el-table-column prop="user" label="用户" width="120" />
      <el-table-column prop="amount" label="金额" width="140" />
      <el-table-column prop="time" label="下单时间" width="180" />
      <el-table-column label="状态" width="120">
        <template #default="{ row }">
          <el-tag :color="row.statusColor" class="status-tag">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140">
        <template #default>
          <el-button link type="primary">详情</el-button>
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
