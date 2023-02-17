const { defineConfig } = require('@vue/cli-service')
const webpack = require("webpack");
const url = 'http://localhost:18883'
module.exports = defineConfig({
  lintOnSave:false,
  transpileDependencies: true,
  devServer: {
    //服务器域名，80端口是默认的，可以不用配置
    // proxy: 'http://localhost:18883'//生成服务器
    //proxy: 'http://localhost:19999'//测试服务器
    proxy:{
      '/': {
        target: url,
        ws: false, // 需要websocket 开启
        pathRewrite: {
          '^/': '/'
        }
    }}
},
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        Popper: ["popper.js", "default"]
      })
    ]
  }
})

