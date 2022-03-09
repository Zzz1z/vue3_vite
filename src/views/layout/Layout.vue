<!--
 * @Author: Zzz1z
 * @Date: 2022-02-24 10:06:03
 * @LastEditTime: 2022-03-09 16:42:16
 * @LastEditors: Zzz1z
 * @Description: 
 * @FilePath: \vue3_vite_ts_pinia_template\src\views\layout\Layout.vue
 * 
-->
<template>
  <div class="layout-wrap">
    <el-container class="layout-content">
      <el-aside class="layout-aside" :width="isCollapse ? '60px' : '210px'">
        <Menu :routes="routes" :collapse="isCollapse" />
      </el-aside>
      <el-container class="layout-page">
        <el-header class="layout-page-header">
          <Header @foldChange="handleFoldChange" />
        </el-header>
        <el-main class="layout-page-content">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              v-for="(item, index) in currentRoute"
              :key="index"
              :to="{ path: item.path }"
            >
              {{ item.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
          <router-view class="layout-main-content"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, RouteLocationMatched } from 'vue-router'
import Menu from './components/Menu.vue'
import Header from './components/Header.vue'
import { useMainStore } from '@/store'

const mainStore = useMainStore()
const routes = mainStore.addRouters
const route = useRoute()
const isCollapse = ref(false)

interface Crumb {
  title: string | unknown
  path: string | unknown
}
const currentRoute = computed(() => {
  const routeMatched = route?.matched
  return routeMatched.map((r: RouteLocationMatched) => ({
    title: r?.meta?.title ?? '',
    path: r.path
  }))
})

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
  .layout-content,
  .layout-page {
    height: 100%;
  }
  .layout-page-content {
    height: calc(100% - 48px);
  }
  .layout-content {
    display: flex;
  }
  .layout-aside {
    transition: width 0.3s linear;
  }
  .layout-main-content {
    margin-top: 30px;
  }
}
</style>
