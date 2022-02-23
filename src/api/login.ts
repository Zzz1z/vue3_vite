/*
 * @Author: Zzz1z
 * @Date: 2022-02-23 15:54:34
 * @LastEditTime: 2022-02-23 16:07:43
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: vue3_ts\src\api\login.ts
 *
 */
import http from '@/utils/request'
import * as T from './types'

const loginApi: T.ILoginApi = {
  login (params) {
    return http.post('/auth/account-login', params)
  }
}

export default loginApi
