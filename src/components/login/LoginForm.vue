<script setup lang="ts">
import { ChatDotRound, ChatLineRound, Check, Iphone, Lock, Postcard } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { login } from '@/api/login'
import type { LoginForm } from '@/schema/loginForm'
import { setStorage } from '@/utils/storage'

const router = useRouter()
const loginFormRef = ref<FormInstance>()
const loading = ref(false)
const remember = ref(true)

const form = reactive<LoginForm>({
  phoneNumber: '13066344495',
  password: '123456',
})

const rules: FormRules<LoginForm> = {
  phoneNumber: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的手机号码',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
  ],
}

function handleLogin() {
  if (!loginFormRef.value) return
  loginFormRef.value.validate((valid) => {
    if (!valid) return
    loading.value = true

    login({ ...form })
      .then((data) => {
        if (data.code !== 0) {
          ElMessage.error(data.message || '登录失败，请检查手机号码或密码')
          return
        }

        setStorage('token', data.data)
        ElMessage.success(data.message || '登录成功')

        router.push('/')
      })
      .catch((error) => {
        if (__DEV__) {
          console.error('登录失败', error)
        }

        ElMessage.error('登录失败，请检查手机号码或密码')
      })
      .finally(() => {
        loading.value = false
      })
  })
}

function handleThirdPartyLogin(type: string) {
  ElMessage.info(`通过 ${type} 登录`)
}
</script>

<template>
  <!-- 右侧登录表单区域 -->
  <div class="login-form-wrap">
    <div class="login-form-inner">
      <div class="form-logo">
        <el-icon><Check /></el-icon>
      </div>
      <h2 class="form-title">欢迎登录</h2>
      <p class="form-subtitle">请输入您的账号信息，登录云枢管理平台</p>

      <el-form
        ref="loginFormRef"
        :model="form"
        :rules="rules"
        class="login-form"
        size="large"
        @keyup.enter="handleLogin"
      >
        <el-form-item prop="phoneNumber">
          <el-input
            v-model="form.phoneNumber"
            placeholder="请输入手机号码"
            maxlength="11"
            clearable
          >
            <template #prefix>
              <el-icon><Iphone /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password>
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <div class="form-options">
          <el-checkbox v-model="remember">记住我</el-checkbox>
          <a class="forgot-link" href="javascript:void(0)">忘记密码？</a>
        </div>

        <el-button type="primary" class="login-btn" :loading="loading" @click="handleLogin">
          登 录
        </el-button>
      </el-form>

      <div class="divider">
        <span>其他登录方式</span>
      </div>

      <div class="third-party">
        <div class="third-party-item" @click="handleThirdPartyLogin('微信')">
          <el-icon><ChatDotRound /></el-icon>
        </div>
        <div class="third-party-item" @click="handleThirdPartyLogin('客服')">
          <el-icon><ChatLineRound /></el-icon>
        </div>
        <div class="third-party-item" @click="handleThirdPartyLogin('工单')">
          <el-icon><Postcard /></el-icon>
        </div>
      </div>

      <p class="footer-tip">
        登录即代表您已阅读并同意
        <a href="javascript:void(0)">《用户协议》</a>与
        <a href="javascript:void(0)">《隐私政策》</a>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* 右侧表单区 */
.login-form-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: #fff;

  .login-form-inner {
    width: 100%;
    max-width: 400px;

    .form-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      margin: 0 auto 20px;
      font-size: 28px;
      color: #fff;
      background: linear-gradient(135deg, #3eb6f0, #2cc4b1);
      border-radius: 14px;
    }

    .form-title {
      margin: 0 0 8px;
      font-size: 26px;
      font-weight: 600;
      text-align: center;
      color: #303133;
    }

    .form-subtitle {
      margin: 0 0 36px;
      font-size: 14px;
      text-align: center;
      color: #909399;
    }

    .login-form {
      width: 100%;

      .form-options {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;

        .forgot-link {
          font-size: 14px;
          color: #2cc4b1;
          text-decoration: none;

          &:hover {
            color: #3eb6f0;
            text-decoration: underline;
          }
        }
      }

      .login-btn {
        width: 100%;
        height: 44px;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 4px;
        color: #fff;
        background: linear-gradient(135deg, #3eb6f0, #2cc4b1);
        border: none;
        border-radius: 8px;

        &:hover {
          opacity: 0.95;
          background: linear-gradient(135deg, #3eb6f0, #2cc4b1);
        }
      }
    }

    .divider {
      position: relative;
      margin: 32px 0 24px;
      text-align: center;

      &::before {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 1px;
        background: #ebeef5;
        content: '';
      }

      span {
        position: relative;
        padding: 0 16px;
        font-size: 13px;
        color: #c0c4cc;
        background: #fff;
      }
    }

    .third-party {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 28px;

      .third-party-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        font-size: 22px;
        color: #2cc4b1;
        cursor: pointer;
        background: #f0f9f7;
        border-radius: 50%;
        transition: all 0.3s;

        &:hover {
          color: #fff;
          background: #2cc4b1;
          transform: translateY(-2px);
        }
      }
    }

    .footer-tip {
      margin: 32px 0 0;
      font-size: 12px;
      text-align: center;
      color: #909399;

      a {
        color: #2cc4b1;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
