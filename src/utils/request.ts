/*
 * @Author: Zzz1z
 * @Date: 2022-02-23 11:59:37
 * @LastEditTime: 2022-02-23 16:34:49
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: vue3_ts\src\utils\request.ts
 *
 */

import axios, { AxiosRequestConfig } from 'axios'
import { getStorage } from '@/utils/storage'
import { ElNotification } from 'element-plus'
import NProgress from 'nprogress'
import router from '../router'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 6000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// request interceptor
request.interceptors.request.use(
  (config): AxiosRequestConfig<any> => {
    const token = getStorage('ACCESS_TOKEN')
    // 如果 token 存在
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    if (token) {
      //@ts-ignore
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    return error
  }
)

// response interceptor
request.interceptors.response.use(response => {
  let res = response.data
  if (res.code !== '000') {
    ElNotification.error({
      title: '提示',
      message: res.msg
    })
  }

  if (res.code == 401) {
    ElNotification.error({
      title: '提示',
      message: '登录失效'
    })
  }
  return Promise.resolve(response.data)
})

interface ResType<T> {
  code?: string
  data?: T
  msg?: string
  error?: string
}

interface Http {
  get<T>(url: string, params?: unknown): Promise<ResType<T>>
  post<T>(url: string, params?: unknown): Promise<ResType<T>>
}

const http: Http = {
  get (url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      request
        .get(url, { params })
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
        .finally(() => {
          NProgress.done()
        })
    })
  },
  post (url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      request
        .get(url, { params })
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
        .finally(() => {
          NProgress.done()
        })
    })
  }
}

export default http
