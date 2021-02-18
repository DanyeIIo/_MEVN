<template>
  <div>
    <div v-for="user in users" :key="user.id">
      <GetUsers/>
      <p>{{ user.name }}</p>
      <p>{{ user.age }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import GetUsers from '@/components/GetUsers.vue'
//import { new_store } from "../store/index";
export default {
  name: "",
  components: {
    GetUsers,
  },
  computed:mapState({
    users: state => state.users
  }),
  mounted() {
    this.$store.dispatch('getPosts'); // самый обычный axios
  }
};
</script>
<style scoped>

</style>