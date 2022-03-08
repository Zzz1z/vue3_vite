/*
 * @Author: Zzz1z
 * @Date: 2022-02-23 11:27:57
 * @LastEditTime: 2022-03-08 17:36:33
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: \vue3_vite_ts_pinia_template\src\router\index.ts
 *
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layout/Layout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue')
  }
]

interface AsyncRoutesMap {
  path: string
  name?: string
  meta?: {
    title: string
    [props: string]: any
  }
  [props: string]: any
}

export const asyncRouterMap: Array<AsyncRoutesMap> = [
  {
    path: '/',
    name: 'Dashboard',
    component: Layout,
    meta: { title: '工作台', icon: 'home', permission: 'ownerlist_investment' },
    hidden: false,
    redirect: '/dashboard/work',
    children: [
      {
        path: '/dashboard/work',
        name: 'Work',
        component: () => import('@/views/work/Work.vue'),
        meta: { title: '业务', icon: '', permission: 'ownerlist_investment' },
        hidden: false
      },
      {
        path: '/dashboard/detail',
        name: 'Detail',
        component: () => import('@/views/work/Work.vue'),
        meta: {
          title: '详情',
          icon: '',
          permission: 'ownerlist_investment'
        },
        hidden: false
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // 在页面之间导航时控制滚动的函数
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
export default router
