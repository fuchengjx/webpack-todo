<template>
    <div id="app">
     
        <div id="cover"></div>
        <Header></Header>
         
        <!-- <Todo></Todo> -->
        <transition name="fade">
          <router-view />
        </transition>
        <Footer></Footer>
    </div>
</template>

<script>
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
      }
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
