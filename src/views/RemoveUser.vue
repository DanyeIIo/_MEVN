<template>
    <div style="padding:30px;">
        <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" v-model="removeUser.email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">F for your account</small>
        </div>
        <div class="form-group">
            <label for="pass">Password</label>
            <input type="password" v-model="removeUser.password" class="form-control" id="pass" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-primary" @click="deleteUser()">Submit</button>
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
    name: "RemoveUser", 
    components: {
  },
  computed:mapState({
    users: state => state.users,
    // message: state => state.message
  }),
  data: () => {
      return {removeUser: {email:null,password: null }}
  },
  methods: {
    async deleteUser() {
    //   this.$store.message = "AOAOAOAOAOAOAO";
        // console.log(this.removeUser.email);
        // console.log(this.removeUser.password);
        await this.$store.dispatch('removeUser',this.removeUser);
           
      }
  }
};
</script>
<style scoped>
</style>