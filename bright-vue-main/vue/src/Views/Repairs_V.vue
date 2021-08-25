<template>
  <div>
    <side-bar  />

    <div class="page-container">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr>
              <th scope="col">User</th>
              <th scope="col">Time</th>
              <th scope="col">Repair</th>
              <th scope="col">Comment</th>
            </tr>
          </thead>

          <repair-item-c
            :repair="repair"
            v-for="repair in repairs"
            :key="repair._id"
          />
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/shared/SideBar.vue";
import RepairItemC from "../components/shared/RepairItemC.vue";

export default {
  components: {
    SideBar,
    RepairItemC,
  },
  data() {
    return {
      repairs: [
        { comment: "Hello" },
      ],
    };
  },
  async mounted() {
    this.repairs = await fetch(
      `/camp/${sessionStorage.selectedCampId}/repair/all`
    ).then(async (response) => {
      if (response.status == 200) {
        
        return await response.json();
      } else {
        return {};
      }
    });
  },
};
</script>

<style scoped>
.main {
  background-color: #839b97;
}

.page-container {
  grid-column: 2/-1;
  overflow-y: auto;
}
</style>
