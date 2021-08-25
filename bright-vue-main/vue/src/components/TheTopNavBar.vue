<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link to="/">
        <img src="../assets/Logo/logo.png" alt="" width="160" height="50" />
      </router-link>
      <div class="user">
        <img src="../assets/user-white.png" alt="" width="40" height="40" />
        <p id="alias" class="user-name">{{user}}</p>
      </div>

      <input type="button"  @click="logout" class="btn btn-danger" value="Log out">

    </div>
  </nav>
</template>

<script>
export default {
  props: {
    user: String,
  },

  created() {
    if (sessionStorage.session == undefined) {
      this.$router.push({ path: "/" });
    }
  },

  async mounted() {
    if (sessionStorage.session) {
      document.getElementById("alias").innerHTML = JSON.parse(sessionStorage.session).alias;
    } else {
      document.getElementById("alias").innerHTML = "Not logged in";
    }
    //console.log("TopNavBar mounted");
  },

  methods: {
    logout() {
      sessionStorage.clear()
      location.reload()
    }
  }
};
</script>

<style>
.navbar {
  background-color: #405c6a;
  width: 100%;
}

.user {
  display: flex;
  flex-direction: row;
  color: #f6f6f6;
}

.user-name {
  margin: auto;
  margin-left: 10px;
}
</style>
