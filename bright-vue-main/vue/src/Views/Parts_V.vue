<template>
  <div>
    <side-bar />
    <form @submit.prevent="putParts" class="row parts-container justify-content-center p-5">
      <counter-c
        label="SunBell"
        :currentValue="camp.parts.sunbell"
        @newValue="(value) => (newPartCount.sunbell = value)"
      />
      <counter-c
        label="Led"
        :currentValue="camp.parts.led"
        @newValue="(value) => (newPartCount.led = value)"
      />
      <counter-c
        label="Solar Array"
        :currentValue="camp.parts.solarArray"
        @newValue="(value) => (newPartCount.solarArray = value)"
      />
      <counter-c
        label="Power Button"
        :currentValue="camp.parts.button"
        @newValue="(value) => (newPartCount.button = value)"
      />
      <counter-c
        label="Battery"
        :currentValue="camp.parts.battery"
        @newValue="(value) => (newPartCount.battery = value)"
      />

      <button type="submit" class="btn btn-success col-9">Send to server</button>
    </form>
  </div>
</template>

<script>
import SideBar from "../components/shared/SideBar.vue";

import CounterC from "../components/shared/CounterC.vue";

export default {
  components: {
    SideBar,
    CounterC,
  },
  data() {
    return {
      camp: { parts: {}, title: '' },
      newPartCount: {},
      camps: [],
      campSelect: false
    };
  },

  async mounted() {
    if (JSON.parse(sessionStorage.session).access == 3) {
      this.campSelect = true
    }
    if (sessionStorage.selectedCampId != undefined) {
      await this.getParts();
    }
  },

  methods: {
    async getParts() {
      this.camp = await fetch(`camp/${sessionStorage.selectedCampId}`, {
        headers: {
          token: JSON.parse(sessionStorage.session).token
        }
      }).then(
        async (response) => {
          if (response.status == 200) {
            return await response.json();
          } else {
            return {};
          }
        }
      );
      this.newPartCount.sunbell = this.camp.parts.sunbell
      this.newPartCount.led = this.camp.parts.led
      this.newPartCount.solarArray = this.camp.parts.solarArray
      this.newPartCount.button = this.camp.parts.button
      this.newPartCount.battery = this.camp.parts.battery
    },

    async putParts() {
      await fetch(`camp/${sessionStorage.selectedCampId}/parts`, {
        method: "PUT",
        headers: {
          token: JSON.parse(sessionStorage.session).token,
          sunbell: this.newPartCount.sunbell,
          led: this.newPartCount.led,
          solarArray: this.newPartCount.solarArray,
          button: this.newPartCount.button,
          battery: this.newPartCount.battery,
        },
      });
      await this.getParts();
    },
  },
};
</script>

<style scoped>
.parts-container {
  grid-column: 2 / -1;
  width: 100%;
  box-sizing: border-box;
  margin: 0
}

</style>
