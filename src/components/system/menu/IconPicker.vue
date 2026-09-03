<script lang="ts" setup>
import { icons as epIcons } from '@iconify-json/ep'
import { addCollection, Icon } from '@iconify/vue'
import { computed, ref } from 'vue'

import { resolveMenuIcon } from '@/utils/icon'

/** 本地注册 Element Plus 图标集（ep:），保证网格枚举与离线渲染可用 */
addCollection(epIcons)

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    clearable?: boolean
  }>(),
  {
    modelValue: '',
    placeholder: '请选择或输入图标名称（如 ep:setting）',
    clearable: true,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

/** 当前值归一化后的 iconify 名称（兼容无前缀旧数据），用于输入框前缀预览 */
const previewIcon = computed(() => resolveMenuIcon(props.modelValue))

/** 若当前选中为 ep 集图标，取图标名用于面板高亮 */
const selectedEpName = computed(() => {
  const resolved = previewIcon.value
  return resolved.startsWith('ep:') ? resolved.slice(3) : ''
})

/** ep 图标集全部图标名（小写 kebab-case） */
const iconNames = Object.keys(epIcons.icons) as string[]

/** 弹层显隐与搜索关键字 */
const popoverVisible = ref(false)
const keyword = ref('')
const panelRef = ref<HTMLElement>()
const inputRef = ref()

/** 输入框原生 input 节点 */
function getNativeInput(): HTMLInputElement | undefined {
  return inputRef.value?.$el?.querySelector('input')
}

/** 展开弹层：聚焦/点击输入框时弹出，并重置搜索关键字 */
function openPopover() {
  keyword.value = ''
  popoverVisible.value = true
}

function closePopover() {
  popoverVisible.value = false
}

/** 收起弹层：失焦时收起；若焦点落在弹层内部（如搜索框）则保持展开 */
function handleBlur() {
  window.setTimeout(() => {
    if (panelRef.value?.contains(document.activeElement)) return
    popoverVisible.value = false
  }, 120)
}

/** 输入框内容变化（支持直接输入 iconify 名称，如 ep:setting / mdi:home） */
function handleInput(value: string) {
  emit('update:modelValue', value)
}

/** 点击选中图标 */
function handleSelect(name: string) {
  emit('update:modelValue', `ep:${name}`)
  closePopover()
  // 收起后将焦点移出输入框，保证下次点击输入框可重新展开弹层
  getNativeInput()?.blur()
}

/** 按关键字过滤图标 */
const filteredIcons = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  return kw ? iconNames.filter((name) => name.includes(kw)) : iconNames
})
</script>

<template>
  <el-popover
    :visible="popoverVisible"
    placement="bottom-start"
    :width="360"
    :teleported="true"
    :popper-style="{ padding: '8px', borderRadius: '8px' }"
  >
    <template #reference>
      <el-input
        ref="inputRef"
        :model-value="modelValue"
        :placeholder="placeholder"
        :clearable="clearable"
        @focus="openPopover"
        @click="openPopover"
        @blur="handleBlur"
        @update:model-value="handleInput"
        @keydown.esc.stop="closePopover"
      >
        <template v-if="previewIcon" #prefix>
          <span class="menu-icon-picker__prefix-icon">
            <Icon :icon="previewIcon" :width="16" :height="16" />
          </span>
        </template>
      </el-input>
    </template>

    <div ref="panelRef" class="menu-icon-picker__panel">
      <el-input
        v-model="keyword"
        class="menu-icon-picker__search"
        placeholder="搜索图标"
        clearable
        size="small"
      />
      <div v-if="filteredIcons.length" class="menu-icon-picker__list">
        <div
          v-for="name in filteredIcons"
          :key="name"
          class="menu-icon-picker__item"
          :class="{ 'is-active': name === selectedEpName }"
          :title="`ep:${name}`"
          @mousedown.prevent
          @click="handleSelect(name)"
        >
          <Icon :icon="`ep:${name}`" :width="18" :height="18" />
        </div>
      </div>
      <div v-else class="menu-icon-picker__empty">未找到匹配的图标</div>
    </div>
  </el-popover>
</template>

<style lang="scss" scoped>
.menu-icon-picker {
  &__prefix-icon {
    display: inline-flex;
    align-items: center;
    color: #94a3b8;
  }

  &__search {
    width: 100%;
    margin-bottom: 8px;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 6px;
    max-height: 240px;
    padding-right: 2px;
    overflow-y: auto;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    border: 1px solid transparent;
    border-radius: 6px;
    color: #475569;
    cursor: pointer;
    transition:
      background-color 0.15s,
      color 0.15s,
      border-color 0.15s;

    &:hover {
      background-color: #f1f5f9;
      color: #3b82f6;
    }

    &.is-active {
      background-color: #eff6ff;
      color: #3b82f6;
      border-color: #bfdbfe;
    }
  }

  &__empty {
    padding: 24px 0;
    font-size: 13px;
    text-align: center;
    color: #94a3b8;
  }
}
</style>
