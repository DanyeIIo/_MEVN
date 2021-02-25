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
    changedList: {list: null,status:null,id:null}, 
    createdList: {_id:null ,list: null,status:false},
    removeList:{id:null}   
  },

  mutations: {
    GET_STATUS(state,payload)
    {
      state.users = payload;
    },

    CREATE_STATUS(state,payload)
    {
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
    },
    remove_list(state,payload) {
      state.users[0].todo.splice(payload,1);
    },
  },

  actions: {
    async getPosts({ commit }) {
      const {data,status} = await app.get('users');
      console.log(status);
      commit('GET_STATUS',data);
    },

    async createUser({ commit,state },user) {
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
      console.log(state.loginDeleteUser.password);
      const {status} = await app.post('user',state.loginDeleteUser);
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
    },
    
    async addList({state},list) {
      const {status,data} = await app.post('todoList/' + state.users[0]._id, list);
      if(status === 201) {
        state.createdList._id = data;
      }
    },
    
    async changeList({state},index) {
      state.changedList.status = state.users[0].todo[index].status;
      state.changedList.list = state.users[0].todo[index].list;
      state.changedList.id = state.users[0].todo[index]._id;
      if(state.changedList.status === false) {
        state.changedList.status = true;
      }
      else {
        state.changedList.status = false;
      }
      console.log(state.changedList.list + " changed");
      await app.put('todoList/' + state.users[0]._id,state.changedList);
    },
    async removeList({commit,state},index) {
      state.removeList.id = state.users[0].todo[index]._id;
      await app.post('todoListRemove/' + state.users[0]._id, state.removeList);
      commit('remove_list',index);

    }
  },

  modules: {
  }
})
