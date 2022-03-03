/*
 * @Author: Zzz1z
 * @Date: 2022-02-24 11:45:12
 * @LastEditTime: 2022-03-03 17:07:01
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: \vue3_vite_ts_pinia_template\src\permission.ts
 *
 */

import router from './router/index'
import { useMainStore } from '@/store'
import { getStorage } from '@/utils/storage'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { RouteRecordRaw } from 'vue-router'

const whiteRouterMap = ['/login'] // 白名单
const defaultRoutePath = 'work'

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
      if (to.path === 'login') {
        next({ path: defaultRoutePath })
        NProgress.done()
      } else {
        if (routeFlag) {
          next()
        } else {
          const mainStore = useMainStore()
          if (mainStore.userInfo.authInfo.length === 0) {
            mainStore.getAuthInfo().then((res): any => {
              // @ts-ignore
              const authInfo = res.data.auth_info
              mainStore.userInfo.authInfo = authInfo
              mainStore.generateRoutes(authInfo).then(() => {
                // @ts-ignore
                mainStore.addRouters.forEach((route: RouteRecordRaw) => {
                  router.addRoute(route)
                })
              })
            })
            routeFlag = true
            next({ ...to, replace: true })
          }
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
