<template>
  <div>
    <div class="page-container">
      <div class="main row justify-content-center g-5 p-3 ">
        <video-card
          title="BATTERY"
          videoUrl="https://www.youtube.com/embed/PK7g180smjo"
          img-src="battery.png"
        />
        <video-card
          title="SOLAR PANEL"
          videoUrl="https://www.youtube.com/embed/PK7g180smjo"
          img-src="solar-panel5.png"
        />
        <video-card
          title="LED LIGHS"
          videoUrl="https://www.youtube.com/embed/PK7g180smjo"
          img-src="led-light.png"
        />
        <video-card
          title="POWER BUTTON"
          videoUrl="https://www.youtube.com/embed/PK7g180smjo"
          img-src="power-button.png"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VideoCard from "../components/shared/VideoCard.vue";

export default {
  components: {
    VideoCard,
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
</style>
