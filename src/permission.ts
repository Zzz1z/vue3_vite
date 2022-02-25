/*
 * @Author: Zzz1z
 * @Date: 2022-02-24 11:45:12
 * @LastEditTime: 2022-02-25 14:05:41
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: \vue3_vite_ts_pinia_template\src\permission.ts
 *
 */

import router, { asyncRouterMap } from './router/index'
import { useMainStore } from './store'
import { getStorage } from '@/utils/storage'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteRouterMap = ['/login'] // 白名单
const defaultRoutePath = '/dashboard/work'
const mainStore = useMainStore()

NProgress.configure({ showSpinner: false }) // 进度环显示隐藏

router.beforeEach(async (to, from, next) => {
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
          try {
            const res = mainStore.getAuthInfo()
            console.log(res, 'resss')
            // .then(res => {
            // const roles = res.data
            mainStore.generateRoutes(res).then(() => {
              // @ts-ignore
              router.addRoute(mainStore.addRouters)
            })
            next({ ...to, replace: true })
            // })
          } catch (err) {}
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
