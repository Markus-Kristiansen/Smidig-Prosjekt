<template>
  <div class="main">
    <select
      v-if="campSelect"
      class="form-select"
      aria-label="Default select example"
      :value="selectedCampId"
      @input="change"
    >
      <option v-for="camp in camps" :key="camp._id" :value="camp._id" >{{
        camp.title
      }}</option>
    </select>

    <h3 v-if="!campSelect">{{ campTitle }}</h3>

    <br />
    <br />
    <side-bar-link class="link-item" title="PARTS" route-path="/parts" />
    <side-bar-link class="link-item" title="USERS" route-path="/users" />
    <side-bar-link class="link-item" title="REPAIRS" route-path="/repairs" />
  </div>
</template>

<script>
import SideBarLink from "../shared/SideBarLink.vue";

export default {
  components: {
    SideBarLink,
  },

  data() {
    return {
      camps: [],
      campSelect: false,
      campTitle: "",
      selectedCampId: ''
    };
  },

  async mounted() {
    if (JSON.parse(sessionStorage.session).access == 3) {
      this.campSelect = true;
      await this.getCamps();
      if (sessionStorage.selectedCampId == undefined) {
        sessionStorage.selectedCampId = this.camps[0]._id
        location.reload()
      } else {
        this.selectedCampId = sessionStorage.selectedCampId
      }

    } else {
      const campId = JSON.parse(sessionStorage.session).campId;
      const camp = await fetch(`/camp/${campId}`).then((response) =>
        response.json()
      );
      this.campTitle = camp.title;
    }
  },
  methods: {

    change(event) {
      sessionStorage.selectedCampId = event.target.value
      location.reload()
    },

    async getCamps() {
      this.camps = await fetch("/camp/all").then(async (response) => {
        if (response.status == 200) {
          return await response.json();
        } else {
          return [];
        }
      });
    },
  },
};
</script>

<style scoped>
.main {
  background-color: #839b97;
  width: 100%;
  overflow-y: auto;
}

h3 {
  padding-top: 10px;
  color: #f1f1f1;
}

h3:hover {
  color: orange;
  background-color: #839b97;
}

.link-item {
  text-decoration: none;
  color: #f1f1f1;
  padding: 25px;
}
</style>
