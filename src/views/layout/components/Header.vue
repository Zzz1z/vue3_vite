<!--
 * @Author: Zzz1z
 * @Date: 2022-03-07 15:38:08
 * @LastEditTime: 2022-03-07 17:15:11
 * @LastEditors: Zzz1z
 * @Description: 
 * @FilePath: \vue3_vite_ts_pinia_template\src\views\layout\components\Header.vue
 * 
-->
<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClick"
    ></i>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue'
const emit = defineEmits(['foldChange'])

const isFold = ref(false)
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>

<style scoped lang="less">
.nav-header {
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
