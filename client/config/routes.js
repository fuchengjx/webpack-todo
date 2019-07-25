// import Todo from '../views/todo/todo.vue';

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    name: 'app',
    component: () => import('../views/todo/todo.vue'), //异步组件 使首屏渲染更快 需要安装syntax-dynamic-import插件 才能解析import语法
    meta: {
      title: 'this is app',
      desciption: 'this is description'
    },
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  }
]