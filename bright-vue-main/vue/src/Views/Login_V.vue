<template>
  <div>
    <form @submit.prevent="login" class="page-container">
      <div class="row justify-content-center p-5">
        <div class="col-10 col-sm-6 col-md-5">
          <input-c label="Username" type="text" @newValue="(value) => (username = value)" />

          <input-c label="Password" type="password" @newValue="(value) => (password = value)" />

          <button type="submit" class="btn btn-primary">Log in</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import md5 from "js-md5";
import InputC from "../components/shared/InputC.vue";

export default {
  components: {
    InputC,
  },

  data() {
    return {
      username: "",
      password: "",
    };
  },

  async created() {
    if (sessionStorage.session) {
      if (JSON.parse(sessionStorage.session).token != undefined) {
        this.jump();
      }
    }
  },

  methods: {
    jump() {
      if (JSON.parse(sessionStorage.session).alias) {
        this.$emit("login", JSON.parse(sessionStorage.session).alias);
      }

      switch (parseInt(JSON.parse(sessionStorage.session).access)) {
        case 1:
          this.$router.push({ path: "/report" });
          break;
        case 2:
          sessionStorage.selectedCampId = JSON.parse(
            sessionStorage.session
          ).campId;
          this.$router.push({ path: "/parts" });
          break;

        case 3:
          this.$router.push({ path: "/parts" });
          break;
        default:
          break;
      }
    },

    async login() {
      const data = await fetch("/login", {
        headers: { username: this.username, password: md5(this.password) },
      }).then(async function(response) {
        if (response.status == 200) {
          return await response.json();
        } else {
          return {};
        }
      });
      //TODO: If returned data is {} display "wrong pass/user" messaage
      sessionStorage.session = JSON.stringify(data);
      //console.log(`Logged in: ${sessionStorage.session}`);

      this.jump();
    },
  },
};
</script>

<style scoped>
.page-container {
  grid-column: 1 / -1;
}
</style>
