<template>
  <div class ="page">
    <p style="padding:2px 25px;">email: {{ users[0].email }}</p>
    <p style="padding:2px 25px;">nickname: {{ users[0].nickname }}</p>
    <p style = "border-bottom: 2px solid rgb(70, 70, 70); color:red;"></p>
    <div class="input-group mb-3" style="padding:5px 30px">
      <input type="text" required v-model="newTodoList.todo" class="form-control" placeholder="add todo" aria-label="todo" aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" @click="addList()">Button</button>
      </div>
    </div>
    <p style = "border-bottom: 2px solid rgb(70, 70, 70); color:red;"></p>        
    <div v-for="(todo,index) in users[0].todo" :key="todo" class="inputs">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <input type="checkbox" @click="changeList(index)" v-model="todo.status" aria-label="Checkbox for following text input">
          </div>
        </div>
        <input type="text" @click="changeList(index)" required v-model="todo.list" class="form-control" aria-label="Text input with checkbox">
        <button type="button" @click="removeList(index)" class="btn btn-dark">kill</button>
      </div> 
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue)
//import { new_store } from "../store/index";
export default {
  name: "",
  components: {
  },
  computed:mapState({
    users: state => state.users
    // message: state => state.message
  }),
  data: () => {
    return {newTodoList: {todo:null}}
  },
  methods: {
    async addList() {
      await this.$store.dispatch('addList',this.newTodoList);
      this.$store.dispatch('getPosts');
    },
    async changeList(index) {
      await this.$store.dispatch('changeList',index);  
    },
    async removeList(index) {
      await this.$store.dispatch('removeList',index);  
    }
  },
  mounted() {
    this.$store.dispatch('getPosts'); // самый обычный axios
  }
  
};
</script>
<style scoped>
.page {
  width: 100%;
}
p {
  color:blueviolet;
}
.inputs {
  padding: 5px 5rem;
}
</style> 