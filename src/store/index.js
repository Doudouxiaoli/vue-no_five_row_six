import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    //存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },
  mutations: {
    //  修改token,并将token存入到localstorage中
    changeLogin(state, token) {
      state.Authorization = token;
      localStorage.setItem('Authorization', JSON.stringify(token));
    }
  },
})

export default store;
