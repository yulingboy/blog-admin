module.exports = {
  //Solution For Issue:You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
  //zhengkai.blog.csdn.net
  runtimeCompiler: true,
  devServer: {
    disableHostCheck: true
    // host: '112.124.203.100'
    // port: '3000'
  },
  dev: {
    // proxyTable: proxyConfig.proxyList, // 无效，不使用，20190422
    proxyTable: {
      '/api': {
          target: 'http://112.124.203.100:3000',//后端接口地址
          changeOrigin: true, // 是否允许跨越
          pathRewrite: {
              '^/api': '/api', // 重写
          }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  }
}
