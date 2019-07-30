import Vue from 'vue'   //引用vue类库
import App from './app.vue'  
import routes from './config/routes'
import VueRouter from 'vue-router'
import Vuex from 'vuex';
Vue.use(Vuex) 
Vue.use(VueRouter)
import './assets/styles/global.styl'

import createStore from './store/sotre';
const store = createStore()

const router = new VueRouter({
  routes,
  // webpack配置上要加 historyApiFallback
  mode: 'history', //将默认的hash路由改为  history模式  去掉#号 不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://xx/xx 就会返回 404，这就不好看了。
    // base: '/base/' //在url栏上 加一个/base/
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) { // 如果有滚动行为
      return savedPosition  //上次滚动到哪 下次也滚动到哪
    } else {
      return { x: 0, y: 0} //默认到最左上面
    }
  },
  fallback: true //如果浏览器不支持history路由 将默认切换到hash路由  false 将不再是单页面应用。
})

const root = document.createElement('div')  //创建div节点
document.body.appendChild(root);            //将div节点添加到body下

new Vue({
    router,
    store,
    render: (h) => h(App)  
    //vue在创建Vue实例时,通过调用render方法来渲染实例的DOM树,也就是这个组件渲染的是App的内容
    //vue在调用render方法时,会传入一个createElement函数作为参数,也就是这里的h的实参是createElement函数,然后createElement会以App为参数进行调用
}).$mount(root) //挂载html的root节点下面