<template>
  <div>
    <div class="container page-container">
      <report-option
        title="BATTERY"
        link="/learnPage"
        img-src="battery.png"
        @clicked="(value) => (repair.battery = value)"
      />

      <report-option
        title="SOLAR PANEL"
        link="/learnPage"
        img-src="solar-panel5.png"
        @clicked="(value) => (repair.solar = value)"
      />
      <report-option
        title="LED LIGHTS"
        link="/learnPage"
        img-src="led-light.png"
        @clicked="(value) => (repair.led = value)"
      />
      <report-option
        title="POWER BUTTON"
        link="/learnPage"
        img-src="power-button.png"
        @clicked="(value) => (repair.power = value)"
      />

      <div class="row align-items-center justify-content-center p-4">

        <div class="col-10">
          <div class="input-group mb-3 input-group-lg">
            <span class="input-group-text" id="basic-addon1">Comment</span>
            <input
              type="text"
              class="form-control"
              placeholder="Sn - 230345-4352"
              v-model="repair.comment"
            />
            <button
              class="btn btn-success"
              type="button"
              id="button-addon2"
              @click="postRepair"
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReportOption from "../components/shared/ReportOption.vue";

export default {
  components: {
    ReportOption,
  },
  data() {
    return {
      repair: {
        led: false,
        solar: false,
        power: false,
        battery: false,
        comment: "",
      },
    };
  },
  methods: {
    async postRepair() {
      const session = JSON.parse(sessionStorage.session);
      await fetch(`/camp/${session.campId}/repair`, {
        method: "POST",
        headers: {
          user: session.alias,
          repair: JSON.stringify(this.repair),
          token: session.token,
        },
      });
      alert("Report sendt!")
      location.reload()
    },
  },
};
</script>

<style scoped>
.page-container {
  grid-column: 1 / -1;
}

</style>
