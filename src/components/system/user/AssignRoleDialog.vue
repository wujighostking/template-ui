<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { computed, nextTick, ref, shallowRef, useTemplateRef } from 'vue'

import { getRolePage } from '@/api/role.ts'
import { assignUserRole, getUserRoles } from '@/api/user.ts'
import { CODE } from '@/common/code.ts'
import TableBuilder, { type ColumnConfig } from '@/components/TableBuilder.vue'
import type { Role } from '@/schema/role.ts'
import type { UserDTO } from '@/schema/user.ts'

const emit = defineEmits<{
  (e: 'handleSearch'): void
}>()

/** 全部可选角色（表格数据源） */
const roleList = shallowRef<Role[]>([])

/** 角色表格列配置 */
const columns: ColumnConfig[] = [
  { type: 'selection', width: 50 },
  { prop: 'roleName', label: '角色名称', minWidth: 120, showOverflowTooltip: true },
  { prop: 'roleCode', label: '角色编码', minWidth: 140, showOverflowTooltip: true },
  { prop: 'description', label: '角色描述', minWidth: 180, showOverflowTooltip: true },
]

/** 当前选中角色 id 列表 */
const selectedRoleIds = ref<string[]>([])

/** 当前操作的用户 */
const currentUser = ref<UserDTO>()

/** 弹窗与加载状态 */
const dialogVisible = ref(false)
const loading = ref(false)

const dialogTitle = computed(() => `分配角色 - ${currentUser.value?.username ?? ''}`)

/** 打开弹窗：并行加载全部角色与当前用户已分配的角色并回显勾选 */
async function open(user: UserDTO) {
  currentUser.value = user
  selectedRoleIds.value = []
  roleList.value = []
  dialogVisible.value = true
  loading.value = true
  try {
    await getRolePage({ pageNum: 1, pageSize: 1000 }).then((res) => {
      if (res.code === CODE.SUCCESS) {
        roleList.value = res.data.records
      }
    })
  } finally {
    loading.value = false
  }
}

function close() {
  dialogVisible.value = false
}

/** 勾选变化时同步选中角色 id */
function handleSelectionChange(rows: Role[]) {
  selectedRoleIds.value = rows.map((row) => String(row.id))
}

async function handleSubmit() {
  if (!currentUser.value) return
  loading.value = true
  try {
    const { code, message } = await assignUserRole(currentUser.value.id, selectedRoleIds.value)
    if (code === CODE.SUCCESS) {
      emit('handleSearch')
      ElMessage.success(message ?? '分配成功')
      close()
    }
  } finally {
    loading.value = false
  }
}

defineExpose({ open, close })
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="640px"
    destroy-on-close
    draggable
    append-to-body
  >
    <TableBuilder
      :columns="columns"
      :data="roleList"
      :has-pagination="false"
      :loading="loading"
      row-key="id"
      height="320"
      border
      @selection-change="handleSelectionChange"
    />
    <p class="assign-role-hint">
      已选 <span class="assign-role-count">{{ selectedRoleIds.length }}</span>
      个角色，一个用户可分配多个角色，提交后将覆盖用户原有角色。
    </p>

    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">确 定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.assign-role-hint {
  margin: 8px 0 0;
  font-size: 12px;
  color: #64748b;

  .assign-role-count {
    color: #409eff;
    font-weight: 600;
  }
}
</style>
