<template>
    <div>
        <div v-for="(user,index) in users" :key="user.id">
            <GetUsers/>
            <p>{{ user.name }}</p>
            <p>{{ user.age }}</p>
            <input type="text" v-model="user.name" maxlength="22"> <!--v-on:change = "changeUser(index)"-->
            <input type="text" v-model="user.age" maxlength="2" > <!--v-on:change = "changeUser(index)"-->
            <button class="waves-effect green lighten-2 btn" type="button" @click="changeUser(index)" style="align-items: center;margin-left: 10rem;">Change</button>
        </div>
  </div>
</template>

<script>
// import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
import { mapState } from "vuex";
import GetUsers from '@/components/GetUsers.vue'
// import GetUsers from '@/components/GetUsers.vue'
// import func   from '../../vue-temp/vue-editor-bridge';
//import { new_store } from "../store/index";

export default {
  name: "ChangeUser",
  components: {
    GetUsers,
  },
    computed:mapState({
    users: state => state.users
  }),
  mounted() {
    this.$store.dispatch('getPosts'); // самый обычный axios
  },
  methods: {
      async changeUser(index) {
        // // alert(this.$store.state.users[index].name + "\n" + this.users.age);//
        this.$store.dispatch('changeUser',index); // самый обычный axios
        // const {data ,status} = await app.put('users/'+ id,this.users[index]);
        // this.$store.dispatch('getPosts');
        // console.log(data);
        // console.log(status);
        // this.addUser.name = '',
        // this.addUser.name = ''
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