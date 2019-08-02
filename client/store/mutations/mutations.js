export default {
  updateCount (state, num) {
    state.count = num
    console.log('this is mutation: ', state.count)
  }
}