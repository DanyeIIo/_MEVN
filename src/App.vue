<template>
  <div id="app">
    <nav class="stroke">
      <ul>
        <li><a><router-link to="/Login">Login</router-link></a></li>
        <li><a><router-link to="/">All users</router-link></a></li>
        <li><a><router-link to="/CreateUser">Create user</router-link></a></li>
        <li><a><router-link to="/ChangeUser">Change user</router-link></a></li>
        <li><a><router-link to="/RemoveUser">Remove user</router-link></a></li>
        <li><a><router-link to="/RemoveUser">Todo list</router-link></a></li>
      </ul>
    </nav>
    <router-view/>
  </div>
</template>
<script>

import Vue from 'vue';
// import BootstrapVue from "bootstrap-vue"
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
// Vue.use(BootstrapVue);
Vue.prototype.$appName = 'Моё приложение';
export default {
  name: "App",  
  }

</script>
<style>


* {
  margin:0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
nav {
  width: 100%;
  margin: 0 auto;
  background: rgb(0, 0, 0);
  padding: 0px;
  box-shadow: 0px 5px 0px #dedede;
}
nav ul {
  list-style: none;
  text-align: center;
}
nav ul li {
  display: inline-block;
}
nav ul li a {
  display: block;
  padding: 3px 10px;
  text-decoration: none;
  color: #aaa;
  font-weight: 800;
  text-transform: uppercase;
  margin: 0 0px;
}
nav ul li a,
nav ul li a:after,
nav ul li a:before {
  transition: all .5s;
}
nav ul li a:hover {
  color: #555;
  text-decoration: none;
}


nav.stroke ul li a,
nav.fill ul li a {
  position: relative;
}
nav.stroke ul li a:after,
nav.fill ul li a:after {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 0%;
  content: '.';
  color: transparent;
  background: #aaa;
  height: 1px;
}
nav.fill ul li a {
  transition: all 2s;
}

nav.fill ul li a:hover {
  color: #fff;
  z-index: 1;
}

</style>
