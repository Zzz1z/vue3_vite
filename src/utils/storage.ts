/*
 * @Author: Zzz1z
 * @Date: 2022-02-23 13:40:58
 * @LastEditTime: 2022-02-23 13:40:58
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: vue3_ts\src\utils\storage.ts
 *
 */
function saveToLocal (key: string, val: any) {
  window.localStorage.setItem(key, val)
}
function getStorage (key: string): any {
  window.localStorage.getItem(key)
}
function removeLocal (key: string): any {
  window.localStorage.removeItem(key)
}

export { saveToLocal, getStorage, removeLocal }
