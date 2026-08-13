<script setup lang="ts">
import QuickEntries from '@/components/workspace/QuickEntries.vue'
import StatCards from '@/components/workspace/StatCards.vue'
import SystemNotice from '@/components/workspace/SystemNotice.vue'
import UserDistribution from '@/components/workspace/UserDistribution.vue'
import VisitTrend from '@/components/workspace/VisitTrend.vue'
import WelcomeBanner from '@/components/workspace/WelcomeBanner.vue'
</script>

<template>
  <div class="workspace">
    <!-- 顶部欢迎横幅 -->
    <WelcomeBanner />

    <!-- 统计卡片 -->
    <StatCards />

    <!-- 快速入口 + 系统通知 -->
    <div class="workspace__row">
      <div class="workspace__col-left">
        <QuickEntries />
      </div>
      <div class="workspace__col-right">
        <SystemNotice />
      </div>
    </div>

    <!-- 访问量趋势 + 用户分布 -->
    <div class="workspace__row workspace__row--bottom">
      <div class="workspace__col-left">
        <VisitTrend />
      </div>
      <div class="workspace__col-right">
        <UserDistribution />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.workspace {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  .workspace__row {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 16px;
    width: 100%;

    &.workspace__row--bottom {
      .workspace__col-left,
      .workspace__col-right {
        height: 320px;
      }
    }
  }

  .workspace__col-left {
    min-width: 0;
  }

  .workspace__col-right {
    min-width: 0;
  }
}
</style>
