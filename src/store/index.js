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
    changeUserBack: {name: null,age: '-' },
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
    POST_STATUS(state,payload)
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
      state.users[payload].name = state.changeUserBack.name;
      state.users[payload].age = state.changeUserBack.age;
    }
  },
  actions: {
    async getPosts({ commit }) {
      const {data,status} = await app.get('users');
      console.log(status);
      commit('GET_STATUS',data);
    },
    async addUser({ commit },user) {
      // if(user.name)
      const {status} = await app.post('users', user);
      console.log(status);
      commit('POST_STATUS',user);
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
        state.changeUserBack.name = data.name;
        state.changeUserBack.age = data.age;
        commit('CHANGE_STATUS', userIndex);
      } 
    }

      // commit('CHANGE_STATUS',userIndex)
    // async changeUser({ commit }) {
    // }
  },
  modules: {
  }
})
