module.exports = {
  //Solution For Issue:You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
  //zhengkai.blog.csdn.net
  runtimeCompiler: true,
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: '3000'
  },
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  }
}
