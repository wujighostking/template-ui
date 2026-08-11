<script setup lang="ts">
import { User, Lock, Bell } from '@element-plus/icons-vue'

interface SettingGroup {
  title: string
  icon: any
  color: string
  bg: string
  items: { label: string; desc: string; value: string }[]
}

const groups: SettingGroup[] = [
  {
    title: '基础设置',
    icon: User,
    color: '#3b82f6',
    bg: '#eff6ff',
    items: [
      { label: '系统名称', desc: '后台管理系统展示的名称', value: 'Admin Pro' },
      { label: '系统版本', desc: '当前系统版本号', value: 'v1.0.0' },
      { label: '维护模式', desc: '开启后前台将无法访问', value: '关闭' },
    ],
  },
  {
    title: '安全设置',
    icon: Lock,
    color: '#f59e0b',
    bg: '#fffbeb',
    items: [
      { label: '登录密码', desc: '定期更换密码保证账户安全', value: '修改' },
      { label: '登录失败限制', desc: '连续失败 N 次将锁定账户', value: '5 次' },
      { label: '二次验证', desc: '启用后登录需要双重验证', value: '关闭' },
    ],
  },
  {
    title: '通知设置',
    icon: Bell,
    color: '#22c55e',
    bg: '#f0fdf4',
    items: [
      { label: '站内信通知', desc: '接收系统站内消息提醒', value: '开启' },
      { label: '邮件通知', desc: '接收重要操作邮件提醒', value: '开启' },
      { label: '短信通知', desc: '接收安全相关短信提醒', value: '关闭' },
    ],
  },
]
</script>

<template>
  <div class="settings-grid">
    <el-card v-for="group in groups" :key="group.title" shadow="never" class="panel">
      <template #header>
        <div class="panel__header">
          <div class="panel__title-wrap">
            <span class="panel__icon" :style="{ background: group.bg, color: group.color }">
              <el-icon :size="16"><component :is="group.icon" /></el-icon>
            </span>
            <span class="panel__title">{{ group.title }}</span>
          </div>
        </div>
      </template>
      <ul class="setting-list">
        <li v-for="item in group.items" :key="item.label" class="setting-item">
          <div class="setting-item__info">
            <div class="setting-item__label">{{ item.label }}</div>
            <div class="setting-item__desc">{{ item.desc }}</div>
          </div>
          <el-button link type="primary">{{ item.value }}</el-button>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.settings-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.panel {
  background: #fff;
  border-radius: 10px;
  border: none;

  :deep(.el-card__header) {
    padding: 16px 20px;
    border-bottom: 1px solid #f1f5f9;
  }

  .panel__header {
    display: flex;
    align-items: center;
  }

  .panel__title-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .panel__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
  }

  .panel__title {
    font-size: 15px;
    font-weight: 600;
    color: #0f172a;
  }
}

.setting-list {
  list-style: none;
  padding: 4px;
  margin: 0;

  .setting-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 12px;
    border-bottom: 1px solid #f1f5f9;

    &:last-child {
      border-bottom: none;
    }

    .setting-item__info {
      flex: 1;

      .setting-item__label {
        font-size: 14px;
        color: #334155;
        margin-bottom: 4px;
      }

      .setting-item__desc {
        font-size: 12px;
        color: #94a3b8;
      }
    }
  }
}
</style>
