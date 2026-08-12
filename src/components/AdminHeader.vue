<script setup lang="ts">
import { Bell, House, Search } from '@element-plus/icons-vue'
</script>

<template>
  <header class="admin-header">
    <div class="admin-header__left">
      <div class="admin-logo">
        <el-icon><House /></el-icon>
        <span class="admin-logo__text">Admin Pro</span>
      </div>
    </div>
    <div class="admin-header__right">
      <el-icon class="header-icon"><Search /></el-icon>
      <el-icon class="header-icon"><Bell /></el-icon>
      <div class="admin-user">
        <el-avatar :size="32" class="admin-user__avatar">A</el-avatar>
        <span class="admin-user__name">管理员</span>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 24px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;

  .admin-header__left,
  .admin-header__right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .admin-header__left {
    .admin-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;

      .admin-logo__text {
        letter-spacing: 0.5px;
      }
    }
  }

  .admin-header__right {
    .header-icon {
      font-size: 18px;
      color: #64748b;
      cursor: pointer;
      transition: color 0.2s;
    }

    .header-icon:hover {
      color: #3b82f6;
    }

    .admin-user {
      display: flex;
      align-items: center;
      gap: 8px;

      .admin-user__avatar {
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        color: #fff;
        font-weight: 600;
      }

      .admin-user__name {
        font-size: 14px;
        color: #334155;
      }
    }
  }
}
</style>
