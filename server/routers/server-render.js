const ejs = require('ejs')

modules.exports = async(ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html' // 指定respone放回的是html内容

  const context = {url: ctx.path}  // 客户端js css的路径

  try {
    const appString = await renderer.renderToString(context) // 
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts()
    })
    ctx.body = html
  } catch(err) {
     console.log('render error', err)
     throw err
  }
}