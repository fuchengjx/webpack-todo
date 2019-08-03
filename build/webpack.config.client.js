const path = require('path')                            //path是Nodejs中的基本包,用来处理路径
const webpack = require("webpack")                      //引入webpack
const merge = require('webpack-merge')        //合并webpack config
const ExtractPlugin = require("extract-text-webpack-plugin")
const HTMLPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const VueclientPlugin = require('vue-server-renderer/client-plugin')

const isDev = process.env.NODE_ENV === "development"    //判断是否为测试环境,在启动脚本时设置的环境变量都是存在于process.env这个对象里面的

const defaultPluins = [  //主要为了方便才这样做 因为在dev和非dev的地方 用到的plugin是不一样的
  new webpack.DefinePlugin({                      //主要作用是在此处可以根据isdev配置process.env,一是可以在js代码中可以获取到process.env,
    'process.env': {                             //二是webpack或则vue等根据process.env如果是development,会给一些特殊的错误提醒等,而这些特殊项在正式环境是不需要的
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),                                //引入HTMLPlugin    
  new VueclientPlugin()
]
 
const devServer = {                                //这个devServer的配置是在webpack2.x以后引入的,1.x是没有的
  port: 8000,                                     //访问的端口号
  host: '0.0.0.0',                              //可以设置0.0.0.0 ,这样设置你可以通过127.0.0.1或则localhost去访问
  overlay: {
    errors: true,                               //编译中遇到的错误都会显示到网页中去
  },
  historyApiFallback: {  // 因为开起来history模式， 在没有匹配到正确的路由时 返回index.html
    index: '/index.html'
  },
  // open: true ,                                 //项目启动时,会默认帮你打开浏览器
  hot: true                                       //在单页面应用开发中,我们修改了代码后是整个页面都刷新,开启hot后,将只刷新对应的组件
}

let config


if (isDev) {  //开发环境配置
  config = merge(baseConfig, {  //将{}里面的与baseconfig里的融合 得到一个新的结果。不会修改baseconfig内的值。
    devtool: '#cheap-module-eval-source-map',    //官方推荐使用这个配置,作用是在浏览器中调试时,显示的代码和我们的项目中的代码会基本相似,而不会显示编译后的代码,以致于我们调试连自己都看不懂
    module: {
      rules: [
        {
          test: /\.styl$/,
          use: [
            'style-loader',                     //将css写入到html中去
            'css-loader',                       //css-loader处理css
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,            //stylus-loader和postcss-loader自己都会生成sourceMap,如果前面stylus-loader已生成了sourceMap
              }                               //那么postcss-loader可以直接引用前面的sourceMap
            },
            'stylus-loader'                     //处理stylus的css预处理器的问题件,转换成css后,抛给上一层的css-loader
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPluins.concat([ //添加两个插件用于hot:true的配置
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })                         
} else {  //正式环境配置
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'  //此处一定是chunkhash,因为用hash时app和vendor的hash码是一样的了,这样每次业务代码更新,vendor也会更新,也就没有了意义.
    },
    modules: {
      rules: {
        test: /\.styl$/,
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
    },
    plugins: defaultPluins.concat([
      new ExtractPlugin('styles.[contentHash:8].css'),   //定义打包分离出的css文件名
      new webpack.optimize.CommonsChunkPlugin({          //定义静态文件打包
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({         //将app.js文件中一些关于webpack文件的配置单独打包出为一个文件,用于解决部分浏览器长缓存问题   
        name: 'runtime'
      })
    ])
  })
}

module.exports = config                                 //声明一个config的配置,用于对外暴露