<script setup lang="ts">
import { Delete, Edit, Plus, Refresh, Search, Sort } from '@element-plus/icons-vue'
import { ElButton, ElDatePicker, ElInput, ElSelect } from 'element-plus'
import { h, reactive } from 'vue'

import type { FormItemConfig } from '@/components/FormBuilder.vue'
import FormBuilder from '@/components/FormBuilder.vue'
import TableBuilder, { type ColumnConfig } from '@/components/TableBuilder.vue'

const searchForm = reactive<Record<string, unknown>>({
  deptName: '',
  leader: '',
  status: '',
  createTime: '',
})

const formItems: FormItemConfig[] = [
  {
    model: 'deptName',
    label: '部门名称',
    type: ElInput,
    props: { placeholder: '请输入部门名称', clearable: true },
    col: { span: 6 },
  },
  {
    model: 'leader',
    label: '负责人',
    type: ElInput,
    props: { placeholder: '请输入负责人', clearable: true },
    col: { span: 6 },
  },
  {
    model: 'status',
    label: '状态',
    type: ElSelect,
    props: { placeholder: '请选择状态', clearable: true },
    col: { span: 6 },
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
  { prop: 'deptName', label: '部门名称', align: 'center' },
  { prop: 'leader', label: '负责人', align: 'center' },
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
    deptName: '科技公司',
    leader: '张总',
    sort: 1,
    status: '正常',
    createTime: '2024-01-01 09:00',
  },
  {
    deptName: '研发部',
    leader: '李工',
    sort: 1,
    status: '正常',
    createTime: '2024-01-15 14:30',
  },
  {
    deptName: '产品部',
    leader: '王经理',
    sort: 2,
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
  // 新增部门逻辑
}

function handleEdit() {
  // 编辑部门逻辑
}

function handleDelete() {
  // 删除部门逻辑
}

function handleAdjustSort() {
  // 调整排序逻辑
}

function handleImport() {
  // 导入逻辑
}

/** 行内操作：查看 */
function handleView(row: Record<string, unknown>) {
  // 查看指定行部门
  console.log('查看', row)
}

/** 行内操作：编辑 */
function handleEditRow(row: Record<string, unknown>) {
  // 编辑指定行部门
  console.log('编辑', row)
}

/** 行内操作：删除 */
function handleDeleteRow(row: Record<string, unknown>) {
  // 删除指定行部门
  console.log('删除', row)
}
</script>

<template>
  <div class="dept-page">
    <div class="dept-page__header">
      <h2 class="dept-page__title">部门管理</h2>
      <p class="dept-page__subtitle">管理组织架构</p>
    </div>

    <el-card shadow="never" class="dept-page__search">
      <FormBuilder
        :form="searchForm"
        :form-items="formItems"
        :row-props="{ gutter: 16 }"
        label-position="right"
        label-width="auto"
      />
    </el-card>

    <el-card shadow="never" class="dept-page__table">
      <div class="dept-page__toolbar">
        <el-button type="primary" plain :icon="Search" @click="handleSearch">查询</el-button>
        <el-button type="default" plain :icon="Refresh" @click="handleReset">重置</el-button>
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
        <el-button type="primary" plain :icon="Edit" @click="handleEdit">编辑</el-button>
        <el-button type="danger" plain :icon="Delete" @click="handleDelete">删除</el-button>
        <el-button plain :icon="Sort" @click="handleAdjustSort">调整排序</el-button>
        <el-button @click="handleImport">导入</el-button>
      </div>

      <TableBuilder :columns="columns" :data="tableData" row-key="id" />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.dept-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  .dept-page__header {
    padding: 4px 4px 0;

    .dept-page__title {
      margin: 0 0 8px;
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
    }

    .dept-page__subtitle {
      margin: 0;
      font-size: 13px;
      color: #64748b;
    }
  }

  .dept-page__search {
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

  .dept-page__table {
    border-radius: 8px;
  }

  .dept-page__toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }
}
</style>
