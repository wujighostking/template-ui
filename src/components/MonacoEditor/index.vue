<script lang="ts" setup>
import { editor } from 'monaco-editor'
// import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
// import JSONWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
// import TSWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { onBeforeUnmount, onMounted, useTemplateRef, watch } from 'vue'

defineOptions({
  name: 'MonacoEditor',
})

// window.MonacoEnvironment = {
//   getWorker(_, label) {
//     if (label === 'json') return new JSONWorker()
//     if (label === 'typescript' || label === 'javascript') return new TSWorker()
//     return new EditorWorker()
//   },
// }

const editorElementRef = useTemplateRef('editorElement')

const props = defineProps<{ lang?: string }>()

const modelValue = defineModel<string>()

let instance: editor.IStandaloneCodeEditor
onMounted(() => {
  if (!editorElementRef.value) return

  instance = editor.create(editorElementRef.value, {
    value: modelValue.value,
    language: props.lang || 'json',
    theme: 'hc-light',
    fontSize: 14,
    tabSize: 2,
    // 自适应父节点高度
    automaticLayout: true,
  })

  // instance.onDidChangeModelContent(() => {
  //   modelValue.value = instance.getValue()
  // })

  onBeforeUnmount(() => {
    instance.dispose()
  })
})

defineExpose({
  getValue: () => instance.getValue(),
  setValue: (value: string) => instance.setValue(value),
})

watch(modelValue, (newValue) => {
  if (newValue === undefined || newValue === instance.getValue()) return

  instance.setValue(newValue)
})
</script>

<template>
  <div ref="editorElement" class="editor-container"></div>
</template>

<style lang="scss" scoped>
.editor-container {
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>
