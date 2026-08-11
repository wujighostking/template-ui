<script setup lang="ts">
import { Check } from '@element-plus/icons-vue'
</script>

<template>
  <!-- 左侧品牌介绍区域 -->
  <div class="login-brand">
    <div class="brand-header">
      <div class="brand-logo">
        <el-icon><Check /></el-icon>
      </div>
      <span class="brand-name">云枢管理平台</span>
    </div>

    <div class="brand-content">
      <h1 class="brand-title">让企业管理更简单</h1>
      <p class="brand-desc">
        云枢管理平台，为企业提供一站式数字化解决方案，助力团队高效协同、稳健增长。
      </p>

      <ul class="brand-features">
        <li class="brand-feature">
          <el-icon><Check /></el-icon>
          <span>数据安全加密，权限精细管控</span>
        </li>
        <li class="brand-feature">
          <el-icon><Check /></el-icon>
          <span>多端协同办公，消息实时同步</span>
        </li>
        <li class="brand-feature">
          <el-icon><Check /></el-icon>
          <span>智能数据分析，辅助经营决策</span>
        </li>
      </ul>
    </div>

    <div class="brand-stats">
      <div class="stat-item">
        <div class="stat-value">12,800+</div>
        <div class="stat-label">服务企业客户</div>
      </div>
      <div class="stat-divider" />
      <div class="stat-item">
        <div class="stat-value">99.9%</div>
        <div class="stat-label">服务可用性</div>
      </div>
      <div class="stat-divider" />
      <div class="stat-item">
        <div class="stat-value">8ms</div>
        <div class="stat-label">平均响应时间</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* 左侧品牌区 */
.login-brand {
  position: relative;
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 60px 80px;
  color: #fff;
  background:
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.2) 0%, transparent 40%),
    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    linear-gradient(135deg, #3eb6f0 0%, #2cc4b1 100%);

  .brand-header {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 18px;

    .brand-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      font-size: 18px;
      color: #2cc4b1;
      background: #fff;
      border-radius: 8px;
    }

    .brand-name {
      font-weight: 600;
      letter-spacing: 1px;
    }
  }

  .brand-content {
    max-width: 520px;

    .brand-title {
      margin: 0 0 24px;
      font-size: 42px;
      font-weight: 700;
      line-height: 1.3;
      letter-spacing: 2px;
    }

    .brand-desc {
      margin: 0 0 40px;
      font-size: 15px;
      line-height: 1.8;
      opacity: 0.92;
    }

    .brand-features {
      padding: 0;
      margin: 0;
      list-style: none;

      .brand-feature {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 18px;
        font-size: 15px;

        .el-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          font-size: 14px;
          color: #2cc4b1;
          background: #fff;
          border-radius: 50%;
        }
      }
    }
  }

  .brand-stats {
    display: flex;
    align-items: center;
    padding: 28px 36px;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    backdrop-filter: blur(10px);

    .stat-item {
      flex: 1;
      text-align: center;
      color: #fff;

      .stat-value {
        margin-bottom: 6px;
        font-size: 28px;
        font-weight: 700;
      }

      .stat-label {
        font-size: 13px;
        opacity: 0.85;
      }
    }

    .stat-divider {
      width: 1px;
      height: 36px;
      background: rgba(255, 255, 255, 0.3);
    }
  }

  /* 响应式 */
  @media (width <= 900px) {
    display: none;
  }
}
</style>
