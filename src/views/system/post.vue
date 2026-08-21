<script setup lang="ts">
import { Delete, Edit, Plus, Refresh, Search } from '@element-plus/icons-vue'
import { ElButton, ElDatePicker, ElInput, ElOption, ElSelect } from 'element-plus'
import { h, reactive } from 'vue'

import type { FormItemConfig } from '@/components/FormBuilder.vue'
import FormBuilder from '@/components/FormBuilder.vue'
import TableBuilder, { type ColumnConfig } from '@/components/TableBuilder.vue'

const searchForm = reactive<Record<string, unknown>>({
  postCode: '',
  postName: '',
  status: '',
  createTime: '',
})

const formItems: FormItemConfig[] = [
  {
    model: 'postCode',
    label: '岗位编码',
    type: ElInput,
    props: { placeholder: '请输入岗位编码', clearable: true },
    col: { span: 6 },
  },
  {
    model: 'postName',
    label: '岗位名称',
    type: ElInput,
    props: { placeholder: '请输入岗位名称', clearable: true },
    col: { span: 6 },
  },
  {
    model: 'status',
    label: '状态',
    type: ElSelect,
    props: { placeholder: '请选择状态', clearable: true },
    col: { span: 6 },
    slots: {
      default: () => [
        h(ElOption, { label: '正常', value: 0 }),
        h(ElOption, { label: '禁用', value: 1 }),
      ],
    },
  },
  {
    model: 'createTime',
    label: '创建时间',
    type: ElDatePicker,
    props: { placeholder: '请选择创建时间', clearable: true, type: 'datetimerange' },
    col: { span: 6 },
  },
]

const columns: ColumnConfig[] = [
  { prop: 'postCode', label: '岗位编码', align: 'center' },
  { prop: 'postName', label: '岗位名称', align: 'center' },
  { prop: 'sort', label: '排序', align: 'center' },
  { prop: 'status', label: '状态', align: 'center' },
  { prop: 'createTime', label: '创建时间', align: 'center' },
  {
    prop: 'operation',
    label: '操作',
    align: 'center',
    width: 280,
    slots: {
      default: (scope) => {
        const row = scope.row as Record<string, unknown>
        return h('div', { class: 'row-operation' }, [
          h(
            ElButton,
            {
              type: 'primary',
              link: true,
              size: 'small',
              icon: Search,
              onClick: () => handleView(row),
            },
            () => '查看',
          ),
          h(
            ElButton,
            {
              type: 'primary',
              link: true,
              size: 'small',
              icon: Edit,
              onClick: () => handleEditRow(row),
            },
            () => '编辑',
          ),
          h(
            ElButton,
            {
              type: 'danger',
              link: true,
              size: 'small',
              icon: Delete,
              onClick: () => handleDeleteRow(row),
            },
            () => '删除',
          ),
        ])
      },
    },
  },
]

const tableData: Record<string, unknown>[] = [
  {
    postCode: 'ceo',
    postName: '董事长',
    sort: 1,
    status: '正常',
    createTime: '2024-01-01 09:00',
  },
  {
    postCode: 'cto',
    postName: '研发总监',
    sort: 2,
    status: '正常',
    createTime: '2024-01-15 14:30',
  },
  {
    postCode: 'pm',
    postName: '产品经理',
    sort: 3,
    status: '正常',
    createTime: '2024-02-01 10:15',
  },
]

function handleSearch() {
  // 查询逻辑
}

function handleReset() {
  //  重置逻辑
}

function handleAdd() {
  // 新增岗位逻辑
}

function handleEdit() {
  // 编辑岗位逻辑
}

function handleDelete() {
  // 删除岗位逻辑
}

function handleImport() {
  // 导入逻辑
}

function handleExport() {
  // 导出逻辑
}

function handleRefresh() {
  // 刷新逻辑
}

/** 行内操作：查看 */
function handleView(row: Record<string, unknown>) {
  // 查看指定行岗位
  console.log('查看', row)
}

/** 行内操作：编辑 */
function handleEditRow(row: Record<string, unknown>) {
  // 编辑指定行岗位
  console.log('编辑', row)
}

/** 行内操作：删除 */
function handleDeleteRow(row: Record<string, unknown>) {
  // 删除指定行岗位
  console.log('删除', row)
}
</script>

<template>
  <div class="post-page">
    <div class="post-page__header">
      <h2 class="post-page__title">岗位管理</h2>
      <p class="post-page__subtitle">维护岗位信息</p>
    </div>

    <el-card shadow="never" class="post-page__search">
      <FormBuilder
        :form="searchForm"
        :form-items="formItems"
        :row-props="{ gutter: 16 }"
        label-position="right"
        label-width="auto"
      />
    </el-card>

    <el-card shadow="never" class="post-page__table">
      <div class="post-page__toolbar">
        <el-button type="primary" plain :icon="Search" @click="handleSearch">查询</el-button>
        <el-button type="default" plain :icon="Refresh" @click="handleReset">重置</el-button>
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
        <el-button type="primary" plain :icon="Edit" @click="handleEdit">编辑</el-button>
        <el-button type="danger" plain :icon="Delete" @click="handleDelete">删除</el-button>
        <el-button @click="handleImport">导入</el-button>
        <el-button @click="handleExport">导出</el-button>
        <el-button :icon="Refresh" @click="handleRefresh">刷新</el-button>
      </div>

      <TableBuilder :columns="columns" :data="tableData" row-key="id" />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.post-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  .post-page__header {
    padding: 4px 4px 0;

    .post-page__title {
      margin: 0 0 8px;
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
    }

    .post-page__subtitle {
      margin: 0;
      font-size: 13px;
      color: #64748b;
    }
  }

  .post-page__search {
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

  .post-page__table {
    border-radius: 8px;
  }

  .post-page__toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }
}
</style>
