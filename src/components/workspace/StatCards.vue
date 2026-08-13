<script setup lang="ts">
import { User, Avatar, Grid, OfficeBuilding } from '@element-plus/icons-vue'

interface StatCard {
  label: string
  value: number
  icon: string
  iconClass: string
}

const cards: StatCard[] = [
  { label: '用户数', value: 28, icon: 'User', iconClass: 'stat-cards__icon--blue' },
  { label: '角色数', value: 5, icon: 'Avatar', iconClass: 'stat-cards__icon--green' },
  { label: '菜单数', value: 15, icon: 'Grid', iconClass: 'stat-cards__icon--orange' },
  { label: '部门数', value: 8, icon: 'OfficeBuilding', iconClass: 'stat-cards__icon--purple' },
]

const iconMap: Record<string, any> = { User, Avatar, Grid, OfficeBuilding }
</script>

<template>
  <ul class="stat-cards">
    <li v-for="item in cards" :key="item.label" class="stat-cards__item">
      <div class="stat-cards__icon" :class="item.iconClass">
        <el-icon :size="20">
          <component :is="iconMap[item.icon]" />
        </el-icon>
      </div>
      <div class="stat-cards__info">
        <span class="stat-cards__label">{{ item.label }}</span>
        <span class="stat-cards__value">{{ item.value }}</span>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.stat-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;

  .stat-cards__item {
    display: flex;
    align-items: center;
    gap: 16px;
    height: 76px;
    padding: 0 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    transition: box-shadow 0.2s;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .stat-cards__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 8px;
      flex-shrink: 0;

      &.stat-cards__icon--blue {
        background: #dbeafe;
        color: #2563eb;
      }

      &.stat-cards__icon--green {
        background: #dcfce7;
        color: #16a34a;
      }

      &.stat-cards__icon--orange {
        background: #fed7aa;
        color: #ea580c;
      }

      &.stat-cards__icon--purple {
        background: #ede9fe;
        color: #7c3aed;
      }
    }

    .stat-cards__info {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .stat-cards__label {
        font-size: 13px;
        color: #64748b;
      }

      .stat-cards__value {
        font-size: 22px;
        font-weight: 600;
        color: #1e293b;
      }
    }
  }
}
</style>
