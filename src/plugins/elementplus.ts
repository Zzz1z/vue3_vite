/*
 * @Author: Zzz1z
 * @Date: 2022-02-23 11:17:27
 * @LastEditTime: 2022-02-25 13:57:33
 * @LastEditors: Zzz1z
 * @Description: 按需加载elementplus
 * @FilePath: \vue3_vite_ts_pinia_template\src\plugins\elementplus.ts
 *
 */
import {
  ElButton,
  ElLoading,
  ElNotification,
  ElForm,
  ElInput,
  ElFormItem
} from 'element-plus'

// 组件
export const components: any[] = [ElButton, ElForm, ElInput, ElFormItem]
// 插件
export const plugins: any[] = [ElLoading, ElNotification]
