<template>
  <div id="main">
    <the-top-nav-bar :user="user"/>
    <router-view id="grid" @login="(user) => this.user = user"/>
  </div>
</template>

<script>
import TheTopNavBar from "./components/TheTopNavBar";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  components: { TheTopNavBar },
  name: "App",
  methods: {
    test() {
      //console.log("tetst")
    }
  },
  data() {
    return {
      user: 'Not logged in'
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-size: cover;
  margin: 0;
  height: 100%;
}

#main {
  position: absolute;
  display: grid;
  grid-auto-rows: 5em auto;
  height: 100%;
  width: 100%;
}

#grid {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 15em 20em auto;
}

</style>
