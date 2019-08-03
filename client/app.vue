<template>
    <div id="app">
     
        <div id="cover"></div>
        <Header></Header>
         <p>{{fullName}} </p>
        <!-- <Todo></Todo> -->
        <transition name="fade">
          <router-view />
        </transition>
        <Footer></Footer>
    </div>
</template>

<script>
import {
  mapState, mapGetters, mapActions, mapMutations
} from 'vuex';
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

export default {
    components: {
        Header,
        Footer,
        // Todo
    },
    data() {
      return {
        fade: true,
        show: true
      }
    },
    methods: {
      transitionComplete: function(el) {
        console.log('i am a transition', el)
      },
      todoMap: function () {
        console.log('Todo Map')
        // this.updateCount(101)  //根本没用 这种映射，可能是由于module的关系。
        // this.$store.dispatch('updateCountAsync', {num: 5, time: 2000})
        // this.updateCountAsync({num: 5, time: 2000})
      },
    },
    ...mapActions(['updateCountAsync']),  
    ...mapMutations(['updateCount']), //...mapMutation把本组件的mutations映射到updateCount方法里(updateCount在mutations.js里)
    mounted() {
      this.todoMap()
      let i   = 1
      // this.$store.dispatch('updateCountAsync',{
      //   num: 5,
      //   time: 2000
      // })
      // setInterval(() => {
      //   this.$store.commit('updateCount', i++)
      // }, 1000);
    },
    computed: {
      // ...mapState(['count']),  // 非常方便的获得store里的数据
      // ...mapState({  // 获得不同名的state
      //   counter: count
      // }),
      ...mapState({  // 将vuex state数据映射到计算属性里面，映射的名字为counter 所以直接用this.counter就能获取到state.count的值
        counter: (state) => state.count,  
        // text: (state) => state.a.text  // 获取a模块里的text
      }),
      // count () {
      //   return this.$store.state.count
      // },

      ...mapGetters(['fullName'])  //使用getters
      // fullName () {
      //   return this.$store.getters.fullName
      // }
    },
}
</script>

<style lang="stylus" scoped>
#app
 position absolute
 left 0
 right 0
 top 0
 bottom 0
 #cover
     position absolute
     left 0
     right 0
     top 0
     bottom 0   
     background-color #999 
     opacity 0.2
     z-index -1


.fade-enter-active, .fade-leave-active {
    transition: all 2s ease 
}
.fade-enter, .fade-leave{
  opacity: 0
}
</style>
