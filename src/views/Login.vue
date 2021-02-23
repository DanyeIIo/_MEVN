<template>
    <div style="padding:30px;">
        <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" v-model="sign.email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group">
            <label for="pass">Password</label>
            <input type="password" v-model="sign.password" class="form-control" id="pass" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-primary" style= "background:lightblue" @click="login()" >Login</button>
    </div> 
</template>
<script>
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// import mapState from 'vuex';
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
export default {
  name: "CreateUser", 
  components: {
  },
//   computed:mapState({
//     message: "hi",
//   }),
  data: () => {
      return {sign: {email:null,password: null }}
  },
  methods: {
      async login() {
        let correct = this.$store.dispatch('login',this.sign);
           if(correct) {
               return true; // todo
           }
      }
  }
};
</script>
<style scoped>

</style>