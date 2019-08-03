import Vue from 'vue'   //引用vue类库
import App from './app.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex';
Vue.use(Vuex)
Vue.use(VueRouter)
import createStore from './store/sotre';


import './assets/styles/global.styl'

export default () => { // 每次创建都要创建这个，避免内存泄漏。
  const router = createRouter()
  const store = createStore()
  
  const app = new Vue({
    router,
    store,
    render: h=> h(App)
  })
  return { app, store, router}
}