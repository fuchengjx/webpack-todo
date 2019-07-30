import Vue from 'vue';
import defaultState from './state/state';
import mutations from './mutations/mutations';
const store = new Vuex.Store({
  state: defaultState,
  mutations
})

export default store