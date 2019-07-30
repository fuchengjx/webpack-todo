export default {  //将数据处理 拼装成自己想要的数据格式
  fullName (state) {
    return state.firstName + state.lastName
  }
}