<template>
    <div>
        <div v-for="(user,index) in users" :key="user.id">
            <GetUsers/>
            <p>{{ user.name }}</p>
            <p>{{ user.age }}</p>
            <button class="waves-effect green lighten-2 btn" type="button" @click="deleteUser(index)" style="align-items: center;margin-left: 10rem;">Delete</button>
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
  name: "RemoveUser",
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
      async deleteUser(index) {
        // this.$store.dispatch('addUser'); // самый обычный axios
        // const {data ,status} = await app.delete('users/'+ id);
        this.$store.dispatch('deleteUser',index);
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