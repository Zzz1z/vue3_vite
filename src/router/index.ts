/*
 * @Author: Zzz1z
 * @Date: 2022-02-23 11:27:57
 * @LastEditTime: 2022-02-23 11:49:52
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: vue3_ts\src\router\index.ts
 *
 */
import { createRouter, createWebHistory, RouteRecord } from 'vue-router'
const routes: Array<RouteRecord> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/login/Login.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
