<script setup lang="ts">
import { computed } from 'vue'

const xLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const values = [10, 22, 8, 28, 14, 30, 18]

const width = 880
const height = 240
const padding = { top: 20, right: 20, bottom: 36, left: 40 }

const maxValue = Math.max(...values) * 1.2
const minValue = 0

const stepX = (width - padding.left - padding.right) / (xLabels.length - 1)
const chartHeight = height - padding.top - padding.bottom

function toY(v: number) {
  return padding.top + chartHeight - ((v - minValue) / (maxValue - minValue)) * chartHeight
}
function toX(i: number) {
  return padding.left + i * stepX
}

const points = computed(() => values.map((v, i) => ({ x: toX(i), y: toY(v), v })))

const pathLine = computed(() =>
  points.value.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' '),
)
const pathArea = computed(() => {
  const start = `M ${points.value[0]!.x} ${padding.top + chartHeight}`
  const lineSegs = points.value.map((p) => `L ${p.x} ${p.y}`).join(' ')
  const end = `L ${points.value[points.value.length - 1]!.x} ${padding.top + chartHeight} Z`
  return `${start} ${lineSegs} ${end}`
})

const yGridLines = [0, 0.25, 0.5, 0.75, 1].map((p) => {
  const y = padding.top + chartHeight * p
  const v = maxValue - (maxValue - minValue) * p
  return { y, v: Math.round(v) }
})
</script>

<template>
  <div class="visit-trend">
    <div class="visit-trend__header">
      <h3 class="visit-trend__title">访问量趋势</h3>
      <span class="visit-trend__range">最近 7 天</span>
    </div>

    <div class="visit-trend__chart">
      <svg :viewBox="`0 0 ${width} ${height}`" preserveAspectRatio="none" class="visit-trend__svg">
        <defs>
          <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.35" />
            <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
          </linearGradient>
        </defs>

        <g class="visit-trend__grid">
          <line
            v-for="(g, i) in yGridLines"
            :key="i"
            :x1="padding.left"
            :x2="width - padding.right"
            :y1="g.y"
            :y2="g.y"
            stroke="#e2e8f0"
            stroke-dasharray="4 4"
            stroke-width="1"
          />
        </g>

        <path :d="pathArea" fill="url(#trendGradient)" />
        <path :d="pathLine" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linejoin="round" />

        <g class="visit-trend__points">
          <g v-for="p in points" :key="p.x">
            <circle :cx="p.x" :cy="p.y" r="8" fill="#3b82f6" fill-opacity="0.15" />
            <circle :cx="p.x" :cy="p.y" r="4" fill="#3b82f6" stroke="#fff" stroke-width="2" />
          </g>
        </g>

        <g class="visit-trend__x-axis">
          <text
            v-for="(label, i) in xLabels"
            :key="label"
            :x="toX(i)"
            :y="height - 12"
            text-anchor="middle"
            fill="#94a3b8"
            font-size="12"
          >
            {{ label }}
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
.visit-trend {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 18px 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  .visit-trend__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;

    .visit-trend__title {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
      color: #1e293b;
    }

    .visit-trend__range {
      font-size: 13px;
      color: #94a3b8;
    }
  }

  .visit-trend__chart {
    flex: 1;
    width: 100%;
    min-height: 0;

    .visit-trend__svg {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
</style>
