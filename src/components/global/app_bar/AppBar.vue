<template>
  <div class="app-bar">
    <div class="app-bar_wrap">
      <slot name="leftBar">
        <div class="app-bar_left app-bar_btn" @click="closeWebview"></div>
      </slot>
      <slot name="centerBar">
        <div class="app-bar_center"></div>
      </slot>
      <slot name="rightBar">
        <div class="app-bar_right app-bar_btn"></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name:"AppBar"
}
</script>

<script setup>
import { getCurrentInstance } from 'vue'

const { proxy, ctx } = getCurrentInstance()

function closeWebview () {
  proxy.$qianXunApp('closeWebView2QX', {}, true)
}

</script>

<style lang="scss" scoped>
@import "@/assets/css/style.scss";

.app-bar {
  width: 100%;
  min-height: px2rem(100);
  .app-bar_wrap {
    position: relative;
    width: 100%;
    min-height: px2rem(100);
    z-index: 9999999;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: px2rem(32);
    padding: 0 px2rem(32);
    box-sizing: border-box;

    .app-bar_btn {
      width: px2rem(100);
      min-height: px2rem(100);
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .app-bar_left {
      //background-image: url("../../../assets/image/common/backfff.svg");
      background-size: px2rem(44) px2rem(44);
      background-repeat: no-repeat;
      background-position-y: center;
      background-position-x: 0;
    }
  }
}
</style>
