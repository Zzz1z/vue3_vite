/*
 * @Author: Zzz1z
 * @Date: 2022-02-24 11:45:12
 * @LastEditTime: 2022-02-24 17:00:09
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: \vue3_vite_ts_pinia_template\src\permission.ts
 *
 */

import router, { asyncRouterMap } from './router/index'
import { useMainStore } from './store'
import { getStorage } from '@/utils/storage'
import { getAuthInfo } from '@/api/login'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteRouterMap = ['/login'] // 白名单
const defaultRoutePath = '/dashboard/work'
const mainStore = useMainStore()

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (whiteRouterMap.indexOf(to.path) !== -1) {
    next()
  } else {
    const token = getStorage('ACCESS_TOKEN') ?? null
    if (token) {
      if (to.path === 'login') {
        next({ path: defaultRoutePath })
        NProgress.done()
      } else {
        const asyncRouterMap = mainStore.asyncRouterMap
        if (!mainStore.userInfo.authInfo.length) {
          getAuthInfo().then(res => {
            console.log(res, 'resss')
          })
        }
      }
    } else {
      if (whiteRouterMap.indexOf(to.path) !== -1) {
        // 在免登录白名单，直接进入
        next()
      } else {
        next({ path: '/login' })
        NProgress.done()
      }
    }
  }
})
