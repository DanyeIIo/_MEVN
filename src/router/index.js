import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from '../views/Users.vue';
import CreateUser from '@/views/CreateUser.vue';
import RemoveUser from '@/views/RemoveUser.vue';
import ChangeUser from '@/views/ChangeUser.vue';
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
    path: '/RemoveUser',
    name: 'RemoveUser',
    component: RemoveUser
  },
  {
    path: '/ChangeUser',
    name: 'ChangeUser',
    component: ChangeUser
  }
]

const router = new VueRouter({
  routes
})

export default router
