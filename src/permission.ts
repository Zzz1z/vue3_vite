/*
 * @Author: Zzz1z
 * @Date: 2022-02-24 11:45:12
 * @LastEditTime: 2022-03-04 10:54:41
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: \vue3_vite_ts_pinia_template\src\permission.ts
 *
 */

import router from './router/index'
import { asyncRouterMap } from '@/router'
import { useMainStore } from '@/store'
import { getStorage } from '@/utils/storage'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { RouteRecordRaw } from 'vue-router'
import { filterAsyncRouter, hasPermission } from '@/utils/util'

const whiteRouterMap = ['/login'] // 白名单
const defaultRoutePath = '/'

NProgress.configure({ showSpinner: false }) // 进度环显示隐藏
let routeFlag = false
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (whiteRouterMap.indexOf(to.path) !== -1) {
    next()
    NProgress.done()
  } else {
    const token = getStorage('ACCESS_TOKEN') ?? null
    if (token) {
      if (to.path === '/login') {
        next({ path: defaultRoutePath })
        NProgress.done()
      } else {
        if (routeFlag) {
          next()
        } else {
          const mainStore = useMainStore()
          if (mainStore.userInfo.authInfo.length === 0) {
            await mainStore.getAuthInfo()
            const authInfo = mainStore.userInfo.authInfo
            const accessedRouters = filterAsyncRouter(asyncRouterMap, authInfo)
            accessedRouters.forEach((route: RouteRecordRaw) => {
              router.addRoute(route)
            })
            routeFlag = true
            next({ ...to, replace: true })
          }
        }
        NProgress.done()
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
