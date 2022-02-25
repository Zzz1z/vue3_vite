/*
 * @Author: Zzz1z
 * @Date: 2022-02-23 11:26:27
 * @LastEditTime: 2022-02-25 13:41:49
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: \vue3_vite_ts_pinia_template\src\store\index.ts
 *
 */
import { defineStore } from 'pinia'
import { login, logout, getAuthInfo } from '@/api/login'
import { deepCopy } from '@/utils/util'
import { asyncRouterMap } from '@/router/index'

function filterAsyncRouter (routerMap: any, roles: any) {
  let asyncRouterMap = deepCopy(routerMap)
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles.permissionList, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
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
    name: '超级管理员',
    userInfo: {
      id: null,
      authInfo: []
    },
    addRouters: []
  }),
  // getters
  getters: {
    nameLen: state => state.name.length,
    asyncRouterMap: state => state.addRouters
  },
  // actions
  actions: {
    updateName (name: string) {
      this.name = name
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
    generateRoutes (roles: any) {
      return new Promise(resolve => {
        // const { roles } = data
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
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
