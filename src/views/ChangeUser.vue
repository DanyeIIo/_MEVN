<template>
    <div style="padding:30px;">
        <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" v-model="newUser.oldUserEmail" class="form-control" id="oldEmail" aria-describedby="emailHelp1" placeholder="Active email">
        </div>
        <br>
        <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" v-model="newUser.email" class="form-control" id="newEmail" aria-describedby="emailHelp2" placeholder="New email">
        </div>        
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="newUser.password" class="form-control" id="newPassword" aria-describedby="emailHelp" placeholder="New password">
        </div>        
        <div class="form-group">
            <label for="text">Nickname</label>
            <input type="text" v-model="newUser.nickname" class="form-control" id="newNickname" aria-describedby="emailHelp" placeholder="New nickname">
        </div>
        <button type="submit" class="btn btn-primary" @click="changeUser()">Submit</button>
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

    name: "ChangeUser", 
    components: {
  },
  computed:mapState({
    users: state => state.users,
    // message: state => state.message
  }),
  data: () => {
      return {newUser: {email:null,nickname: null,password: null, oldUserEmail: null }}
  },
  methods: {
    async changeUser() {
        await this.$store.dispatch('changeUser',this.newUser);
      }
  }
};
</script>
<style scoped>
</style>