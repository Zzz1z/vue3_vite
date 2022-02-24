/*
 * @Author: Zzz1z
 * @Date: 2022-02-23 11:26:27
 * @LastEditTime: 2022-02-24 17:37:27
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: \vue3_vite_ts_pinia_template\src\store\index.ts
 *
 */
import { defineStore } from 'pinia'
import { login, logout } from '@/api/login'
export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    name: '超级管理员',
    userInfo: {
      id: null,
      authInfo: []
    }
  }),
  // getters
  getters: {
    nameLen: state => state.name.length,
    asyncRouterMap: state => {}
  },
  // actions
  actions: {
    updateName (name: string) {
      this.name = name
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
