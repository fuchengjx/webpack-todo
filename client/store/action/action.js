export default {  // 修改异步数据用的，异步数据必须放在action里。  同步修改数据直接放在mutations里
  updateCountAsync (store, data) {
    console.log('updateCountAsync')
    setTimeout(() => {
      store.commit('updateCount', data.num)
    }, data.time);
  }
}