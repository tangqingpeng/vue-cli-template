<template>
  <div class="home app-container"  ref="wrapper">

    <div class="wrapper">
      <input type="file" @change="uploadFile">
      <div class="test" v-waves v-for="item of 20">test{{item}}</div>

    </div>
    <svg-icon icon-class="loading"/>
  </div>
</template>

<script setup>
import  BScroll  from 'better-scroll'
import { nextTick, ref } from 'vue'

const wrapper = ref();

nextTick(()=>{
  iniScroll();
})

function iniScroll(){
  const bs = new BScroll(wrapper.value, {
    pullUpLoad: true,
    scrollbar: true,
    pullDownRefresh: true
    // and so on
  })

}


</script>

<style lang="scss" scoped>
@import "@/assets/css/style.scss";
.app-container{
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.test{
  width: 100%;
  height: px2rem(100);
  border-radius: px2rem(50);
  background: var(--theme-background);
  color: var(--theme-color);
  margin-top: px2rem(20);
  @include center();
}

</style>
