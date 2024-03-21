<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutFixed from './components/LayoutFixed.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import {useCategoryStore} from "../../stores/category"
import {onMounted} from 'vue'
//执行获取存储方法
const categoryStore = useCategoryStore()
onMounted(() => categoryStore.getCategory())
</script>
<template>
  <layoutNav/>
  <LayoutFixed/>
  <LayoutHeader/>
  <!--增加key 破坏复用机制 强制销毁重建-->
<!--  <RouterView :key="$route.fullPath"/>-->
  <RouterView/>
  <LayoutFooter/>
</template>