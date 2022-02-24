/*
 * @Author: Zzz1z
 * @Date: 2022-02-23 11:27:57
 * @LastEditTime: 2022-02-24 15:01:37
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: \vue3_vite_ts_pinia_template\src\router\index.ts
 *
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layout/Layout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
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
    path: '/dashboard',
    name: 'Dashboard',
    component: Layout,
    meta: { title: '工作台', icon: 'home' },
    hidden: false,
    children: [
      {
        path: 'work',
        name: 'Work',
        component: () => import('@/views/work/Work.vue'),
        // redirect: { name: 'WorkList' },
        meta: { title: '业务', icon: '' },
        hidden: false
      }
    ]
    // children: [
    //   {
    //     path: 'work',
    //     name: 'Work',
    //     component: () => import('@/views/work/index.vue'),
    //     redirect: { name: 'WorkList' },
    //     meta: { title: '业务', icon: '' },
    //     hidden: false,
    //     children: [
    //       {
    //         path: 'workList',
    //         name: 'WorkList',
    //         component: () => import('@/views/work/list.vue'),
    //         meta: { title: '业务列表', permission: ['interspace'] },
    //         hidden: true
    //       },
    //       {
    //         path: 'detail',
    //         name: 'Detail',
    //         component: () => import('@/views/work/detail.vue'),
    //         meta: { title: '业务详情', permission: ['interspace'] },
    //         hidden: true
    //       }
    //     ]
    //   }
    // ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
