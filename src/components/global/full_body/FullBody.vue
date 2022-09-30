<template>
  <div class="app-container" :style="{'padding-top':`${statusBarH}px`,'padding-bottom':`${bottomBarH}px`}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "FullBody"
}
</script>

<script setup>
import {ref, getCurrentInstance} from 'vue'

const {proxy, ctx} = getCurrentInstance()

const statusBarH = ref(0)
const bottomBarH = ref(0)
statusBarH.value = proxy.$appNavBarHeight
bottomBarH.value = proxy.$appBottomBarHeight

</script>

<style lang="scss" scoped>
@import "@/assets/css/style.scss";


</style>
