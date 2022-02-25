/*
 * @Author: Zzz1z
 * @Date: 2022-02-23 10:53:07
 * @LastEditTime: 2022-02-25 14:07:54
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: \vue3_vite_ts_pinia_template\src\main.ts
 *
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
// import { components, plugins } from './plugins/elementplus.js'
import { createPinia } from 'pinia'
import '@/assets/style/index.less'
const app = createApp(App)
// components.forEach(comp => {
//   app.component(comp.name, comp)
// })
// plugins.forEach(plugin => {
//   app.use(plugin)
// })

app
  .use(router)
  .use(createPinia())
  .mount('#app')
