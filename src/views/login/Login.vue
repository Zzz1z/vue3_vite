<!--
 * @Author: Zzz1z
 * @Date: 2022-02-23 11:39:28
 * @LastEditTime: 2022-02-25 15:58:41
 * @LastEditors: Zzz1z
 * @Description: 
 * @FilePath: \vue3_vite_ts_pinia_template\src\views\login\Login.vue
 * 
-->
<template>
  <div class="login-wrap">
    <el-form
      class="form"
      ref="ruleFormRef"
      :rules="rules"
      :model="form"
      label-width="120px"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(ruleFormRef)"
          >Create</el-button
        >
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { useMainStore } from '@/store'
import { login } from '@/api/login'
import { onMounted } from 'vue'
import { reactive, ref } from 'vue'

const mainStore = useMainStore()
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

// onMounted(() => {
//   console.log('123321')
// })

const onClick = () => {
  // mainStore.$patch({
  //   name: '我也不知道叫什么好~'
  // })
  mainStore.updateName('123321')
}
const onSubmit = formEl => {
  if (!formEl) return
  formEl.validate(async valid => {
    if (valid) {
      const result = await login(form)
      console.log(result, '123')
    }
  })

  // console.log(formEl, 'EL')
  // formEl: FormInstance | undefined
}
</script>
<style lang="less">
.login-wrap {
  width: 100vw;
  height: 100vh;
  position: relative;
  // padding-top: 200px;
  // background-color: @primary-color;
  .form {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%);
  }
}
</style>
