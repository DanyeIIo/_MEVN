<template>

  <div class="createUser">
    <input type="text" v-model="addUser.name">
    <input type="text" v-model="addUser.age">
    <button class="waves-effect green lighten-2 btn" type="button" @click="createUser()" style="align-items: center;margin-left: 10rem;"> Add user</button>
  </div>
</template>

<script>
// import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
// import { mapState } from "vuex";
// import GetUsers from '@/components/GetUsers.vue'
// import func   from '../../vue-temp/vue-editor-bridge';
//import { new_store } from "../store/index";
export default {
  name: "CreateUser", 
  // components: {
  //   GetUsers,
  // },
  data: () => {
      return {addUser: {name: null,age: null}}
  },
  methods: {
      async createUser() {
        this.$store.dispatch('addUser',this.addUser); // самый обычный axios
        // this.addUser.name = '',
        // this.addUser.name = ''
      }
  }
};
</script>
<style scoped>
.createUser {
  border: 1px solid red;
  width: 300px;
  height: 200px;
  position: fixed;
  background: violet;
}
input::placeholder {
  padding: 3px;
  background: orange;
}
input {
  width: 240px;
  align-items: center;
}
</style>