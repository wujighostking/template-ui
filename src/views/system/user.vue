<script setup lang="ts">
import { Delete, Edit, Plus, Refresh, Search } from '@element-plus/icons-vue'
import { ElButton, ElDatePicker, ElInput, ElMessageBox, ElMessage, ElSelect } from 'element-plus'
import { h, onBeforeMount, reactive, ref, shallowRef, useTemplateRef } from 'vue'

import { deleteUserById, getUserPage } from '@/api/user.ts'
import { CODE } from '@/common/code.ts'
import type { FormItemConfig } from '@/components/FormBuilder.vue'
import FormBuilder from '@/components/FormBuilder.vue'
import CreateDialog from '@/components/system/user/CreateDialog.vue'
import TableBuilder, { type ColumnConfig, type PageQuery } from '@/components/TableBuilder.vue'
import type { UserDTO } from '@/schema/user.ts'

const searchForm = reactive<{
  username?: string
  nickname?: string
  phoneNumber?: string
  createTime?: string[]
}>({
  username: undefined,
  nickname: undefined,
  phoneNumber: undefined,
  createTime: [],
})

const formItems: FormItemConfig[] = [
  {
    model: 'username',
    label: '用户名',
    type: ElInput,
    props: { placeholder: '请输入用户名', clearable: true },
    col: { span: 6 },
  },
  {
    model: 'nickname',
    label: '昵称',
    type: ElInput,
    props: { placeholder: '请输入昵称', clearable: true },
    col: { span: 6 },
  },
  {
    model: 'phoneNumber',
    label: '手机号',
    type: ElInput,
    props: { placeholder: '请输入手机号', clearable: true },
    col: { span: 6 },
  },
  {
    model: 'createTime',
    label: '创建时间',
    type: ElDatePicker,
    props: { placeholder: '请输入创建时间', clearable: true, type: 'datetimerange' },
    col: { span: 6 },
  },
]

const columns: ColumnConfig[] = [
  { prop: 'username', label: '用户名', align: 'center' },
  { prop: 'nickname', label: '昵称', align: 'center' },
  { prop: 'phoneNumber', label: '手机号', align: 'center' },
  { prop: 'createTime', label: '创建时间', align: 'center' },
  {
    prop: 'operation',
    label: '操作',
    align: 'center',
    width: 280,
    slots: {
      default: (scope) => {
        const row = scope.row as UserDTO
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

const tableData = shallowRef<UserDTO[]>([])

/** 分页总条数，查询后同步给 TableBuilder 展示 */
const total = ref(0)

/** 分页查询参数 */
const pageQuery = reactive({
  current: 1,
  size: 10,
})

function handleSearch() {
  const params = {
    pageNum: pageQuery.current,
    pageSize: pageQuery.size,
    username: searchForm.username?.trim() || undefined,
    nickname: searchForm.nickname?.trim() || undefined,
    phoneNumber: searchForm.phoneNumber?.trim() || undefined,
    createTime: searchForm.createTime?.length ? searchForm.createTime : undefined,
  }

  getUserPage(params).then((res) => {
    const data = res.data as { records?: UserDTO[]; total?: number }
    tableData.value = data?.records ?? []
    total.value = data?.total ?? 0
  })
}

function handleReset() {
  Object.assign(searchForm, {
    username: undefined,
    nickname: undefined,
    dept: undefined,
    phoneNumber: undefined,
    createTime: [],
  })
  pageQuery.current = 1
  handleSearch()
}

/** 新增/编辑用户弹窗引用 */
const userDialogRef = useTemplateRef<InstanceType<typeof CreateDialog>>('userDialogRef')

function handleAdd() {
  userDialogRef.value?.open('add')
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

/** 行内操作：编辑 */
function handleEditRow(row: UserDTO) {
  userDialogRef.value?.open('edit', {
    id: row.id,
    username: row.username,
    nickname: row.nickname,
    phoneNumber: row.phoneNumber,
    email: row.email,
    dept: row.dept,
    gender: row.gender,
    status: row.status,
  })
}

/** 行内操作：删除（二次确认） */
async function handleDeleteRow(row: UserDTO) {
  try {
    await ElMessageBox.confirm(
      `确定要删除用户「${row.username}」吗？删除后不可恢复。`,
      '删除确认',
      {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      },
    )

    const { code, message } = await deleteUserById(row.id)
    if (code === CODE.SUCCESS) {
      ElMessage.success(message ?? '删除成功')
      handleSearch()
    }
  } catch {
    // 用户取消删除或请求异常，静默处理（错误提示由响应拦截器统一兜底）
  }
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

onBeforeMount(() => {
  handleSearch()
})
</script>

<template>
  <div class="user-page">
    <div class="user-page__header">
      <h2 class="user-page__title">用户管理</h2>
      <p class="user-page__subtitle">管理系统用户账号</p>
    </div>

    <el-card shadow="never" class="user-page__search">
      <FormBuilder
        :form="searchForm"
        :form-items="formItems"
        :row-props="{ gutter: 16 }"
        label-position="right"
        label-width="auto"
      />
    </el-card>

    <el-card shadow="never" class="user-page__table">
      <div class="user-page__toolbar">
        <el-button type="primary" plain :icon="Search" @click="handleSearch">查询</el-button>
        <el-button type="default" plain :icon="Refresh" @click="handleReset">重置</el-button>
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
        <el-button @click="handleImport">导入</el-button>
        <el-button @click="handleExport">导出</el-button>
        <el-button :icon="Refresh" @click="handleRefresh">刷新</el-button>
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

    <CreateDialog ref="userDialogRef" @handle-search="handleSearch" />
  </div>
</template>

<style scoped lang="scss">
.user-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  .user-page__header {
    padding: 4px 4px 0;

    .user-page__title {
      margin: 0 0 8px;
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
    }

    .user-page__subtitle {
      margin: 0;
      font-size: 13px;
      color: #64748b;
    }
  }

  .user-page__search {
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

  .user-page__table {
    border-radius: 8px;
  }

  .user-page__toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }
}
</style>
