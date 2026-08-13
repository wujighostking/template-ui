<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

interface EntryItem {
  label: string
  icon: string
  path: string
}

const router = useRouter()

const entries: EntryItem[] = [
  { label: '用户管理', icon: 'User', path: '/system/user' },
  { label: '角色管理', icon: 'Avatar', path: '/system/role' },
  { label: '菜单管理', icon: 'Menu', path: '/system/menu' },
  { label: '部门管理', icon: 'OfficeBuilding', path: '/system/dept' },
  { label: '岗位管理', icon: 'Postcard', path: '/system/post' },
  { label: '字典管理', icon: 'Notebook', path: '/system/dict' },
]

function handleClick(item: EntryItem) {
  router.push(item.path).catch(() => {})
}
</script>

<template>
  <div class="quick-entries">
    <div class="quick-entries__header">
      <h3 class="quick-entries__title">快速入口</h3>
      <a class="quick-entries__more" href="javascript:void(0)">
        查看更多
        <el-icon><ArrowRight /></el-icon>
      </a>
    </div>

    <ul class="quick-entries__list">
      <li
        v-for="item in entries"
        :key="item.label"
        class="quick-entries__item"
        @click="handleClick(item)"
      >
        <el-icon :size="22" class="quick-entries__icon">
          <component :is="item.icon" />
        </el-icon>
        <span class="quick-entries__label">{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.quick-entries {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 18px 20px 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  .quick-entries__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;

    .quick-entries__title {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
      color: #1e293b;
    }

    .quick-entries__more {
      display: flex;
      align-items: center;
      gap: 2px;
      font-size: 13px;
      color: #3b82f6;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        color: #2563eb;
      }
    }
  }

  .quick-entries__list {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 12px;
    margin: 0;
    padding: 0;
    list-style: none;

    .quick-entries__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: 88px;
      background: #f1f5f9;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: #e0e7ff;
        transform: translateY(-2px);
      }

      .quick-entries__icon {
        color: #3b82f6;
      }

      .quick-entries__label {
        font-size: 13px;
        color: #475569;
      }
    }
  }
}
</style>
