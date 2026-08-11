<script setup lang="ts">
import BrandSection from '@/components/login/BrandSection.vue'
import LoginForm from '@/components/login/LoginForm.vue'
</script>

<template>
  <div class="login-container">
    <BrandSection />
    <LoginForm />
  </div>
</template>

<style scoped lang="scss">
.login-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f5f7fa;

  /* 响应式 */
  @media (width <= 900px) {
    justify-content: center;
  }
}
</style>
