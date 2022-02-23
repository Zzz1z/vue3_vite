/*
 * @Author: Zzz1z
 * @Date: 2022-02-23 15:54:39
 * @LastEditTime: 2022-02-23 15:54:40
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: vue3_ts\src\api\type.ts
 *
 */
export interface ILoginParams {
  userName: string
  password: string | number
}
export interface ILoginApi {
  login: (params: ILoginParams) => Promise<any>
}
