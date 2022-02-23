<!--
 * @Author: Zzz1z
 * @Date: 2022-02-23 11:39:28
 * @LastEditTime: 2022-02-23 17:27:14
 * @LastEditors: Zzz1z
 * @Description: 
 * @FilePath: \dk-system-vue3_ts\src\views\login\Login.vue
 * 
-->
<template>
  <div class="wrap">
    <p>{{ mainStore.name }}</p>
    <p>名字长度:{{ mainStore.nameLen }}</p>
    <button @click="onClick">修改名字长度</button>
  </div>
</template>
<script setup lang="ts">
import { useMainStore } from '@/store'
const mainStore = useMainStore()

const onClick = () => {
  // mainStore.$patch({
  //   name: '我也不知道叫什么好~'
  // })
  mainStore.updateName('123321')
}
</script>
<style lang="less">
.wrap {
  background-color: @primary-color;
}
</style>
