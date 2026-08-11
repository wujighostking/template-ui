<script setup lang="ts">
import { UserFilled, Document, Goods, DataAnalysis } from '@element-plus/icons-vue'

interface StatItem {
  label: string
  value: string
  icon: any
  color: string
  bg: string
}

const stats: StatItem[] = [
  { label: '总用户', value: '12,836', icon: UserFilled, color: '#3b82f6', bg: '#eff6ff' },
  { label: '总订单', value: '8,452', icon: Document, color: '#22c55e', bg: '#f0fdf4' },
  { label: '总商品', value: '326', icon: Goods, color: '#f59e0b', bg: '#fffbeb' },
  { label: '访问量', value: '48,629', icon: DataAnalysis, color: '#8b5cf6', bg: '#f5f3ff' },
]

const reportTabs = ['本周', '本月', '本年']
const reportData = [120, 200, 90, 260, 180, 320, 240, 150, 290, 210, 340, 280]
const reportLabels = [
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月',
]
const reportMax = Math.max(...reportData)

const topGoods = [
  { name: '蓝牙耳机', sales: '3,240' },
  { name: '智能手表', sales: '2,180' },
  { name: '机械键盘', sales: '1,860' },
  { name: '无线充电器', sales: '1,120' },
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

  <!-- 报表 + 排行 -->
  <section class="overview-grid">
    <el-card shadow="never" class="panel panel--chart">
      <template #header>
        <div class="panel__header">
          <span class="panel__title">数据报表</span>
          <div class="panel__tabs">
            <span v-for="tab in reportTabs" :key="tab" class="tab-item">{{ tab }}</span>
          </div>
        </div>
      </template>
      <div class="chart">
        <div class="chart__bars">
          <div
            v-for="(val, i) in reportData"
            :key="i"
            class="chart__bar"
            :style="{ height: `${(val / reportMax) * 100}%` }"
          ></div>
        </div>
        <div class="chart__labels">
          <span v-for="label in reportLabels" :key="label" class="chart__label">
            {{ label }}
          </span>
        </div>
      </div>
    </el-card>

    <el-card shadow="never" class="panel panel--rank">
      <template #header>
        <span class="panel__title">商品销量排行</span>
      </template>
      <ul class="rank-list">
        <li v-for="(item, i) in topGoods" :key="item.name" class="rank-item">
          <span class="rank-item__index" :class="{ 'rank-item__index--top': i < 3 }">{{
            i + 1
          }}</span>
          <span class="rank-item__name">{{ item.name }}</span>
          <span class="rank-item__sales">{{ item.sales }}</span>
        </li>
      </ul>
    </el-card>
  </section>
</template>

<style scoped lang="scss">
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

.overview-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;

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
          margin: 0 4px;
          background: linear-gradient(180deg, #60a5fa, #3b82f6);
          border-radius: 4px 4px 0 0;
          min-height: 8px;
          transition: opacity 0.2s;

          &:hover {
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

  .panel--rank {
    .rank-list {
      list-style: none;
      padding: 8px 4px;
      margin: 0;

      .rank-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 14px;
        margin-bottom: 10px;
        background: #f8fafc;
        border-radius: 8px;
        font-size: 13px;

        .rank-item__index {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 6px;
          background: #e2e8f0;
          color: #64748b;
          font-weight: 600;
          flex-shrink: 0;
        }

        .rank-item__index--top {
          background: #3b82f6;
          color: #fff;
        }

        .rank-item__name {
          flex: 1;
          color: #334155;
        }

        .rank-item__sales {
          color: #0f172a;
          font-weight: 600;
        }
      }
    }
  }
}

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
</style>
