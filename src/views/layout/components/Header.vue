<!--
 * @Author: Zzz1z
 * @Date: 2022-03-07 15:38:08
 * @LastEditTime: 2022-03-08 11:40:16
 * @LastEditors: Zzz1z
 * @Description: 
 * @FilePath: \vue3_vite_ts_pinia_template\src\views\layout\components\Header.vue
 * 
-->
<template>
  <div class="nav-header">
    <Icon @click="handleFoldClick" class="fold-menu" :icon="iconName"></Icon>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref, computed } from 'vue'
const emit = defineEmits(['foldChange'])

const isFold = ref(false)
const iconName = computed(() => (isFold.value ? 'Expand' : 'Fold'))

const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>

<style scoped lang="less">
.nav-header {
  padding: 12px;

  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);

  // border-bottom: 1px solid ;
  .fold-menu {
    font-size: 12px;
    width: 24px;
    cursor: pointer;
  }
}
</style>
