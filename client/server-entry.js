import { createApp } from './create-app';
import { rejects } from 'assert';



export default context => {
   return new Promise( (resolve, rejects) => {
     const { app, router, store } = createApp()

     router.push(context.url) // 服务端主动执行路由

     router.onReady(() => { // 异步操作
        const matchedComponents = router.getMatchedComponents()
        if (!matchedComponents.length) {
          return reject(new Error('no component macthed'))
        }
        resolve(app)
     })
   })
}