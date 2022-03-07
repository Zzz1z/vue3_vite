<!--
 * @Author: Zzz1z
 * @Date: 2022-02-24 10:06:03
 * @LastEditTime: 2022-03-07 17:56:34
 * @LastEditors: Zzz1z
 * @Description: 
 * @FilePath: \vue3_vite_ts_pinia_template\src\views\layout\Layout.vue
 * 
-->
<template>
  <!-- <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container> -->

  <div class="layout-wrap">
    <el-container class="layout-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <Menu :routes="routes" :collapse="isCollapse" />
      </el-aside>
      <el-container class="layout-page">
        <el-header class="layout-page-header">
          <Header @foldChange="handleFoldChange" />
        </el-header>
        <el-main class="layout-page-content">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// @ts-ignore
import Menu from './components/Menu.vue'
// @ts-ignore
import Header from './components/Header.vue'
import { useMainStore } from '@/store'

const mainStore = useMainStore()
const routes = mainStore.addRouters
const isCollapse = ref(false)
const handleFoldChange = (isFold: boolean) => {
  isCollapse.value = isFold
}
</script>
<style lang="less" scoped>
.layout-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.layout-content,
.layout-page {
  height: 100%;
}
.layout-page-content {
  height: calc(100% - 48px);
}
</style>
