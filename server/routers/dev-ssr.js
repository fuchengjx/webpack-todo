// 这个dev-ssr是在开发模式下使用的。
const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs') 
const MemoryFS = require('memory-fs')  //跟node fs的作用类似  将文件写入内存而非磁盘 
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverConfig = require('../../build/webpack.config.server')

// 在nodejs中编译webpack 让它跑起来
const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs  // 制定了Compiler的输出目录

let bundle  // 记录每次打包后生成的文件
serverCompiler.watch({}, (err, stats) => {  // 每次webpack打包都会执行一个新的对象
  if (err) { // 打包出现任何错误 都会被抛出
    throw err
  }
  stats = stats.toJson()
  stats.hasErrors.forEach(err => console.log(err))  // 非webpack的错误 从这里打印
  stats.hasWarnings.forEach(warn => console.warn(err))

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'  //打包生成得到这个json文件用来渲染。
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))  // 将读出的字符串装换为json
})

const handleSSR = async (ctx) => {
  if (bundle) {  // 判断打包出来的bundle是否存在，第一次打包比较慢 需要等待一会。
    ctx.body = '你等一会，别着急。。。。。'
    return 
  }
 
  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/vue-ssr-client-manifest.json'
  )
  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs')
  )
  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest  //将这些数据填入到ejs bundle里
  })
}