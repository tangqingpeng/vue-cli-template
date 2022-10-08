const {defineConfig} = require('@vue/cli-service')
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const AliOssPlugin = require('webpack-oss')

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg|png|jpg)(\?.*)?$/i
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

// const format = AliOssPlugin.getFormat()


module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: process.env.NODE_ENV === 'test' ? '/tika' : '',
  // publicPath: IS_PROD ? `${process.env.VUE_APP_PUBLIC_PATH}/web/${format}` : '/', // 默认'/'，部署应用包时的基本 URL
  // publicPath: '/dist',
  // outputDir: 'arabh5',
  // assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false,
  // runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  // parallel: require('os').cpus().length > 1,
  // pwa: {}
  devServer: {
    port: 8080
  },

  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        // 引入全局变量样式
        additionalData: `
          @import "~@/assets/css/global.scss";
        `
      }
    },
  },

  configureWebpack: config => {
    // config.externals = {
    //   'vue': 'Vue',
    //   'element-ui': 'ELEMENT',
    //   'vue-router': 'VueRouter',
    //   'vuex': 'Vuex',
    //   'axios': 'axios'
    // }

    const plugins = []
    if (IS_PROD) {
      //压缩上传阿里云后文件不需要gzip加速
      // plugins.push(
      //   new CompressionWebpackPlugin({
      //     filename: '[path].gz[query]',
      //     algorithm: 'gzip',
      //     test: productionGzipExtensions,
      //     threshold: 10240,
      //     minRatio: 0.8,
      //     cache: true
      //   })
      // )
      // plugins.push(
      //   config.optimization.LimitChunkCountPlugin({
      //     maxChunks: 5,
      //     minChunkSize: 100
      //   })
      // )

      // plugins.push(
      //   new AliOssPlugin({
      //     accessKeyId: process.env.ACCESS_KEY_ID,
      //     accessKeySecret: process.env.ACCESS_KEY_SECRET,
      //     region: process.env.REGION,
      //     bucket: process.env.BUCKET,
      //     prefix: process.env.PREFIX,
      //     exclude: /.*\.html$/,
      //     format
      //   })
      // )
      // config.plugins.push(
      //   new UglifyJsPlugin({
      //     uglifyOptions: {
      //       compress: {
      //         drop_debugger: true,
      //         drop_console: true,  //生产环境自动删除console
      //       },
      //       warnings: false,
      //     },
      //     sourceMap: false,
      //     parallel: true,//使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
      //   })
      // );
    }
    config.plugins = [...config.plugins, ...plugins]
  },

  chainWebpack: config => {

    //  预加载优化
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // config.plugins.delete('preload')
    // 或者
    // 修改它的选项：
    // config.plugin('prefetch').tap(options => {
    //   options[0].fileBlacklist = options[0].fileBlacklist || []
    //   options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
    //   return options
    // })

    //分割代码
    if (IS_PROD) {
      config.optimization.minimize(true)
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          vantUI: {
            name: 'chunk-vantUI', // split vantUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?vant(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
    }

    //是否压缩代码
    // config.optimization.minimizer = [
    //   new UglifyjsWebpackPlugin({
    //     // 生产环境推荐关闭 sourcemap 防止源码泄漏
    //     // 服务端通过前端发送的行列，根据 sourcemap 转为源文件位置
    //     sourceMap: !IS_PROD,
    //     uglifyOptions: {
    //       warnings: false,
    //       compress: {
    //         drop_console: true,
    //         drop_debugger: true
    //       }
    //     }
    //   })
    // ]

    // 这里是对环境的配置，不同环境对应不同的BASE_API，以便axios的请求地址不同
    config.plugin('define').tap(args => {
      args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)
      return args
    })

    // svg loader
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules|assets/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/icons'))
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)

    // const cdn = {
    //   // 访问https://unpkg.com/element-ui/lib/theme-chalk/index.css获取最新版本
    //   css: ['//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css'],
    //   js: [
    //     '//unpkg.com/vue@2.6.10/dist/vue.min.js', // 访问https://unpkg.com/vue/dist/vue.min.js获取最新版本
    //     '//unpkg.com/vue-router@3.0.6/dist/vue-router.min.js',
    //     '//unpkg.com/vuex@3.1.1/dist/vuex.min.js',
    //     '//unpkg.com/axios@0.19.0/dist/axios.min.js',
    //     '//unpkg.com/element-ui@2.10.1/lib/index.js'
    //   ]
    // }

    // html中添加cdn
    // config.plugin('html').tap(args => {
    //   args[0].cdn = cdn
    //   return args
    // })

    //压缩图片
    if (IS_PROD) {
      //image-webpack-loader
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          bypassOnDebug: true
          //     mozjpeg: { progressive: true, quality: 65 },
          //     optipng: { enabled: false },
          //     pngquant: { quality: [0.65, 0.9], speed: 4 },
          //     gifsicle: { interlaced: false },
          //     webp: { quality: 75 }
        })
    }

  }

})
