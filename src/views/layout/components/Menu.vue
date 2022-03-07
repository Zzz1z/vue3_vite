<!--
 * @Author: Zzz1z
 * @Date: 2022-03-04 13:53:24
 * @LastEditTime: 2022-03-07 17:53:23
 * @LastEditors: Zzz1z
 * @Description: 左侧菜单栏
 * @FilePath: \vue3_vite_ts_pinia_template\src\views\layout\components\Menu.vue
 * 
-->

<template>
  <div class="logo-wrap">
    <div class="logo">
      <img class="img" src="@/assets/logo.png" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      :default-active="defaultActive"
      router
      unique-opened
      @open="handleOpen"
      @close="handleClose"
    >
      <template v-for="item in routes" :key="item.path">
        <el-sub-menu :index="item.path" v-if="item.children">
          <template #title>
            <img :src="item.meta.icon" alt="" />
            <!-- <el-icon><item.icon></item.icon>></el-icon> -->
            <span>{{ item.meta.title }}</span>
          </template>
          <template v-for="subItem in item.children" :key="subItem.path">
            <el-menu-item v-if="!subItem.hidden" :index="subItem.path">
              <template #title>
                <img :src="subItem.img" />
                <span>{{ subItem.meta.title }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item v-else :index="item.index">
          <img :src="item.img" />
          <template #title>{{ item.meta.title }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const props = defineProps({
  routes: { type: Object },
  collapse: { type: Boolean }
})

const route = useRoute()
const defaultActive = computed(() => {
  const { path } = route
  return path
})
// watch(route => {
// })
// const emits = defineEmits(['sendEmit'])
// const sendString = () => {
//   emits('sendEmit', '123')
// }

const handleOpen = () => {}
const handleClose = () => {}
</script>
<style lang="less" scoped>
.logo-wrap {
  height: 100%;
  background-color: @layout-color;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
}
</style>
