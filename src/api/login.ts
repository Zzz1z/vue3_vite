/*
 * @Author: Zzz1z
 * @Date: 2022-02-23 15:54:34
 * @LastEditTime: 2022-02-25 15:54:12
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: \vue3_vite_ts_pinia_template\src\api\login.ts
 *
 */
import http from '@/utils/request'
import * as T from './types'

export const login = (params: T.ILoginApi) => {
  return http.post('auth/account-login', params)
}
export const logout = () => {
  return http.post('auth/logout')
}
export const getAuthInfo = () => {
  return http.get('sysauth/auth-info')
}
