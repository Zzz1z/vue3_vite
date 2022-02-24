/*
 * @Author: Zzz1z
 * @Date: 2022-02-23 15:54:34
 * @LastEditTime: 2022-02-24 17:25:42
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: \vue3_vite_ts_pinia_template\src\api\login.ts
 *
 */
import http from '@/utils/request'
import * as T from './types'

export const login = (params: T.ILoginApi) => {
  return http.post('/auth/account-login', params)
}
export const logout = () => {
  return http.post('/auth/account-login')
}
export const getAuthInfo = () => {
  return http.get('/sysauth/auth-info')
}
