<!--
 * @Author: Zzz1z
 * @Date: 2022-02-23 11:39:28
 * @LastEditTime: 2022-03-04 10:10:40
 * @LastEditors: Zzz1z
 * @Description: 
 * @FilePath: \vue3_vite_ts_pinia_template\src\views\login\Login.vue
 * 
-->
<template>
  <div class="login-wrap">
    <el-form class="form" ref="ruleFormRef" :rules="rules" :model="form">
      <h3 class="title">用户登录</h3>
      <el-form-item label="账号" prop="account">
        <el-input placeholder="请输入账号..." v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码..."
          show-password
        />
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          @click.prevent="onSubmit(ruleFormRef)"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { useMainStore } from '@/store'
import { login } from '@/api/login'
import { reactive, ref, getCurrentInstance } from 'vue'
import { saveToLocal, getStorage } from '@/utils/storage'
import { useRouter } from 'vue-router'

const mainStore = useMainStore()
const { proxy }: any = getCurrentInstance()
const router = useRouter()
const form = reactive({
  account: '',
  password: ''
})
const ruleFormRef = ref()
const rules = reactive({
  account: [
    { required: true, message: '请输入账号...', trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: '请输入密码...', trigger: ['blur', 'change'] }
  ]
})
const onSubmit = formEl => {
  if (!formEl) return
  formEl.validate(async valid => {
    if (valid) {
      // @ts-ignore
      const result = await login(form)
      if (result.code === proxy.$SUCCESS_CODE) {
        const { token }: any = result.data ?? ''
        mainStore.updateToken(token)
        mainStore.getAuthInfo()
        saveToLocal('ACCESS_TOKEN', token)
        proxy.$message.success('登录成功')
        router.push({ path: '/' })
      }
    }
  })
}
</script>
<style lang="less">
.login-wrap {
  width: 100vw;
  height: 100vh;
  background: #ccc url('../../assets/images/logo.jpg') no-repeat center;
  .title {
    text-align: center;
    font-size: 18px;
    margin-bottom: 30px;
  }
  .form {
    width: 328px;
    height: 318px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    opacity: 1;
    border-radius: 2px;
    padding: 0 20px;
    padding-top: 80px;
    position: absolute;
    right: 120px;
    top: 300px;
    background-color: #fff;
    .login-btn {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>
