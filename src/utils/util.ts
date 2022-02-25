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
