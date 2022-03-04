/*
 * @Author: Zzz1z
 * @Date: 2022-02-25 11:20:29
 * @LastEditTime: 2022-02-25 11:23:26
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: \vue3_vite_ts_pinia_template\src\utils\util.ts
 *
 */

/**
 * 深拷贝
 * @param {Object} obj
 * @param {Array} cache
 */
export function deepCopy (obj: any, cache: any = []) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  const objType = Object.prototype.toString.call(obj).slice(8, -1)
  // 考虑 正则对象的copy
  if (objType === 'RegExp') {
    return new RegExp(obj)
  }
  // 考虑 Date 实例 copy
  if (objType === 'Date') {
    return new Date(obj)
  }
  // 考虑 Error 实例 copy
  if (objType === 'Error') {
    return new Error(obj)
  }
  // @ts-ignore
  const hit = cache.filter(c => c.original === obj)[0]
  // 如果有循环引用，直接返回
  if (hit) {
    return hit.copy
  }
  const copy = Array.isArray(obj) ? [] : {}

  // 先把 copy 放到cache缓存中，在递归的时候引用它
  cache.push({ original: obj, copy })

  Object.keys(obj).forEach(key => {
    // @ts-ignore
    copy[key] = deepCopy(obj[key], cache)
  })
  return copy
}

export function filterAsyncRouter (routerMap: any, authInfo: any) {
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
export function hasPermission (permission: any, route: any) {
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
