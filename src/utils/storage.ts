/*
 * @Author: Zzz1z
 * @Date: 2022-02-23 13:40:58
 * @LastEditTime: 2022-02-28 13:49:17
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: \vue3_vite_ts_pinia_template\src\utils\storage.ts
 *
 */
function saveToLocal (key: string, val: any) {
  window.localStorage.setItem(key, val)
}
function getStorage (key: string): any {
  return window.localStorage.getItem(key)
}
function removeLocal (key: string): any {
  window.localStorage.removeItem(key)
}

export { saveToLocal, getStorage, removeLocal }
