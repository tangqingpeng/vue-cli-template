<template>
  <img :src="imgResult" alt="" v-if="imgResult" ref="imgEl">
  <img class="default-img" v-else-if="!imgSrc && defaultType" :src="defaultTypeImg[defaultType]"
       alt="">
  <img class="default-img" v-else-if="!imgSrc" :src="defaultImg" alt="">
</template>

<script>
export default {
  name: 'QxImage',
  props: {
    imgSrc: {
      type: String,
      default: ''
    },
    defaultType: {
      type: String,
      default: ''
    },
    defaultImg: {
      type: String,
      default: require('../../../assets/logo.png')
    }
  },
  data () {
    return {
      imgResult: '',
      defaultTypeImg: {
        rankAvatar: require('../../../assets/image/common/img-error.svg')
      }
    }
  },
  watch: {
    imgSrc: {
      handler (value) {
        this.imgResult = ''
        if (value) {
          const img = new Image()
          this.imgResult = this.defaultTypeImg[this.defaultType] || this.defaultImg
          this.getImgStyle().then(res => {
            img.src = this.validImgSrc(value) ? value + res : value
            img.onload = () => {
              if (this.imgResult) this.imgResult = this.validImgSrc(value) ? value + res : value
            }
            img.onerror = () => {
              this.imgResult = require('../../../assets/image/common/img-error.svg')
            }
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    async getImgStyle () {
      let w, h = 0
      await this.$nextTick(() => {
        const ratio = 1;
        w = parseInt(this.$commons.getStyle(this.$refs.imgEl, 'width')) * parseInt(window.devicePixelRatio * ratio)
        h = parseInt(this.$commons.getStyle(this.$refs.imgEl, 'height')) * parseInt(window.devicePixelRatio * ratio)
      })
      return `?x-oss-process=image/resize,m_fill,h_${h},w_${w}/quality,q_60` ///quality,q_100
    },
    validImgSrc (src) {
      if (src.indexOf('hlahchat') !== -1) {
        return true
      } else if (src.indexOf('biaoliapp') !== -1) {
        return true
      } else if (src.indexOf('92qianxun') !== -1) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/style.scss";

img {
  object-fit: cover;
}

</style>
