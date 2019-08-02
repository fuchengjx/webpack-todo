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
    actions,
    modules: {  // vuex模块作用域
      a: {
        state: {
          text: 'i am a text'
        },
        mutations: {
          updateText (state, text) {
            console.log('a.text', state)
            state.text = text
          }
        }
      },
      b: {
        state: {
          text: 'i am b text'
        }
      }
    }
  })
}
