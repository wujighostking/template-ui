<script setup lang="ts">
import { computed } from 'vue'

interface DistItem {
  label: string
  value: number
  color: string
}

const items: DistItem[] = [
  { label: '活跃用户', value: 30, color: '#3b82f6' },
  { label: '普通用户', value: 20, color: '#22c55e' },
  { label: '新注册', value: 25, color: '#f97316' },
]

const total = items.reduce((acc, cur) => acc + cur.value, 0)
const size = 220
const stroke = 22
const radius = (size - stroke) / 2
const cx = size / 2
const cy = size / 2
const circumference = 2 * Math.PI * radius

const centerText = computed(() => {
  // 模拟 28 总用户
  return { value: 28, label: '总用户' }
})

const segments = computed(() => {
  let offset = 0
  return items.map((it) => {
    const len = (it.value / 100) * circumference
    const seg = {
      ...it,
      dasharray: `${len} ${circumference - len}`,
      dashoffset: -offset,
      key: it.label,
    }
    offset += len
    return seg
  })
})
</script>

<template>
  <div class="user-distribution">
    <div class="user-distribution__header">
      <h3 class="user-distribution__title">用户分布</h3>
    </div>

    <div class="user-distribution__chart">
      <div class="user-distribution__ring">
        <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
          <circle
            :cx="cx"
            :cy="cy"
            :r="radius"
            fill="none"
            stroke="#e2e8f0"
            :stroke-width="stroke"
          />
          <circle
            v-for="seg in segments"
            :key="seg.key"
            :cx="cx"
            :cy="cy"
            :r="radius"
            fill="none"
            :stroke="seg.color"
            :stroke-width="stroke"
            :stroke-dasharray="seg.dasharray"
            :stroke-dashoffset="seg.dashoffset"
            stroke-linecap="butt"
            :transform="`rotate(-90 ${cx} ${cy})`"
          />
        </svg>
        <div class="user-distribution__center">
          <span class="user-distribution__value">{{ centerText.value }}</span>
          <span class="user-distribution__label">{{ centerText.label }}</span>
        </div>
      </div>
    </div>

    <ul class="user-distribution__legend">
      <li v-for="item in items" :key="item.label" class="user-distribution__legend-item">
        <span class="user-distribution__dot" :style="{ background: item.color }"></span>
        <span class="user-distribution__legend-label">{{ item.label }}</span>
        <span class="user-distribution__legend-value">{{ item.value }}%</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.user-distribution {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 18px 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  .user-distribution__header {
    margin-bottom: 8px;

    .user-distribution__title {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
      color: #1e293b;
    }
  }

  .user-distribution__chart {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 0;

    .user-distribution__ring {
      position: relative;
      width: 220px;
      height: 220px;

      .user-distribution__center {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        pointer-events: none;

        .user-distribution__value {
          font-size: 28px;
          font-weight: 700;
          line-height: 1;
          color: #1e293b;
        }

        .user-distribution__label {
          margin-top: 6px;
          font-size: 12px;
          color: #94a3b8;
        }
      }
    }
  }

  .user-distribution__legend {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 12px 0 0;
    padding: 0;
    list-style: none;

    .user-distribution__legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;

      .user-distribution__dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }

      .user-distribution__legend-label {
        flex: 1;
        color: #475569;
      }

      .user-distribution__legend-value {
        font-weight: 600;
        color: #1e293b;
      }
    }
  }
}
</style>
