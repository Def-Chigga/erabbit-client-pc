const { defineConfig } = require('@vue/cli-service')
const path = require('path')
// element-plus 按需导入
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  // 基本路径
  publicPath: './', // 默认的'/'是绝对路径，如果不确定在根路径，改成相对路径'./'
  outputDir: 'dist', // 输出文件目录
  assetsDir: 'static',
  indexPath: 'index.html',
  lintOnSave: true, // eslint-loader 是否在保存的时候检查
  productionSourceMap: true, // 生产环境是否生成 sourceMap 文件
  // css相关配置
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false // 开启 CSS source maps?
  },
  // 删除预加载
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  },
  // webpack-dev-server 相关配置
  devServer: {
    // open: false, // open 在devServer启动且第一次构建完成时，自动用我们的系统的默认浏览器去打开要开发的网页
    // host: "0.0.0.0", // 默认是 localhost。如果你希望服务器外部可访问，指定如下 host: '0.0.0.0'，设置之后之后可以访问ip地址
    // port: 8077,
    // hot: true, // hot配置是否启用模块的热替换功能，devServer的默认行为是在发现源代码被变更后，通过自动刷新整个页面来做到事实预览，开启hot后，将在不刷新整个页面的情况下通过新模块替换老模块来做到实时预览。
    // https: false, // https协议
    // disableHostCheck: true, // 关闭头部校验
    // hotOnly: false, // hot 和 hotOnly 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败
    historyApiFallback: { // 解决vue mode:history 启动之后出现刷新页面 cannot GET /问题
      index: '/index.html'
    },
    proxy: { // 设置代理
      '/api': {
        target: process.env.VUE_APP_BASE_URL, // 接口请求的地址
        secure: false, // false为http访问，true为https访问
        changeOrigin: true, // 是否跨域
        ws: true, // websocket支持
        pathRewrite: {
          '^/api': '' // 路径重写
        }
      }
    }
  },
  // webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        views: '@/views'
      }
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  // 第三方插件配置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.join(__dirname, './src/assets/css/mixin.scss')
      ]
    }
  }
})
