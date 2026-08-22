<script setup lang="ts">
import {
  BellFilled,
  Connection,
  DataLine,
  DocumentCopy,
  EditPen,
  Key,
  Menu as MenuIcon,
  Monitor,
  Notebook,
  Odometer,
  OfficeBuilding,
  Postcard,
  Setting,
  Timer,
  Tools,
  User,
} from '@element-plus/icons-vue'
import { type Component, computed, onBeforeMount, shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getMenu } from '@/api/menu.ts'
import { CODE } from '@/common/code.ts'
import type { MenuItem } from '@/schema/adminAside.ts'
import { buildMenuTree } from '@/utils/menu.ts'

const router = useRouter()
const route = useRoute()

const activeMenu = computed(() => route.path)

const menus = shallowRef<MenuItem[]>([
  // {
  //   path: '/system',
  //   menuName: '系统管理',
  //   icon: 'Setting',
  //   children: [
  //     { path: '/system/user', menuName: '用户管理', icon: 'User' },
  //     { path: '/system/role', menuName: '角色管理', icon: 'Key' },
  //     { path: '/system/menu', menuName: '菜单管理', icon: 'MenuIcon' },
  //     { path: '/system/dict', menuName: '字典管理', icon: 'Notebook' },
  //   ],
  // },

])

const icons: Record<string, Component> = {
  Setting,
  User,
  Key,
  MenuIcon,
  OfficeBuilding,
  Postcard,
  Notebook,
  Monitor,
  Odometer,
  BellFilled,
  Timer,
  DataLine,
  Tools,
  DocumentCopy,
  EditPen,
  Connection,
}

function handleMenuSelect(index: string) {
  router.push(index)
}

onBeforeMount(() => {
  getMenu().then((res) => {
    if (res.code === CODE.SUCCESS) {
      menus.value = buildMenuTree(res.data ?? [])
    }
  })
})
</script>

<template>
  <aside class="admin-aside">
    <el-menu
      :default-active="activeMenu"
      class="admin-menu"
      background-color="transparent"
      text-color="#475569"
      active-text-color="#3b82f6"
      @select="handleMenuSelect"
    >
      <template v-for="item in menus" :key="item.id">
        <el-sub-menu v-if="item.children?.length" :index="item.id">
          <template #title>
            <el-icon v-if="item.icon">
              <component :is="icons[item.icon]" />
            </el-icon>
            <span>{{ item.menuName }}</span>
          </template>
          <el-menu-item v-for="child in item.children" :key="child.id" :index="child.path">
            <el-icon v-if="child.icon">
              <component :is="icons[child.icon]" />
            </el-icon>
            <span>{{ child.menuName }}</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item v-else :index="item.id">
          <el-icon v-if="item.icon">
            <component :is="icons[item.icon]" />
          </el-icon>
          <span>{{ item.menuName }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </aside>
</template>

<style scoped lang="scss">
.admin-aside {
  width: 220px;
  background: #fff;
  border-right: 1px solid #e2e8f0;
  padding: 16px 0;
  overflow-y: auto;

  .admin-menu {
    border-right: none !important;

    :deep(.el-menu-item) {
      height: 44px;
      line-height: 44px;
      margin: 4px 12px;
      border-radius: 8px;
    }

    :deep(.el-menu-item:hover) {
      background-color: #f1f5f9 !important;
      color: #3b82f6 !important;
    }

    :deep(.el-menu-item.is-active) {
      background-color: #eff6ff !important;
      color: #3b82f6 !important;
      font-weight: 600;
    }
  }
}
</style>
