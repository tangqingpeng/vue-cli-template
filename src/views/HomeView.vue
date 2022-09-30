<template>
  <div class="home">
    <div class="test" v-waves>test</div>
    <svg-icon icon-class="loading"/>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/style.scss";
.test{
  width: 100%;
  height: px2rem(100);
  border-radius: px2rem(50);
  background: var(--theme-background);
  color: var(--theme-color);
}

</style>
