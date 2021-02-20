import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const app = new axios.create({
  baseURL: "http://localhost:3000/"
});
export default new Vuex.Store({
  state: {
    users: [], 
    changeUserBack: {email: null, nickname: null },
    loginUser: {email: null, password: null }
  },
  
  // data() {
  //   return {
      
  //   }
  // },
  mutations: {
    GET_STATUS(state,payload)//state , payload: изменения передаваемые с базы
    {
      state.users = payload;
    },
    CREATE_STATUS(state,payload)
    {
      //state.createUser = payload;
      state.users.push(payload);
    },
    DELETE_STATUS(state,payload)
    {
      state.users.splice(payload,1);
    },
    CHANGE_STATUS(state,payload)
    {
      state.users[payload].email = state.changeUserBack.email;
      state.users[payload].nickname = state.changeUserBack.nickname;
    },
    // LOGIN_STATUS(state,payload) {
      
    // }
  },
  actions: {
    async getPosts({ commit }) {
      const {data,status} = await app.get('users');
      console.log(status);
      commit('GET_STATUS',data);
    },
    async createUser({ commit },user) {
      // if(user.name)
      const {status} = await app.post('users', user);
      console.log(status);
      if(status === 201) {
        commit('CREATE_STATUS',user);
      }
    },
    async deleteUser({ commit,state},userIndex) {
      const userID = state.users[userIndex]._id;
      const {status} = await app.delete('users/' + userID);
      console.log(status);
      commit('DELETE_STATUS',userIndex);
      
    },
    async changeUser({commit,state},userIndex) {
      const userID = state.users[userIndex]._id;
      const {status,data} = await app.put('users/' + userID, state.users[userIndex]);
      if(status === 201) {
        state.changeUserBack.email = data.email;
        state.changeUserBack.nickname = data.nickname;
        commit('CHANGE_STATUS', userIndex);
      } 
    },
    async login({commit}, data) {
      // state.loginUser = data;
      const {status} = await app.post('users/' + data.loginUser.email,data.loginUser.password)
      if(status === 201) {
        commit('LOGIN_STATUS', data);
      }
    }
      // commit('CHANGE_STATUS',userIndex)
    // async changeUser({ commit }) {
    // }
  },
  modules: {
  }
})
