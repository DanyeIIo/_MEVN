<template>
    <div style="padding:30px;">
        <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" v-model="addUser.email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
            <label for="pass">Password</label>
            <input type="password" v-model="addUser.password" class="form-control" id="pass" placeholder="Password">
        </div>
        <div class="form-group">
            <label for="nickname">Nickname</label>
            <input type="text" v-model="addUser.nickname" class="form-control" id="nickname" placeholder="Nickname">
        </div>
        <button type="submit" class="btn btn-primary" @click="createUser()" >Submit</button>
    </div> 
</template>
<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { mapState } from "vuex";
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
export default {
    name: "CreateUser", 
    components: {
  },
  computed:mapState({
    users: state => state.users,
    // message: state => state.message
  }),
  data: () => {
      return {addUser: {email:null,nickname: null,password: null }}
  },
  methods: {
    async createUser() {
    //   this.$store.message = "AOAOAOAOAOAOAO";
      await this.$store.dispatch('createUser',this.addUser);
           
      }
  }
};
</script>
<style scoped>
</style>