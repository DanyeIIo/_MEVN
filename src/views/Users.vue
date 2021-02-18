<template>
  <div>
    <CreateUser/>
    <DeleteChangeUser/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DeleteChangeUser from '@/components/DeleteChangeUser.vue';
import CreateUser from '@/components/CreateUser.vue';
//import { new_store } from "../store/index";
export default {
  name: "",
  components: {
    CreateUser,
    DeleteChangeUser,
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