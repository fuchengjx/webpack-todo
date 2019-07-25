import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {  // 通过mutations 修改store里的数据
    updateCount (state, num) {
      state.count = num  //更新count
      // console.log(state.count)
    }
  }
})

export default store