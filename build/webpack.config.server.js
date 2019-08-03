const path = require('path')                            //path是Nodejs中的基本包,用来处理路径
const webpack = require("webpack")                      //引入webpack
const merge = require('webpack-merge')        //合并webpack config
const ExtractPlugin = require("extract-text-webpack-plugin")
const baseConfig = require('./webpack.config.base')
const VueServerPlugin = require('vue-server-renderer/server-plugin')  // 帮我们把很多复杂的逻辑处理
 

let config

config = merge(baseConfig, {  //将{}里面的与baseconfig里的融合 得到一个新的结果。不会修改baseconfig内的值。
  target: 'node',
  entry: path.join(__dirname, '../client/server-entry.js'),
  devtool: '#source-map',    //官方推荐使用这个配置,作用是在浏览器中调试时,显示的代码和我们的项目中的代码会基本相似,而不会显示编译后的代码,以致于我们调试连自己都看不懂
  output: {
    libraryTarget: 'commonjs2', //用来指定入口 打包出来的common规范
    filename: 'server-entry[hash:8].js',
    path: path.join(__dirname, '../server-build') // 指定输出目录，输出到这个目录
  }, 
  externals: Object.keys(resquire('../package.json').dependencies),  // 让webpack打包不要打包重复的dependencies代码(package.json)   
  module: {
    rules: [
      {
        test: /\.styl/,
        use: ExtractPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',                       //css-loader处理css
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,            //stylus-loader和postcss-loader自己都会生成sourceMap,如果前面stylus-loader已生成了sourceMap
              }                               //那么postcss-loader可以直接引用前面的sourceMap
            },
            'stylus-loader'                     //处理stylus的css预处理器的问题件,转换成css后,抛给上一层的css-loader
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractPlugin('styles.[contentHash:8].css'),   //定义打包分离出的css文件名
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"',
    }),
    new VueServerPlugin()
  ]
})


module.exports = config                                 //声明一个config的配置,用于对外暴露