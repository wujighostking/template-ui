<script setup lang="ts">
import AdminAside from '@/components/AdminAside.vue'
import AdminHeader from '@/components/AdminHeader.vue'
</script>

<template>
  <div class="admin-layout">
    <!-- 头部 -->
    <AdminHeader />

    <div class="admin-body">
      <!-- 左侧菜单栏 -->
      <AdminAside />

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

  /* 主体 */
  .admin-body {
    display: flex;
    flex: 1;
    min-height: 0;

    /* 右侧主体 */
    .admin-main {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      height: 100%;

      .content-card {
        background: transparent;
        border: none;

        .breadcrumb {
          margin-bottom: 16px;
        }

        :deep(.el-card__body) {
          padding: 8px;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
