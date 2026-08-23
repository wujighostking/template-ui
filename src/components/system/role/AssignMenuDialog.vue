<script setup lang="ts">
import { ElMessage, ElTree, vLoading } from 'element-plus'
import { nextTick, ref, shallowRef, useTemplateRef } from 'vue'

import { getMenu, getMenuIdsByRoleId } from '@/api/menu.ts'
import { bindMenuToRole } from '@/api/role.ts'
import { CODE } from '@/common/code.ts'
import type { MenuNode } from '@/schema/menu.ts'
import { buildTree } from '@/utils'

const dialogVisible = ref(false)
const loading = ref(false)
const saving = ref(false)

/** 当前操作的角色（用于标题展示与提交） */
const currentRole = ref<{ id: string; roleName: string }>({ id: '', roleName: '' })

/** 菜单树数据（首次打开时加载并缓存） */
const menuTree = shallowRef<MenuNode[]>([])

const treeRef = useTemplateRef<InstanceType<typeof ElTree>>('treeRef')

const treeProps = { label: 'menuName', children: 'children' }

/** 打开弹窗：加载菜单树与角色已分配的菜单，并回显勾选状态 */
async function open(role: { id: string; roleName: string }) {
  currentRole.value = role
  dialogVisible.value = true
  loading.value = true
  try {
    const res = await getMenu()
    menuTree.value = buildTree(res.data ?? [])
    await nextTick()

    const topMenuIds = new Set<string>(menuTree.value.map((menu) => menu.id))

    const { data } = await getMenuIdsByRoleId(role.id)
    const checkedKeys = (data ?? []).filter((id: string) => !topMenuIds.has(id))

    treeRef.value?.setCheckedKeys(checkedKeys, false)
  } finally {
    loading.value = false
  }
}

function close() {
  dialogVisible.value = false
  // 清空勾选，避免下次打开时残留上次的状态
  treeRef.value?.setCheckedKeys([], false)
}

/** 提交：收集勾选节点与半选节点 ID 一起保存 */
async function handleSubmit() {
  if (!treeRef.value) return

  saving.value = true
  try {
    const res = await bindMenuToRole({
      roleId: currentRole.value.id,
      menuIds: treeRef.value.getHalfCheckedKeys().concat(treeRef.value.getCheckedKeys()),
    })

    if (res.code === CODE.SUCCESS) {
      ElMessage.success(res.message || '分配成功')
      close()
    }
  } finally {
    saving.value = false
  }
}

defineExpose({ open, close })
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="`分配菜单 - ${currentRole.roleName}`"
    width="480px"
    destroy-on-close
    draggable
    append-to-body
  >
    <div v-loading="loading" class="assign-menu-dialog__tree">
      <el-tree
        ref="treeRef"
        :data="menuTree"
        :props="treeProps"
        node-key="id"
        show-checkbox
        default-expand-all
        :expand-on-click-node="false"
        empty-text="暂无菜单数据"
      />
    </div>

    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" :loading="saving" @click="handleSubmit">确 定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.assign-menu-dialog__tree {
  max-height: 420px;
  overflow: auto;
  padding: 8px;
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 4px;
}
</style>
