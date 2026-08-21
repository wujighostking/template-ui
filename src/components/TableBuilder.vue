<script setup lang="ts">
import type { VNode } from 'vue'
import { computed, reactive, watch } from 'vue'

export interface ColumnConfig {
  prop?: string
  label?: string
  width?: string | number
  slots?: Record<string, (scope: Record<string, unknown>) => VNode>
  [key: string]: unknown
}

export interface PageQuery {
  current: number
  pages: number
  size: number
  total: number
}

const props = withDefaults(
  defineProps<{
    /** 表头数据 */
    columns?: ColumnConfig[]
    /** 表格数据 */
    data?: Record<string, unknown>[]
    /** 是否显示分页 */
    hasPagination?: boolean
    /** 分页总条数（不传则由组件内部维护） */
    total?: number
    /** 树形表格配置（如 { children: 'children', hasChildren: 'hasChildren' }） */
    treeProps?: Record<string, string>
    /** 是否默认展开所有行（仅在配置了 treeProps 时生效） */
    defaultExpandAll?: boolean
  }>(),
  {
    columns: () => [],
    data: () => [],
    hasPagination: true,
    treeProps: () => ({}),
    defaultExpandAll: true,
  },
)

const emits = defineEmits<{
  sizeChange: [query: PageQuery]
  currentChange: [query: PageQuery]
}>()

const pageQuery = reactive<PageQuery>({
  current: 1,
  pages: 1,
  size: 10,
  total: 0,
})

/** 外部传入分页总条数时同步到内部，否则保持组件内部维护 */
watch(
  () => props.total,
  (total) => {
    if (total !== undefined) {
      pageQuery.total = total
    }
  },
  { immediate: true },
)

function getColumnProps(column: ColumnConfig) {
  const { slots: _, ...rest } = column
  return rest
}

function getNonDefaultSlots(slots?: ColumnConfig['slots']) {
  if (!slots) return {}
  const { default: _, ...rest } = slots
  return rest
}

/** 首次挂载时 el-pagination 会触发一次 change 事件，用标志位跳过，避免重复请求 */
let isFirstChange = true

function handleSizeChange(size: number) {
  pageQuery.size = size
  if (isFirstChange) {
    isFirstChange = false
    return
  }
  emits('sizeChange', pageQuery)
}

function handleCurrentChange(current: number) {
  pageQuery.current = current
  if (isFirstChange) {
    isFirstChange = false
    return
  }
  emits('currentChange', pageQuery)
}

/** 是否启用树形表格：treeProps 中指定了 children 字段即可 */
const hasTree = computed(() => Boolean(props.treeProps && props.treeProps.children))
</script>

<template>
  <div>
    <div>
      <el-table
        :data="props.data"
        style="width: 100%"
        :tree-props="hasTree ? props.treeProps : undefined"
        :default-expand-all="hasTree ? props.defaultExpandAll : undefined"
        v-bind="$attrs"
      >
        <el-table-column
          v-for="column in props.columns"
          :key="column.prop"
          v-bind="getColumnProps(column)"
        >
          <template v-if="$slots[column.prop!] || column.slots?.default" #default="scope">
            <slot :name="column.prop" v-bind="scope">
              <component :is="column.slots!.default!(scope)" />
            </slot>
          </template>
          <template
            v-for="(slotFn, slotName) in getNonDefaultSlots(column.slots)"
            :key="slotName"
            #[slotName]="scope"
          >
            <component :is="slotFn(scope)" />
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-if="props.hasPagination" class="pagination">
      <el-pagination
        v-model:current-page="pageQuery.current"
        v-model:page-size="pageQuery.size"
        :page-sizes="[10, 20, 50, 100]"
        size="default"
        :disabled="false"
        :background="false"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageQuery.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped>
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
