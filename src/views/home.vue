<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

import type { Role } from '@/schema/role.ts'
import { useUserStore } from '@/store/user.ts'

const userStore = useUserStore()

const { userInfo } = storeToRefs(userStore)

/** 当前时间，每秒刷新一次，用于实时时钟与问候语 */
const now = ref(new Date())

const pad = (num: number) => String(num).padStart(2, '0')

const greeting = computed(() => {
  const hour = now.value.getHours()
  if (hour >= 5 && hour < 11) return '早上好'
  if (hour >= 11 && hour < 13) return '中午好'
  if (hour >= 13 && hour < 18) return '下午好'
  return '晚上好'
})

const timeText = computed(() => {
  const d = now.value
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
})

const dateText = computed(() => {
  const d = now.value
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
})

const weekText = computed(() => `星期${'日一二三四五六'[now.value.getDay()]}`)

const displayName = computed(() => userInfo.value.nickname || userInfo.value.username || '用户')

const avatarText = computed(() => displayName.value.slice(0, 1).toUpperCase())

/** 角色：取权限级别（power 数字最小）最高的角色名 */
const roleName = computed(() => {
  const roles = userInfo.value.role
  if (!roles || roles.length === 0) return ''
  return roles.reduce<Role>((max, role) => (role.power < max.power ? role : max), roles[0]!)
    ?.roleName
})
</script>

<template>
  <div class="home">
    <section class="hero">
      <!-- 左侧：问候语 + 用户信息 -->
      <div class="hero__user">
        <el-avatar :size="72" :src="userInfo.avatar || undefined" class="hero__avatar">
          {{ avatarText }}
        </el-avatar>

        <div class="hero__meta">
          <div class="hero__title-row">
            <h2 class="hero__title">{{ greeting }}，{{ displayName }}！</h2>
            <span v-if="roleName" class="hero__role">{{ roleName }}</span>
          </div>

          <p class="hero__datetime">{{ timeText }} · {{ dateText }} {{ weekText }}</p>
          <p class="hero__slogan">欢迎回到云枢管理平台，祝您度过充实愉快的一天！</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;

  .hero {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 150px;
    padding: 32px 40px;
    overflow: hidden;
    color: #fff;
    background: linear-gradient(120deg, #60a5fa 0%, #3b82f6 55%, #2563eb 100%);
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(37, 99, 235, 0.18);

    /* 装饰圆形 */
    &::before,
    &::after {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);
      content: '';
      pointer-events: none;
    }

    &::before {
      top: -80px;
      right: -40px;
      width: 220px;
      height: 220px;
    }

    &::after {
      bottom: -110px;
      right: 180px;
      width: 180px;
      height: 180px;
      background: rgba(255, 255, 255, 0.05);
    }

    .hero__user {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 20px;
      min-width: 0;

      .hero__avatar {
        flex-shrink: 0;
        font-size: 28px;
        font-weight: 600;
        color: #fff;
        background: rgba(255, 255, 255, 0.2);
        border: 2px solid rgba(255, 255, 255, 0.55);
      }

      .hero__meta {
        min-width: 0;

        .hero__title-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;

          .hero__title {
            margin: 0;
            font-size: 26px;
            font-weight: 700;
            color: #fff;
            letter-spacing: 0.5px;
          }

          .hero__role {
            padding: 3px 12px;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.95);
            background: rgba(255, 255, 255, 0.16);
            border: 1px solid rgba(255, 255, 255, 0.35);
            border-radius: 999px;
            white-space: nowrap;
          }
        }

        .hero__datetime {
          margin: 10px 0 0;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
        }

        .hero__slogan {
          margin: 6px 0 0;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.72);
        }
      }
    }
  }
}
</style>
