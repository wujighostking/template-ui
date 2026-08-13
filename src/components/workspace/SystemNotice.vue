<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'

interface NoticeItem {
  title: string
  desc: string
  highlight?: boolean
}

const notices: NoticeItem[] = [
  {
    title: '系统升级通知 v2.4.0 已发布',
    desc: '新增权限按钮粒大屏、性能优化、BUG 修复若干项',
  },
  {
    title: '本周将进行数据库维护',
    desc: '定于本周六 02:00-04:00 进行例行维护升级，请提前',
  },
  {
    title: '安全补丁：建议立即更新',
    desc: '修复了 XSS 漏洞等安全问题，建议尽快升级到最新版本',
    highlight: true,
  },
  {
    title: '新功能上线：表单构建器',
    desc: '拖拽式设计动态表单，支持 18 种组件，可导出 JSON',
  },
  {
    title: '操作规范：密码定期更换提醒',
    desc: '为保障账号安全，请于 30 天内更新您的登录密码',
  },
  {
    title: '已完成 8 月份用户数据备份',
    desc: '备份文件已归档至 OSS，可在备份管理中查看详情',
  },
]
</script>

<template>
  <div class="system-notice">
    <div class="system-notice__header">
      <h3 class="system-notice__title">系统通知</h3>
      <a class="system-notice__more" href="javascript:void(0)">
        查看更多
        <el-icon><ArrowRight /></el-icon>
      </a>
    </div>

    <ul class="system-notice__list">
      <li v-for="(item, idx) in notices" :key="idx" class="system-notice__item">
        <h4
          class="system-notice__item-title"
          :class="{ 'system-notice__item-title--highlight': item.highlight }"
        >
          {{ item.title }}
        </h4>
        <p class="system-notice__item-desc">{{ item.desc }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.system-notice {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 18px 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  .system-notice__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    .system-notice__title {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
      color: #1e293b;
    }

    .system-notice__more {
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

  .system-notice__list {
    flex: 1;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    list-style: none;

    .system-notice__item {
      padding: 10px 0;
      border-bottom: 1px dashed #e2e8f0;

      &:last-child {
        border-bottom: none;
      }

      .system-notice__item-title {
        margin: 0 0 4px;
        font-size: 13px;
        font-weight: 600;
        color: #1e293b;

        &.system-notice__item-title--highlight {
          color: #ef4444;
        }
      }

      .system-notice__item-desc {
        margin: 0;
        font-size: 12px;
        line-height: 1.6;
        color: #94a3b8;
      }
    }
  }
}
</style>
