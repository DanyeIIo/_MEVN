<template>
    <div>
        <div v-for="(user,index) in users" :key="user.id">
            <p>{{ user.name }}</p>
            <p>{{ user.age }}</p>
            <button class="waves-effect green lighten-2 btn" type="button" @click="deleteUser(index)" style="align-items: center;margin-left: 10rem;">Delete</button>
            <button class="waves-effect green lighten-2 btn" type="button" @click="changeUser(index)" style="align-items: center;margin-left: 10rem;">Change</button>
            <input type="text" v-model ="user.name" maxlength="22" >
            <input type="text" v-model ="user.age" maxlength="2">
        </div>
  </div>
</template>

<script>
// import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
import { mapState } from "vuex";
// import GetUsers from '@/components/GetUsers.vue'
// import func   from '../../vue-temp/vue-editor-bridge';
//import { new_store } from "../store/index";
export default {
  name: "DeleteChangeUser",
    computed:mapState({
    users: state => state.users
  }),
  mounted() {
    this.$store.dispatch('getPosts');
  },
  methods: {
      async deleteUser(index) {
        this.$store.dispatch('deleteUser',index);
      },
      async changeUser(index) {
        this.$store.dispatch('changeUser',index); 
      }
  }
};
</script>
<style scoped>
.deleteUser {
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