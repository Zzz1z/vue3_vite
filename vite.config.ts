/*
 * @Author: Zzz1z
 * @Date: 2022-02-23 10:53:07
 * @LastEditTime: 2022-02-23 17:12:48
 * @LastEditors: Zzz1z
 * @Description:
 * @FilePath: \dk-system-vue3_ts\vite.config.ts
 *
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~': resolve(__dirname, 'src/components')
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/assets/style/index.less";'
      }
    }
  },
  plugins: [vue()],
  build: {
    terserOptions: {
      compress: {
        // 生产环境移除console和debugger
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
