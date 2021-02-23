<template>
  <div class ="page">
      <div v-for="(user) in users" :key="user.id">
        <p>{{ user.email }}</p>
        <p>{{ user.nickname }}</p>
        
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//import { new_store } from "../store/index";
export default {
  name: "",
  components: {
  },
  computed:mapState({
    users: state => state.users,
    // message: state => state.message
  }),
  mounted() {
    this.$store.dispatch('getPosts'); // самый обычный axios
  }
};
</script>
<style scoped>
.page {
  background: gray;
  width: 100%;
}
</style> 