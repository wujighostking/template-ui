<script lang="ts" setup>
import { Delete, Edit, Plus, Refresh, Search, Sort } from '@element-plus/icons-vue'
import { Icon } from '@iconify/vue'
import { ElButton, ElDatePicker, ElInput, ElMessage } from 'element-plus'
import { h, onBeforeMount, reactive, shallowRef, useTemplateRef } from 'vue'

import { deleteMenu, getMenu } from '@/api/menu.ts'
import { CODE } from '@/common/code.ts'
import type { FormItemConfig } from '@/components/FormBuilder.vue'
import FormBuilder from '@/components/FormBuilder.vue'
import CreateMenuDialog from '@/components/system/menu/CreateMenuDialog.vue'
import TableBuilder, { type ColumnConfig } from '@/components/TableBuilder.vue'
import type { MenuNode } from '@/schema/menu.ts'
import { buildTree } from '@/utils'
import { resolveMenuIcon } from '@/utils/icon'

const searchForm = reactive<Record<string, unknown>>({
  menuName: '',
  status: '',
  createTime: '',
})

const formItems: FormItemConfig[] = [
  {
    model: 'menuName',
    label: '菜单名称',
    type: ElInput,
    props: { placeholder: '请输入菜单名称', clearable: true },
    col: { span: 6 },
  },
  {
    model: 'status',
    label: '菜单状态',
    type: ElInput,
    props: { placeholder: '请输入菜单状态', clearable: true },
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
  { prop: 'menuName', label: '菜单名称', align: 'center' },
  {
    prop: 'icon',
    label: '图标',
    align: 'center',
    slots: {
      default: (scope) => {
        const icon = (scope.row as MenuNode).icon
        return icon
          ? h('span', { class: 'cell-icon' }, [
              h(Icon, { icon: resolveMenuIcon(icon), width: 16, height: 16 }),
              h('span', icon),
            ])
          : h('span', '—')
      },
    },
  },
  { prop: 'sort', label: '排序', align: 'center' },
  // { prop: 'permission', label: '权限标识', align: 'center' },
  { prop: 'component', label: '文件路径', align: 'center' },
  { prop: 'path', label: '组件路由', align: 'center' },
  { prop: 'name', label: '组件名称', align: 'center' },
  { prop: '_status', label: '状态', align: 'center' },
  { prop: 'createTime', label: '创建时间', align: 'center' },
  {
    prop: 'operation',
    label: '操作',
    align: 'center',
    width: 280,
    slots: {
      default: (scope) => {
        const row = scope.row as MenuNode
        return h('div', { class: 'row-operation' }, [
          h(
            ElButton,
            {
              type: 'primary',
              link: true,
              size: 'small',
              icon: Edit,
              onClick: () => handleAdd(row),
            },
            () => '新增',
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

const tableData = shallowRef<MenuNode[]>([])

/** 新增菜单弹窗引用 */
const menuDialogRef = useTemplateRef<InstanceType<typeof CreateMenuDialog>>('menuDialogRef')

function handleSearch() {
  // 查询逻辑
  getMenu().then((res) => {
    //   /**
    //    * 后端返回的是扁平数据，每个节点带有 parentId 字段：
    //    * - parentId 为 null 时为顶级菜单
    //    * - parentId 不为 null 时为对应 id 节点的子菜单
    //    * 通过 buildTree 转换为 el-table 所需的 children 树形结构
    //    */
    const data = (res.data ?? []).map((item: any) => ({
      ...item,
      _status: item.status === 0 ? '启用' : '禁用',
    }))

    tableData.value = buildTree<MenuNode>(data)
  })
}

function handleReset() {
  //  重置逻辑
}

function handleAdd(row?: MenuNode) {
  menuDialogRef.value?.open('add', row)
}

function handleAdjustSort() {
  // 调整排序逻辑
}

/** 行内操作：编辑 */
function handleEditRow(row: MenuNode) {
  menuDialogRef.value?.open('edit', row)
}

/** 行内操作：删除 */
function handleDeleteRow(row: Record<string, unknown>) {
  deleteMenu([row.id as number]).then((res) => {
    if (res.code === CODE.SUCCESS) {
      ElMessage.success(res.message || '删除成功')
      handleSearch()
    }
  })
}

onBeforeMount(() => {
  handleSearch()
})
</script>

<template>
  <div class="menu-page">
    <div class="menu-page__header">
      <h2 class="menu-page__title">菜单管理</h2>
      <p class="menu-page__subtitle">管理菜单权限</p>
    </div>

    <el-card class="menu-page__search" shadow="never">
      <FormBuilder
        :form="searchForm"
        :form-items="formItems"
        :row-props="{ gutter: 16 }"
        label-position="right"
        label-width="auto"
      />
    </el-card>

    <el-card class="menu-page__table" shadow="never">
      <div class="menu-page__toolbar">
        <el-button :icon="Search" plain type="primary" @click="handleSearch">查询</el-button>
        <el-button :icon="Refresh" plain type="default" @click="handleReset">重置</el-button>
        <el-button :icon="Plus" type="primary" @click="handleAdd()">新增</el-button>
        <el-button :icon="Sort" plain @click="handleAdjustSort">调整排序</el-button>
      </div>

      <TableBuilder
        :columns="columns"
        :data="tableData"
        :default-expand-all="true"
        :tree-props="{ children: 'children' }"
        row-key="id"
      />
    </el-card>
  </div>

  <CreateMenuDialog ref="menuDialogRef" @handle-search="handleSearch" />
</template>

<style lang="scss" scoped>
.menu-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  .menu-page__header {
    padding: 4px 4px 0;

    .menu-page__title {
      margin: 0 0 8px;
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
    }

    .menu-page__subtitle {
      margin: 0;
      font-size: 13px;
      color: #64748b;
    }
  }

  .menu-page__search {
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

  .menu-page__table {
    border-radius: 8px;
  }

  .menu-page__toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }
}
</style>

<style lang="scss">
/* 图标列：手动 h() 渲染的节点无法命中 scoped，需全局样式 */
.menu-page .cell-icon {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #475569;

  .iconify {
    color: #64748b;
  }
}
</style>
