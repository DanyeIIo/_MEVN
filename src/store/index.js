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
    changeUser: {email:null,nickname: null,password: null, oldUserEmail: null },
    changedUser: {email:null,nickname: null,password: null},
    loginDeleteUser: {email: null, password: null },
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
    DELETE_STATUS(state)
    {
      let index = state.users.indexOf({email: state.loginDeleteUser.email});
      if(index !==-1 ) {
        state.users.splice(index,1);
      }
    },
    CHANGE_STATUS(state)
    {
      state.users.forEach(e => {
        if(e.email == state.changeUser.oldUserEmail) {
          e.email = state.changedUser.email;
          e.nickname = state.changedUser.nickname;
          e.password = state.changedUser.password;
        }
      })
      // state.users[payload].nickname = state.changeUserBack.nickname;
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
    async createUser({ commit,state },user) {
      // if(user.name)
      state.message = "Fuck you";
      const {status} = await app.post('users', user);
      console.log(status);
      if(status === 201) {
        commit('CREATE_STATUS',user);
      }
    },
    async removeUser({commit,state},user) {
      state.loginDeleteUser = await user;
      console.log(state.loginDeleteUser.email);
      const {status} = await app.delete('users',await user);
      console.log(status);
      if(status === 201) {
        commit('DELETE_STATUS');
        alert("success remove!"); 
      }
      else {
        alert("Invalid data!"); 
      }
    },
    async changeUser({commit,state},newUser) {
      
      const {status,data} = await app.put('users',newUser);
      if(status === 201) {
        state.changeUser = newUser;
        state.changedUser = data;
        alert(state.changedUser);
        commit('CHANGE_STATUS');
      } 
    },
    async login({commit}, data) {
      // state.loginUser = data;
      const {status} = await app.post('users/' + data.loginUser.email,data.loginUser.password)
      if(status === 201) {
        commit('LOGIN_STATUS');
      }
    }
      // commit('CHANGE_STATUS',userIndex)
    // async changeUser({ commit }) {
    // }
  },
  modules: {
  }
})
