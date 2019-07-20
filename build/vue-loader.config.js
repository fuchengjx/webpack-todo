module.exports = (isDev) => {
  return {
    preserveWhitepace: true,  //去除空格
    // extractCSS: true,           //将.vue文件里的css 打包到单独的css文件
    extractCSS: !isDev,  //在开发环境中不需要，在正式环境中需要
    // cssModules: {  //没有用。。。。
    //   loaclIndentName: '[path]-[name]-[hash:base64:5]',  //把vue里面的class里的名字hash化
    //   camelCase: true,  //把css中 - 连接的变量  变为适合js读取的字符串
    // }
  }
}