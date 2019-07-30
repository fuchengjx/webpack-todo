import Vuex from 'vuex';
import defaultState from './state/state';
import mutations from './mutations/mutations';
import getters from './getters/getters';
import actions from './action/action';

export default () => {
  return  new Vuex.Store({
    state: defaultState,
    mutations,
    getters,
    actions
  })
}
