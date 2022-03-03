/*
 * @Author: Zzz1z
 * @Date: 2022-02-23 15:54:39
 * @LastEditTime: 2022-02-28 10:13:24
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: \vue3_vite_ts_pinia_template\src\api\types.ts
 *
 */
export interface ILoginParams {
  account?: string
  password?: string | number
}
export interface ILoginApi {
  login: (params: ILoginParams) => Promise<any>
}
export interface ILogoutApi {
  logout: () => Promise<any>
}
