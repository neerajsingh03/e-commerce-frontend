<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <HeaderSection/>
  <router-view></router-view>
  <FooterSection/>
</template>

<script>
import FooterSection from './components/FooterSection.vue'
import HeaderSection from './components/HeaderSection.vue'


// import HelloWorld from './components/HelloWorld.vue'
// import HomePage from './pages/HomePage.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    HeaderSection,
    // HomePage,
    FooterSection,
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
