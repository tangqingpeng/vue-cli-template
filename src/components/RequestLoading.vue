<template>
  <transition name="fade-transform" mode="out-in">
    <div class="request-loading-component" v-if="showLoading">
      <svg-icon icon-class="loading"/>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RequestLoading',
  data () {
    return {
      timer: null,
      showLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'requestLoading'
    ])
  },
  watch: {
    requestLoading (loading) {
      clearTimeout(this.timer)
      if (!loading) this.showLoading = false
      this.timer = setTimeout(() => {
        if (loading) this.showLoading = true
      }, 300)
    }
  },
  created () {
  }
}
</script>

<style lang='scss' scoped>
.request-loading-component {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  //background-color: rgba(48, 65, 86, 0.2);
  background-color: transparent;
  font-size: 150px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
