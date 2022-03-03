/*
 * @Author: Zzz1z
 * @Date: 2022-02-23 11:26:27
 * @LastEditTime: 2022-03-03 16:26:42
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: \vue3_vite_ts_pinia_template\src\store\index.ts
 *
 */
import { defineStore } from 'pinia'
import { logout, getAuthInfo } from '@/api/login'
import { deepCopy } from '@/utils/util'
import { asyncRouterMap } from '@/router'

function filterAsyncRouter (routerMap: any, authInfo: any) {
  let asyncRouterMap = deepCopy(routerMap)
  const permissionList = authInfo.map(auth => auth.url)
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(permissionList, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, authInfo)
      }
      return true
    }
    return false
  })
  return accessedRouters
}
/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission (permission: any, route: any) {
  if (route.meta && route.meta.permission) {
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    token: '',
    userInfo: {
      id: null,
      authInfo: []
    },
    addRouters: []
  }),
  // getters
  getters: {
    asyncRouterMap: state => state.addRouters
  },
  // actions
  actions: {
    updateToken (token: string) {
      this.token = token
    },
    getAuthInfo () {
      return new Promise(resolve => {
        getAuthInfo()
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            resolve(err)
          })
      })
    },
    generateRoutes (auth_info: any) {
      return new Promise(resolve => {
        const accessedRouters = filterAsyncRouter(asyncRouterMap, auth_info)
        this.addRouters = accessedRouters
        resolve(accessedRouters)
      })
    },
    logout () {
      return new Promise(resolve => {
        logout()
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            resolve(err)
          })
      })
    }
  }
})
