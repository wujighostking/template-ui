<script setup lang="ts">
import {
  User,
  Setting,
  Key,
  Menu as MenuIcon,
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
} from '@element-plus/icons-vue'
import { type Component, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface MenuItem {
  index: string
  title: string
  icon: string
  children?: MenuItem[]
}

const router = useRouter()
const route = useRoute()

const activeMenu = computed(() => route.path)

const menus: MenuItem[] = [
  {
    index: '/workspace',
    title: '工作台',
    icon: 'Odometer',
  },
  {
    index: '/system',
    title: '系统管理',
    icon: 'Setting',
    children: [
      { index: '/system/user', title: '用户管理', icon: 'User' },
      { index: '/system/role', title: '角色管理', icon: 'Key' },
      { index: '/system/menu', title: '菜单管理', icon: 'MenuIcon' },
      { index: '/system/dept', title: '部门管理', icon: 'OfficeBuilding' },
      { index: '/system/post', title: '岗位管理', icon: 'Postcard' },
      { index: '/system/dict', title: '字典管理', icon: 'Notebook' },
    ],
  },
  {
    index: '/monitor',
    title: '系统监控',
    icon: 'Monitor',
    children: [
      { index: '/monitor/online', title: '在线用户', icon: 'BellFilled' },
      { index: '/monitor/job', title: '定时任务', icon: 'Timer' },
      { index: '/monitor/data', title: '数据监控', icon: 'DataLine' },
    ],
  },
  {
    index: '/tool',
    title: '系统工具',
    icon: 'Tools',
    children: [
      { index: '/tool/build', title: '表单构建', icon: 'DocumentCopy' },
      { index: '/tool/gen', title: '代码生成', icon: 'EditPen' },
      { index: '/tool/swagger', title: '系统接口', icon: 'Connection' },
    ],
  },
]

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
      <template v-for="item in menus" :key="item.index">
        <el-sub-menu v-if="item.children?.length" :index="item.index">
          <template #title>
            <el-icon>
              <component :is="icons[item.icon]" />
            </el-icon>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item v-for="child in item.children" :key="child.index" :index="child.index">
            <el-icon>
              <component :is="icons[child.icon]" />
            </el-icon>
            <span>{{ child.title }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.index">
          <el-icon>
            <component :is="icons[item.icon]" />
          </el-icon>
          <span>{{ item.title }}</span>
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
