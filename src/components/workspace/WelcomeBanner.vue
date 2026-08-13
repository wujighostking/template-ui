<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'

interface StatItem {
  label: string
  value: number
  iconBg: string
  iconColor: string
}

const stats: StatItem[] = [
  { label: '今日访问', value: 28, iconBg: '#dbeafe', iconColor: '#2563eb' },
  { label: '待办任务', value: 3, iconBg: '#fef3c7', iconColor: '#f59e0b' },
  { label: '本周操作', value: 156, iconBg: '#dcfce7', iconColor: '#16a34a' },
]
</script>

<template>
  <div class="welcome-banner">
    <div class="welcome-banner__left">
      <h2 class="welcome-banner__title">早上好，admin，今天是个美好的开始!</h2>
      <p class="welcome-banner__meta">
        <span>登录次数: 12</span>
        <span class="welcome-banner__divider">·</span>
        <span>上次登录: 2024-08-13 09:30</span>
        <span class="welcome-banner__divider">·</span>
        <span>IP: 192.168.1.100</span>
      </p>
    </div>

    <ul class="welcome-banner__stats">
      <li v-for="item in stats" :key="item.label" class="welcome-banner__stat-item">
        <span class="welcome-banner__stat-value">{{ item.value }}</span>
        <span class="welcome-banner__stat-label">
          {{ item.label }}
          <el-icon class="welcome-banner__arrow"><ArrowRight /></el-icon>
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.welcome-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 96px;
  padding: 0 28px;
  border-radius: 8px;
  background: linear-gradient(90deg, #60a5fa 0%, #3b82f6 100%);
  color: #fff;

  .welcome-banner__left {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .welcome-banner__title {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: #fff;
    }

    .welcome-banner__meta {
      display: flex;
      align-items: center;
      gap: 6px;
      margin: 0;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.9);

      .welcome-banner__divider {
        margin: 0 4px;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }

  .welcome-banner__stats {
    display: flex;
    align-items: center;
    gap: 28px;
    margin: 0;
    padding: 0;
    list-style: none;

    .welcome-banner__stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;

      .welcome-banner__stat-value {
        font-size: 26px;
        font-weight: 600;
        line-height: 1;
        color: #fff;
      }

      .welcome-banner__stat-label {
        display: flex;
        align-items: center;
        gap: 2px;
        font-size: 13px;
        color: rgba(255, 255, 255, 0.9);

        .welcome-banner__arrow {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
