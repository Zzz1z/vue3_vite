/*
 * @Author: Zzz1z
 * @Date: 2022-02-23 11:26:27
 * @LastEditTime: 2022-03-04 10:48:08
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: \vue3_vite_ts_pinia_template\src\store\index.ts
 *
 */
import { defineStore } from 'pinia'
import { logout, getAuthInfo } from '@/api/login'

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
    async getAuthInfo () {
      // return new Promise(resolve => {
      const res = await getAuthInfo()
      // @ts-ignore
      this.userInfo.authInfo = res.data.auth_info
      // .then(res => {
      // })
      // resolve(res)
      // .catch(err => {
      //   resolve(err)

      // })
    },
    // generateRoutes (auth_info: any) {
    //   return new Promise(resolve => {
    //     const accessedRouters = filterAsyncRouter(asyncRouterMap, auth_info)
    //     this.addRouters = accessedRouters
    //     resolve(accessedRouters)
    //   })
    // },
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
