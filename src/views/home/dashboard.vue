<script setup lang="ts">
import { UserFilled, Document, Goods, DataAnalysis } from '@element-plus/icons-vue'

interface StatCard {
  label: string
  value: string
  icon: any
  color: string
  bg: string
}

const stats: StatCard[] = [
  { label: '用户总数', value: '12,836', icon: UserFilled, color: '#3b82f6', bg: '#eff6ff' },
  { label: '订单总数', value: '8,452', icon: Document, color: '#22c55e', bg: '#f0fdf4' },
  { label: '销售额', value: '¥96,388', icon: Goods, color: '#f59e0b', bg: '#fffbeb' },
  { label: '访问量', value: '48,629', icon: DataAnalysis, color: '#8b5cf6', bg: '#f5f3ff' },
]

const trendTabs = ['本周', '本月']
const trendData = [180, 320, 140, 400, 280, 480, 320]
const trendLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const trendMax = Math.max(...trendData)

const todos = [
  { text: '审核 3 条用户注册申请', color: '#3b82f6' },
  { text: '处理 2 条商品上架请求', color: '#f59e0b' },
  { text: '确认 5 笔订单发货信息', color: '#22c55e' },
  { text: '回复 8 条用户咨询消息', color: '#ef4444' },
]

const orders = [
  {
    id: 'DD20240801',
    name: '蓝牙耳机',
    user: '张三',
    amount: '¥299.00',
    status: '已完成',
    statusColor: '#22c55e',
  },
  {
    id: 'DD20240802',
    name: '智能手表',
    user: '李四',
    amount: '¥1,299.00',
    status: '处理中',
    statusColor: '#f59e0b',
  },
  {
    id: 'DD20240803',
    name: '无线充电器',
    user: '王五',
    amount: '¥159.00',
    status: '待付款',
    statusColor: '#ef4444',
  },
]
</script>

<template>
  <!-- 统计卡片 -->
  <section class="statistics-grid">
    <div v-for="item in stats" :key="item.label" class="statistics-card">
      <div class="statistics-card__icon" :style="{ background: item.bg, color: item.color }">
        <el-icon :size="24"><component :is="item.icon" /></el-icon>
      </div>
      <div class="statistics-card__info">
        <div class="statistics-card__label">{{ item.label }}</div>
        <div class="statistics-card__value">{{ item.value }}</div>
      </div>
    </div>
  </section>

  <!-- 图表 + 待办 -->
  <section class="overview-grid">
    <el-card shadow="never" class="panel panel--chart">
      <template #header>
        <div class="panel__header">
          <span class="panel__title">访问趋势</span>
          <div class="panel__tabs">
            <span v-for="tab in trendTabs" :key="tab" class="tab-item">{{ tab }}</span>
          </div>
        </div>
      </template>
      <div class="chart">
        <div class="chart__bars">
          <div
            v-for="(val, i) in trendData"
            :key="i"
            class="chart__bar"
            :style="{ height: `${(val / trendMax) * 100}%` }"
          ></div>
        </div>
        <div class="chart__labels">
          <span v-for="label in trendLabels" :key="label" class="chart__label">
            {{ label }}
          </span>
        </div>
      </div>
    </el-card>

    <el-card shadow="never" class="panel panel--todo">
      <template #header>
        <span class="panel__title">待办事项</span>
      </template>
      <ul class="todo-list">
        <li v-for="(todo, i) in todos" :key="i" class="todo-item">
          <span class="todo-item__dot" :style="{ background: todo.color }"></span>
          <span class="todo-item__text">{{ todo.text }}</span>
        </li>
      </ul>
    </el-card>
  </section>

  <!-- 最近订单 -->
  <el-card shadow="never" class="panel">
    <template #header>
      <div class="panel__header">
        <span class="panel__title">最近订单</span>
        <a class="panel__more">查看全部</a>
      </div>
    </template>
    <el-table :data="orders" class="order-table" header-row-class-name="order-table__head">
      <el-table-column prop="id" label="订单编号" />
      <el-table-column prop="name" label="商品名称" />
      <el-table-column prop="user" label="用户" />
      <el-table-column prop="amount" label="金额" />
      <el-table-column label="状态">
        <template #default="{ row }">
          <span class="order-status" :style="{ color: row.statusColor }">
            {{ row.status }}
          </span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style scoped lang="scss">
/* 统计卡片 */
.statistics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 16px;

  .statistics-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);

    .statistics-card__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      border-radius: 12px;
    }

    .statistics-card__info {
      display: flex;
      flex-direction: column;

      .statistics-card__label {
        font-size: 13px;
        color: #64748b;
        margin-bottom: 6px;
      }

      .statistics-card__value {
        font-size: 22px;
        font-weight: 700;
        color: #0f172a;
      }
    }
  }
}

/* 图表 + 待办 区域 */
.overview-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  margin-bottom: 16px;

  .panel--chart {
    .chart {
      padding: 16px 8px 0;

      .chart__bars {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        height: 220px;
        padding: 0 4px;
        border-bottom: 1px solid #e2e8f0;

        .chart__bar {
          flex: 1;
          margin: 0 8px;
          background: linear-gradient(180deg, #60a5fa, #3b82f6);
          border-radius: 4px 4px 0 0;
          min-height: 8px;
          transition: opacity 0.2s;

          .chart__bar:hover {
            opacity: 0.8;
          }
        }
      }

      .chart__labels {
        display: flex;
        justify-content: space-between;
        padding: 8px 4px 0;

        .chart__label {
          flex: 1;
          text-align: center;
          font-size: 12px;
          color: #94a3b8;
        }
      }
    }
  }

  .panel--todo {
    .todo-list {
      list-style: none;
      padding: 8px 4px;
      margin: 0;

      .todo-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 14px;
        margin-bottom: 10px;
        background: #f8fafc;
        border-radius: 8px;
        font-size: 13px;
        color: #334155;

        .todo-item__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .todo-item__text {
          flex: 1;
        }
      }
    }
  }
}

/* 通用面板 */
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

  .panel__more {
    font-size: 13px;
    color: #3b82f6;
    cursor: pointer;
  }

  .panel__more:hover {
    text-decoration: underline;
  }

  .panel__tabs {
    display: flex;
    gap: 12px;

    .tab-item {
      font-size: 13px;
      color: #64748b;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .tab-item:first-child {
      color: #3b82f6;
      background: #eff6ff;
    }
  }
}

/* 最近订单表格 */
.order-table {
  border-radius: 8px;
  overflow: hidden;

  :deep(.order-table__head th) {
    background: #f8fafc !important;
    color: #64748b !important;
    font-weight: 500 !important;
    font-size: 13px;
  }

  :deep(.order-table td) {
    font-size: 13px;
    color: #334155;
  }

  .order-status {
    font-weight: 500;
  }
}
</style>
