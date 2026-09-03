<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import useMenuStore from '@/store/menu.ts'
import { resolveMenuIcon } from '@/utils/icon'

const router = useRouter()
const route = useRoute()

const activeMenu = computed(() => route.path)

const menuStore = useMenuStore()

const { menus } = storeToRefs(menuStore)

//   shallowRef<MenuItem[]>([
//   // {
//   //   path: '/system',
//   //   menuName: '系统管理',
//   //   icon: 'Setting',
//   //   children: [
//   //     { path: '/system/user', menuName: '用户管理', icon: 'User' },
//   //     { path: '/system/role', menuName: '角色管理', icon: 'Key' },
//   //     { path: '/system/menu', menuName: '菜单管理', icon: 'MenuIcon' },
//   //     { path: '/system/dict', menuName: '字典管理', icon: 'Notebook' },
//   //   ],
//   // },
//
// ])

function handleMenuSelect(index: string) {
  router.push(index)
}

onBeforeMount(() => {
  menuStore.getNewMenus()

  // getMenu().then((res) => {
  //   if (res.code === CODE.SUCCESS) {
  //     menus.value = buildMenuTree(res.data ?? [])
  //   }
  // })
})
</script>

<template>
  <aside class="admin-aside">
    <el-menu
      :default-active="activeMenu"
      active-text-color="#3b82f6"
      background-color="transparent"
      class="admin-menu"
      text-color="#475569"
      @select="handleMenuSelect"
    >
      <template v-for="item in menus" :key="item.id">
        <el-sub-menu v-if="item.children?.length" :index="item.id">
          <template #title>
            <el-icon v-if="item.icon"><Icon :icon="resolveMenuIcon(item.icon)" /></el-icon>
            <span>{{ item.menuName }}</span>
          </template>
          <el-menu-item v-for="child in item.children" :key="child.id" :index="child.path">
            <el-icon v-if="child.icon"><Icon :icon="resolveMenuIcon(child.icon)" /></el-icon>
            <span>{{ child.menuName }}</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item v-else :key="item.id" :index="item.path">
          <el-icon v-if="item.icon"><Icon :icon="resolveMenuIcon(item.icon)" /></el-icon>
          <span>{{ item.menuName }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </aside>
</template>

<style lang="scss" scoped>
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
