<script setup lang="ts">
import {
  House,
  User,
  Goods,
  Document,
  DataAnalysis,
  Setting,
  Search,
  Bell,
} from '@element-plus/icons-vue'
import { type Component, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface MenuItem {
  index: string
  title: string
  icon: string
}

const router = useRouter()
const route = useRoute()

const activeMenu = computed(() => route.path)

const menus: MenuItem[] = [
  { index: '/dashboard', title: '首页', icon: 'House' },
  { index: '/user', title: '用户管理', icon: 'User' },
  { index: '/goods', title: '商品管理', icon: 'Goods' },
  { index: '/order', title: '订单管理', icon: 'Document' },
  { index: '/statistics', title: '数据统计', icon: 'DataAnalysis' },
  { index: '/settings', title: '系统设置', icon: 'Setting' },
]

const icons: Record<string, Component> = {
  House,
  User,
  Goods,
  Document,
  DataAnalysis,
  Setting,
}

function handleMenuSelect(index: string) {
  router.push(index)
}
</script>

<template>
  <div class="admin-layout">
    <!-- 头部 -->
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

    <div class="admin-body">
      <!-- 左侧菜单栏 -->
      <aside class="admin-aside">
        <el-menu
          :default-active="activeMenu"
          class="admin-menu"
          background-color="transparent"
          text-color="#475569"
          active-text-color="#3b82f6"
          @select="handleMenuSelect"
        >
          <el-menu-item v-for="item in menus" :key="item.index" :index="item.index">
            <el-icon>
              <component :is="icons[item.icon]" />
            </el-icon>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
      </aside>

      <!-- 右侧内容主体区 -->
      <main class="admin-main">
        <el-card shadow="never" class="content-card">
          <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>工作台</el-breadcrumb-item>
          </el-breadcrumb>

          <router-view />
        </el-card>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.admin-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: #f8fafc;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    PingFang SC,
    Hiragino Sans GB,
    Microsoft YaHei,
    sans-serif;
  color: #1e293b;

  /* 头部 */
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

  /* 主体 */
  .admin-body {
    display: flex;
    flex: 1;
    min-height: 0;

    /* 左侧菜单 */
    .admin-aside {
      width: 220px;
      background: #fff;
      border-right: 1px solid #e2e8f0;
      padding: 16px 0;
      overflow-y: auto;

      .admin-menu {
        border-right: none !important;

        :deep(.el-menu-item) {
          height: 44px;
          line-height: 44px;
          margin: 4px 12px;
          border-radius: 8px;
        }

        :deep(.el-menu-item:hover) {
          background-color: #f1f5f9 !important;
          color: #3b82f6 !important;
        }

        :deep(.el-menu-item.is-active) {
          background-color: #eff6ff !important;
          color: #3b82f6 !important;
          font-weight: 600;
        }
      }
    }

    /* 右侧主体 */
    .admin-main {
      flex: 1;
      padding: 16px;
      overflow-y: auto;

      .content-card {
        background: transparent;
        border: none;

        .breadcrumb {
          margin-bottom: 16px;
        }

        :deep(.el-card__body) {
          padding: 8px;
        }
      }
    }
  }
}
</style>
