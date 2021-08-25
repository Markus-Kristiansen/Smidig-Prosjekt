<template>
  <div>
    <side-bar />
    <div class="list">
      <input
        type="button"
        value="New user"
        class="m-3 btn btn-success"
        @click="addUser = true"
      />
      <br />
      <input
        class="search"
        type="text"
        v-model="search"
        placeholder="Search..."
      />
      <user-link
        class="user-list"
        v-for="user in filteredUsers"
        :key="user._id"
        :alias="user.alias"
        @click="
          selectedUser = user;
          addUser = false;
        "
      />
    </div>
    <form @submit.prevent="postUser">
      <div v-if="addUser" class="p-5">
        <input-c
          @newValue="(value) => (newUser.alias = value)"
          label="Alias"
          type="text"
        />
        <input-c
          @newValue="(value) => (newUser.username = value)"
          label="Username"
          type="text"
        />
        <input-c
          @newValue="(value) => (newUser.password = value)"
          label="Password"
          type="password"
        />

        <div class="form-check form-switch col-3">
          <label class="form-check-label" for="flexSwitchCheckDefault"
            >Moderator</label
          >
          <input
            class="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            v-model="moderator"
          />
          
        </div>

        <input type="submit" class="btn btn-success" value="Add user" />
      </div>
      <div v-if="!addUser" class="p-5">
        <h3>{{ selectedUser.alias }}</h3>
        <h6 class="mb-3">{{ selectedUser.username }}</h6>
        <input-c
          v-if="selectedUser.username != undefined"
          label="New Password"
          @newValue="(value) => (newPassword = value)"
        />
        <input
          v-if="selectedUser.username != undefined"
          type="button"
          class="btn btn-success m-2"
          value="Reset Password"
          @click="updateUser"
        />
        <input
          v-if="selectedUser.username != undefined"
          type="button"
          class="btn btn-danger m-2"
          value="DELETE USER"
          @click="deleteUser"
        />
      </div>
    </form>
  </div>
</template>

<script>
import InputC from "../components/shared/InputC.vue";
import SideBar from "../components/shared/SideBar.vue";
import UserLink from "../components/shared/UserLink.vue";
import md5 from "js-md5";

export default {
  components: {
    SideBar,
    UserLink,
    InputC,
  },

  data() {
    return {
      search: "",
      users: [],
      addUser: false,
      selectedUser: {},
      newUser: {},
      newPassword: "",
      moderator: false
    };
  },

  async mounted() {
    //const campId = JSON.parse(sessionStorage.session).campId;
    this.users = await fetch(
      `/camp/${sessionStorage.selectedCampId}/user/all`
    ).then((response) => response.json());
  },

  methods: {
    async deleteUser() {
      if (confirm("Are you sure you want to delete?")) {
        const response = await fetch(
          `/camp/${sessionStorage.selectedCampId}/user/${this.selectedUser._id}`,
          {
            method: "DELETE",
            headers: {
              token: JSON.parse(sessionStorage.session).token,
            },
          }
        );
        if (response.status == 200) {
          alert("Deleted user!");
          location.reload();
        }
      }
    },

    async postUser() {
      if (this.moderator) {
        this.newUser.access = 2
      } else {
        this.newUser.access = 1
      }
      const response = await fetch(
        `/camp/${sessionStorage.selectedCampId}/user`,
        {
          method: "POST",
          headers: {
            token: JSON.parse(sessionStorage.session).token,
            username: this.newUser.username,
            alias: this.newUser.alias,
            access: this.newUser.access,
            password: md5(this.newUser.password),
          },
        }
      );
      if (response.status != 200) {
        alert(
          "That username is alreaddy in use, please choose a different username!"
        );
      } else if (response.status == 200) {
        alert("Added user!");
        location.reload();
      }
    },

    async updateUser() {
      const response = await fetch(`/user/${this.selectedUser._id}`, {
        method: "PUT",
        headers: {
          token: JSON.parse(sessionStorage.session).token,
          password: md5(this.newPassword),
        },
      });

      if (response.status == 200) {
        alert("Changed password!");
        location.reload();
      }

      //console.log(response);
    },
  },

  computed: {
    filteredUsers() {
      return this.users.filter((user) =>
        user.alias.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
.main {
  background-color: #839b97;
}

.page-container {
  grid-column: 1 / -1;
}

.search {
  margin-bottom: 50px;
}

.list {
  background-color: rgba(240, 248, 255, 0.582);
  border-right: solid 1px grey;
}
</style>
