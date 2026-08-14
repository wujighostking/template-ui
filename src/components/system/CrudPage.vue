<script setup lang="ts">
import type { Component } from 'vue'

import FormBuilder, { type FormItemConfig } from '@/components/FormBuilder.vue'
import TableBuilder, { type ColumnConfig } from '@/components/TableBuilder.vue'

/** 工具栏按钮配置 */
export interface ToolbarButtonConfig {
  key?: string
  text: string
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
  plain?: boolean
  icon?: Component
  disabled?: boolean
  /** 是否显示该按钮，默认显示 */
  show?: boolean
  onClick?: () => void
}

/** CRUD 页配置驱动的数据结构 */
export interface CrudPageConfig {
  /** 页面标题 */
  title: string
  /** 页面副标题 */
  subtitle?: string
  /** 搜索表单配置 */
  formItems?: FormItemConfig[]
  /** 搜索表单数据（建议传入 reactive 对象以便回读查询条件） */
  formModel?: Record<string, unknown>
  /** 表格列配置 */
  columns?: ColumnConfig[]
  /** 表格数据 */
  data?: Record<string, unknown>[]
  /** 工具栏按钮配置 */
  toolbar?: ToolbarButtonConfig[]
  /** 是否显示分页，默认显示 */
  hasPagination?: boolean
}

defineProps<{
  config: CrudPageConfig
}>()
</script>

<template>
  <div class="crud-page">
    <div class="crud-page__header">
      <h2 class="crud-page__title">{{ config.title }}</h2>
      <p v-if="config.subtitle" class="crud-page__subtitle">{{ config.subtitle }}</p>
    </div>

    <el-card v-if="config.formItems?.length" shadow="never" class="crud-page__search">
      <FormBuilder
        :form="config.formModel"
        :form-items="config.formItems"
        :rowProps="{ gutter: 16 }"
        label-position="right"
        label-width="auto"
      />
    </el-card>

    <el-card shadow="never" class="crud-page__table">
      <div v-if="config.toolbar?.length" class="crud-page__toolbar">
        <el-button
          v-for="btn in config.toolbar"
          v-show="btn.show !== false"
          :key="btn.key ?? btn.text"
          :type="btn.type"
          :plain="btn.plain"
          :icon="btn.icon"
          :disabled="btn.disabled"
          @click="btn.onClick"
        >
          {{ btn.text }}
        </el-button>
      </div>

      <TableBuilder
        :columns="config.columns"
        :data="config.data"
        :has-pagination="config.hasPagination"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.crud-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  .crud-page__header {
    padding: 4px 4px 0;

    .crud-page__title {
      margin: 0 0 8px;
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
    }

    .crud-page__subtitle {
      margin: 0;
      font-size: 13px;
      color: #64748b;
    }
  }

  .crud-page__search {
    border-radius: 8px;

    :deep(.el-card__body) {
      display: flex;
      align-items: center;
      min-height: 64px;
    }

    :deep(.el-form) {
      width: 100%;
    }

    :deep(.el-form-item) {
      margin-bottom: 0;
    }
  }

  .crud-page__table {
    border-radius: 8px;
  }

  .crud-page__toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }
}
</style>
