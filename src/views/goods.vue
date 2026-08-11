<script setup lang="ts">
import { Search, Refresh, Plus, Delete } from '@element-plus/icons-vue'

interface GoodsItem {
  id: number
  name: string
  category: string
  price: string
  stock: number
  status: string
  statusColor: string
}

const goodsList: GoodsItem[] = [
  {
    id: 1,
    name: '蓝牙耳机',
    category: '数码',
    price: '¥299.00',
    stock: 120,
    status: '在售',
    statusColor: '#22c55e',
  },
  {
    id: 2,
    name: '智能手表',
    category: '数码',
    price: '¥1,299.00',
    stock: 45,
    status: '在售',
    statusColor: '#22c55e',
  },
  {
    id: 3,
    name: '无线充电器',
    category: '配件',
    price: '¥159.00',
    stock: 0,
    status: '下架',
    statusColor: '#ef4444',
  },
  {
    id: 4,
    name: '机械键盘',
    category: '外设',
    price: '¥499.00',
    stock: 80,
    status: '在售',
    statusColor: '#22c55e',
  },
]

const categories = ['全部', '数码', '外设', '配件']
</script>

<template>
  <el-card shadow="never" class="panel">
    <template #header>
      <div class="panel__header">
        <span class="panel__title">商品管理</span>
      </div>
    </template>

    <!-- 筛选工具栏 -->
    <div class="toolbar">
      <el-input
        class="toolbar__search"
        placeholder="搜索商品名称"
        :prefix-icon="Search"
        clearable
      />
      <el-select class="toolbar__select" placeholder="分类筛选">
        <el-option v-for="cat in categories" :key="cat" :label="cat" :value="cat" />
      </el-select>
      <el-button type="primary" :icon="Search">查询</el-button>
      <el-button :icon="Refresh">重置</el-button>
      <div class="toolbar__spacer"></div>
      <el-button type="primary" :icon="Plus">新增商品</el-button>
    </div>

    <!-- 商品表格 -->
    <el-table :data="goodsList" class="data-table">
      <el-table-column type="selection" width="50" />
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="商品名称" />
      <el-table-column prop="category" label="分类" width="120" />
      <el-table-column prop="price" label="价格" width="140" />
      <el-table-column prop="stock" label="库存" width="120" />
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
