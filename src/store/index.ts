/*
 * @Author: Zzz1z
 * @Date: 2022-02-23 11:26:27
 * @LastEditTime: 2022-02-23 16:22:41
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: vue3_ts\src\store\index.ts
 *
 */
import { defineStore } from 'pinia'
export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    name: '超级管理员'
  }),
  // getters
  getters: {
    nameLen: state => state.name.length
  },
  // actions
  actions: {
    updateName (name: string) {
      this.name = name
    }
  }
})
