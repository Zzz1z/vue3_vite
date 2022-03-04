<!--
 * @Author: Zzz1z
 * @Date: 2022-02-24 10:06:03
 * @LastEditTime: 2022-03-04 17:40:17
 * @LastEditors: Zzz1z
 * @Description: 
 * @FilePath: \vue3_vite_ts_pinia_template\src\views\layout\Layout.vue
 * 
-->
<template>
  <el-container class="layout-wrapper">
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="220px">
        <Menu :routes="routes"></Menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
// @ts-ignore
import Menu from './components/Menu.vue'
import { useMainStore } from '@/store'

const mainStore = useMainStore()
const routes = mainStore.addRouters
</script>
<style lang="less" scoped>
.layout-wrapper {
  // width: 100%;
  // height: 100vh;
  background-color: cyan;
}
</style>
