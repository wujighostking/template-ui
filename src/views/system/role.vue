<script setup lang="ts">
import { Delete, Edit, Menu, Plus, Refresh, Search } from '@element-plus/icons-vue'
import {
  ElButton,
  ElDatePicker,
  ElInput,
  ElMessage,
  ElMessageBox,
  ElOption,
  ElSelect,
} from 'element-plus'
import { h, onBeforeMount, reactive, ref, shallowRef, useTemplateRef } from 'vue'

import { deleteRoleById, getRolePage } from '@/api/role.ts'
import { CODE } from '@/common/code.ts'
import type { FormItemConfig } from '@/components/FormBuilder.vue'
import FormBuilder from '@/components/FormBuilder.vue'
import AssignMenuDialog from '@/components/system/role/AssignMenuDialog.vue'
import CreateRoleDialog from '@/components/system/role/CreateRoleDialog.vue'
import TableBuilder, { type ColumnConfig, type PageQuery } from '@/components/TableBuilder.vue'
import type { Role } from '@/schema/role.ts'

const searchForm = reactive<{
  roleName?: string
  roleCode?: string
  status?: string
  createTime: string[]
}>({
  roleName: undefined,
  roleCode: undefined,
  status: undefined,
  createTime: [],
})

const formItems: FormItemConfig[] = [
  {
    model: 'roleName',
    label: '角色名称',
    type: ElInput,
    props: { placeholder: '请输入角色名称', clearable: true },
    col: { span: 6 },
  },
  {
    model: 'roleCode',
    label: '角色代码',
    type: ElInput,
    props: { placeholder: '请输入角色代码', clearable: true },
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
    props: {
      placeholder: '请输入创建时间',
      clearable: true,
      type: 'datetimerange',
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    col: { span: 6 },
  },
]

const columns: ColumnConfig[] = [
  { prop: 'roleName', label: '角色名称', align: 'center' },
  { prop: 'roleCode', label: '角色代码', align: 'center' },
  { prop: 'sort', label: '排序', align: 'center' },
  { prop: 'status', label: '状态', align: 'center' },
  { prop: 'description', label: '角色描述', align: 'center' },
  { prop: 'createTime', label: '创建时间', align: 'center' },
  {
    prop: 'operation',
    label: '操作',
    align: 'center',
    width: 340,
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
              icon: Edit,
              onClick: () => handleEditRow(row),
            },
            () => '编辑',
          ),
          h(
            ElButton,
            {
              type: 'primary',
              link: true,
              size: 'small',
              icon: Menu,
              onClick: () => handleAssignMenu(row),
            },
            () => '分配菜单',
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

const tableData = shallowRef<Role[]>([])

/** 分页总条数，查询后同步给 TableBuilder 展示 */
const total = ref(0)

/** 分页查询参数 */
const pageQuery = reactive({
  current: 1,
  size: 10,
})

function handleSearch() {
  const params: Record<string, unknown> = {
    page: pageQuery.current,
    size: pageQuery.size,

    roleName: searchForm.roleName?.trim(),
    roleCode: searchForm.roleCode?.trim(),
    status: searchForm.status,
    createTime: searchForm.createTime,
  }

  getRolePage(params).then((res) => {
    const data = res.data as { records?: Role[]; total?: number }
    const records = data?.records ?? []
    // 按 power 升序排序，power 值越小越靠前

    tableData.value = records
      .sort((a, b) => (a.power ?? 0) - (b.power ?? 0))
      .map((item) => ({
        ...item,
        sort: item.power,
        status: item.deleted === 0 ? '正常' : '删除',
      }))
    total.value = data?.total ?? 0
  })
}

function handleReset() {
  Object.assign(searchForm, {
    roleName: undefined,
    roleCode: undefined,
    status: undefined,
    createTime: [],
  })
  pageQuery.current = 1
  handleSearch()
}

/** 分页：切换每页条数时回到第一页重新查询 */
function handleSizeChange(query: PageQuery) {
  pageQuery.size = query.size
  pageQuery.current = 1
  handleSearch()
}

/** 分页：切换页码时重新查询 */
function handleCurrentChange(query: PageQuery) {
  pageQuery.current = query.current
  handleSearch()
}

/** 新增角色弹窗引用 */
const roleDialogRef = useTemplateRef<InstanceType<typeof CreateRoleDialog>>('roleDialogRef')

function handleAdd() {
  roleDialogRef.value?.open('add')
}

function handleAssignUser() {
  // 分配用户逻辑
}

function handleRefresh() {
  // 刷新逻辑
}

/** 分配菜单弹窗引用 */
const assignMenuDialogRef =
  useTemplateRef<InstanceType<typeof AssignMenuDialog>>('assignMenuDialogRef')

/** 行内操作：分配菜单 */
function handleAssignMenu(row: Record<string, unknown>) {
  assignMenuDialogRef.value?.open({
    id: row.id as string,
    roleName: row.roleName as string,
  })
}

/** 行内操作：编辑 */
function handleEditRow(row: Record<string, unknown>) {
  // 打开编辑弹窗并回显当前行数据
  roleDialogRef.value?.open('edit', {
    id: row.id as string,
    roleName: row.roleName as string,
    roleCode: row.roleCode as string,
    description: row.description as string,
    power: row.power as number,
  })
}

/** 行内操作：删除（带二次确认） */
function handleDeleteRow(row: Record<string, unknown>) {
  const id = row.id as string
  const roleName = (row.roleName as string) ?? ''

  ElMessageBox.confirm(`确定要删除角色「${roleName}」吗？删除后将无法恢复。`, '删除确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      deleteRoleById(id).then((res) => {
        if (res.code === CODE.SUCCESS) {
          ElMessage.success(res.message || '删除成功')
          handleSearch()
        }
      })
    })
    .catch(() => {
      // 用户取消删除，无需处理
    })
}

onBeforeMount(() => {
  handleSearch()
})
</script>

<template>
  <div class="role-page">
    <div class="role-page__header">
      <h2 class="role-page__title">角色管理</h2>
      <p class="role-page__subtitle">管理系统角色与权限</p>
    </div>

    <el-card shadow="never" class="role-page__search">
      <FormBuilder
        :form="searchForm"
        :form-items="formItems"
        :row-props="{ gutter: 16 }"
        label-position="right"
        label-width="auto"
      />
    </el-card>

    <el-card shadow="never" class="role-page__table">
      <div class="role-page__toolbar">
        <el-button type="primary" plain :icon="Search" @click="handleSearch">查询</el-button>
        <el-button type="default" plain :icon="Refresh" @click="handleReset">重置</el-button>
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
        <el-button @click="handleAssignUser">分配用户</el-button>
        <el-button @click="handleRefresh">刷新</el-button>
      </div>

      <TableBuilder
        :columns="columns"
        :data="tableData"
        :total="total"
        row-key="id"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>

  <CreateRoleDialog ref="roleDialogRef" @handle-search="handleSearch" />
  <AssignMenuDialog ref="assignMenuDialogRef" />
</template>

<style scoped lang="scss">
.role-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  .role-page__header {
    padding: 4px 4px 0;

    .role-page__title {
      margin: 0 0 8px;
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
    }

    .role-page__subtitle {
      margin: 0;
      font-size: 13px;
      color: #64748b;
    }
  }

  .role-page__search {
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

  .role-page__table {
    border-radius: 8px;
  }

  .role-page__toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }
}
</style>
