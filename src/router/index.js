import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Users from '../views/Users.vue';
import CreateUser from '@/views/CreateUser.vue';
import RemoveUser from '@/views/RemoveUser.vue';
import ChangeUser from '@/views/ChangeUser.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/users',
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
