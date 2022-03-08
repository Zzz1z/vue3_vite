/*
 * @Author: Zzz1z
 * @Date: 2022-02-23 10:53:07
 * @LastEditTime: 2022-03-08 10:17:17
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: \vue3_vite_ts_pinia_template\src\main.ts
 *
 */
import { createApp, createVNode } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import 'element-plus/theme-chalk/el-message.css'
import '@/assets/style/index.less'
import { ElMessage } from 'element-plus'
import './permission'
import * as Icons from '@element-plus/icons'
const app = createApp(App)
// 创建Icon组件
const Icon = (props: { icon: string }) => {
  const { icon } = props
  return createVNode(Icons[icon as keyof typeof Icons])
}
app.component('Icon', Icon)
// 全局变量->后端返回的成功状态码
app.config.globalProperties.$SUCCESS_CODE = '000'
app.config.globalProperties.$message = ElMessage

app
  .use(router)
  .use(createPinia())
  .mount('#app')
