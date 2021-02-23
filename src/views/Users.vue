<template style = "background:red">
  <div class ="page">
    <div class = "allblocks">
      <div  class = "block" v-for="(user,index) in users" :key="user.id">
          <p style="text-align:center; padding-top:5px 0px;margin:5px; border-bottom: 2px solid rgb(70, 70, 70); color:red;">User: {{index+1}}</p>
          <p class = "p" style="text-align:center;padding:2px;margin:0px; color:darkblue;">email:</p>
          <p class = "p" style="text-align:center;padding:0px;margin:0px; color:black;">{{ user.email }}</p>
          <p class = "p" style="text-align:center;padding:2px;margin:0px; color:darkblue;">nickname:</p>
          <p class = "p" style="text-align:center;padding:0px;margin:0px; color:black;">{{ user.nickname }}</p>
      </div>
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
    message: state => state.message
  }),
  mounted() {
    this.$store.dispatch('getPosts'); // самый обычный axios
  }
};
</script>
<style scoped>
.page {
  width: 100%;
  height: 100%;
}
.allblocks {
	display: flex;
	flex-wrap: wrap;
  padding: 3px;
}
.block {
  margin: 20px;
	height: 200px;
	width: 2  50px;
  padding:15px;
	border-radius: 30px;
	border: 3px solid #3d3d3d;
}
.block:hover
{
    margin:20px 35px;
    transform: scale(1.25);
}
.p:hover
{
    margin:20px 35px;
    transform: scale(1.25);
}
</style>