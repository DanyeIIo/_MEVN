import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from '@/views/Users.vue';
import CreateUser from '@/views/CreateUser.vue';
import Login from '@/views/Login.vue';
import TodoList from '@/views/TodoList.vue';
import ChangeUser from '@/views/ChangeUser.vue';
import RemoveUser from '@/views/RemoveUser.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Users',
    component: Users
  },
  {
    path: '/CreateUser',
    name: 'CreateUser',
    component: CreateUser
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/TodoList',
    name: 'TodoList',
    component: TodoList
  },
  {
    path: '/ChangeUser',
    name: 'ChangeUser',
    component: ChangeUser
  },
  {
    path: '/RemoveUser',
    name: 'RemoveUser',
    component: RemoveUser
  }
]

const router = new VueRouter({
  routes
})

export default router
