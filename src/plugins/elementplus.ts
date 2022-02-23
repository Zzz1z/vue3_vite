/*
 * @Author: Zzz1z
 * @Date: 2022-02-23 11:17:27
 * @LastEditTime: 2022-02-23 13:55:41
 * @LastEditors: Zzz1z
 * @Description: 按需加载elementplus
 * @FilePath: vue3_ts\src\plugins\elementplus.ts
 *
 */
import { ElButton, ElLoading, ElNotification } from 'element-plus'

// 组件
export const components: any[] = [ElButton]
// 插件
export const plugins: any[] = [ElLoading, ElNotification]
