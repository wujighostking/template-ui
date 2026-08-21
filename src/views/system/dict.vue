<script setup lang="ts">
import { Delete, Edit, Plus, Refresh, Search } from '@element-plus/icons-vue'
import { ElButton, ElInput, ElOption, ElSelect } from 'element-plus'
import { h, reactive } from 'vue'

import type { FormItemConfig } from '@/components/FormBuilder.vue'
import FormBuilder from '@/components/FormBuilder.vue'
import Switch from '@/components/Switch.vue'
import TableBuilder, { type ColumnConfig } from '@/components/TableBuilder.vue'

const searchForm = reactive<Record<string, unknown>>({
  dictName: '',
  dictType: '',
  status: '',
})

const formItems: FormItemConfig[] = [
  {
    model: 'dictName',
    label: '字典名称',
    type: ElInput,
    props: { placeholder: '请输入字典名称', clearable: true },
    col: { span: 6 },
  },
  {
    model: 'dictType',
    label: '字典类型',
    type: ElInput,
    props: { placeholder: '请输入字典类型', clearable: true },
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
]

const columns: ColumnConfig[] = [
  { prop: 'dictName', label: '字典名称', align: 'center' },
  { prop: 'dictType', label: '字典类型', align: 'center' },
  { prop: 'dictLabel', label: '字典标签', align: 'center' },
  { prop: 'dictValue', label: '字典键值', align: 'center' },
  {
    prop: 'status',
    label: '状态',
    align: 'center',
    slots: {
      default: () =>
        h(Switch, {
          activeText: '正常',
          inactiveText: '禁用',
          activeValue: 0,
          inactiveValue: 1,
        }),
    },
  },
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
    id: crypto.randomUUID(),
    dictName: '性别',
    dictType: 'gender',
    dictLabel: '性别',
    dictValue: '-1',
    status: '正常',
    children: [
      {
        id: crypto.randomUUID(),
        dictType: 'man',
        dictLabel: '男',
        dictValue: '0',
        listClass: 'primary',
        status: '正常',
      },
      {
        id: crypto.randomUUID(),
        dictType: 'woman',
        dictLabel: '女',
        dictValue: '1',
        listClass: 'success',
        status: '正常',
      },
    ],
  },
]

function handleSearch() {
  // 查询逻辑
}

function handleReset() {
  // 重置逻辑
}

function handleAdd() {
  // 新增字典逻辑
}

function handleEdit() {
  // 编辑字典逻辑
}

function handleDelete() {
  // 删除字典逻辑
}

function handleRefresh() {
  // 刷新逻辑
}

/** 行内操作：查看 */
function handleView(row: Record<string, unknown>) {
  // 查看指定行字典
  console.log('查看', row)
}

/** 行内操作：编辑 */
function handleEditRow(row: Record<string, unknown>) {
  // 编辑指定行字典
  console.log('编辑', row)
}

/** 行内操作：删除 */
function handleDeleteRow(row: Record<string, unknown>) {
  // 删除指定行字典
  console.log('删除', row)
}
</script>

<template>
  <div class="dict-page">
    <div class="dict-page__header">
      <h2 class="dict-page__title">字典管理</h2>
      <p class="dict-page__subtitle">维护系统字典数据</p>
    </div>

    <el-card shadow="never" class="dict-page__search">
      <FormBuilder
        :form="searchForm"
        :form-items="formItems"
        :row-props="{ gutter: 16 }"
        label-position="right"
        label-width="auto"
      />
    </el-card>

    <el-card shadow="never" class="dict-page__table">
      <div class="dict-page__toolbar">
        <el-button type="primary" plain :icon="Search" @click="handleSearch">查询</el-button>
        <el-button type="default" plain :icon="Refresh" @click="handleReset">重置</el-button>
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
        <el-button type="primary" plain :icon="Edit" @click="handleEdit">编辑</el-button>
        <el-button type="danger" plain :icon="Delete" @click="handleDelete">删除</el-button>
        <el-button :icon="Refresh" @click="handleRefresh">刷新</el-button>
      </div>

      <TableBuilder :columns="columns" :data="tableData" row-key="id" />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.dict-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  .dict-page__header {
    padding: 4px 4px 0;

    .dict-page__title {
      margin: 0 0 8px;
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
    }

    .dict-page__subtitle {
      margin: 0;
      font-size: 13px;
      color: #64748b;
    }
  }

  .dict-page__search {
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

  .dict-page__table {
    border-radius: 8px;
  }

  .dict-page__toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }
}
</style>
