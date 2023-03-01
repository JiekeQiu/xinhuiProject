const { defineConfig } = require('@vue/cli-service')
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin")
module.exports = defineConfig({
  lintOnSave:false,
  transpileDependencies: true,
  devServer: {
    port: 8080,
    proxy:{
      "/business-admin": {    //需要代理的路径
        target: 'http://47.122.37.166:18883',
    
        // target: 'http://localhost:18883',//本地测试
        changeOrigin: true,
        pathRewrite: {
          '^/business-admin': ''
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        Popper: ["popper.js", "default"]
      }),
      new CompressionPlugin({
        filename: "[path][base].gz",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
      })
    ]
  }
})

