/*
 * @Author: Zzz1z
 * @Date: 2022-02-23 11:26:27
 * @LastEditTime: 2022-04-14 21:40:12
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: \vue3_vite_ts_pinia_template\src\store\index.ts
 *
 */
import { defineStore } from "pinia";
import { logout, getAuthInfo } from "@/api/login";

export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    token: "",
    userInfo: {
      id: null,
      authInfo: [],
    },
    addRouters: [],
  }),
  // getters
  getters: {
    asyncRouterMap: (state) => state.addRouters,
  },
  // actions
  actions: {
    updateToken(token: string) {
      this.token = token;
    },
    async getAuthInfo() {
      // @ts-ignore
      this.userInfo.authInfo = [{ name: "test", url: "auth" }];
    },

    logout() {
      return new Promise((resolve) => {
        logout()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            resolve(err);
          });
      });
    },
  },
});
