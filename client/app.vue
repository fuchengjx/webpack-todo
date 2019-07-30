<template>
    <div id="app">
     
        <div id="cover"></div>
        <Header></Header>
         <p>{{fullName}} </p>
         <p>{{counter}}</p>
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
      ...mapActions(['updateCountAsync'])
    },
    mounted() {
      let i = 1
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
      ...mapState({
        counter: (state) => state.count
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
