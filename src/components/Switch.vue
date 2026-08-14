<template>
  <el-switch v-model="value" v-bind="$attrs" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(0)
</script>
