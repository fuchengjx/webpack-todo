import Vue from 'vue';
import Router from 'vue-router'
import routes from './routes'
Vue.use(Router)
// 因为服务端渲染的缘故 所以不推荐这样去export router   
// const router = new Router({
//   routes
// })
// export default router
// 每次export的时候都要创建一个router
export default () => {
  return new Router({
    routes,
    mode: 'history'  // 去除url栏里的 #
  })
}