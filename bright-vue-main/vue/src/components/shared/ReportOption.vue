<template>
  <div class="main row p-1">
    <div class="col-10 row align-items-center position-relative bg-custom">
      <div class="col-2">
        <img class="img" :src="require(`@/assets/${imgSrc}`)" alt="PART ICON" />
      </div>

      <div class="col-10 position-absolute checkbox">
        <input
          type="checkbox"
          class="col-10 checkbox"
          name="check"
          @click="clicked($event.target)"
        />
      </div>

      <div class="col-8">
        <h3>{{ title }}</h3>
      </div>
    </div>

    <div class="col-2 bg-custom2">
      <router-link to="/learn">
        <img class="video" src="@/assets/video.png" alt="VIDEO LINK" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    imgSrc: String,
    link: String,
  },

  methods: {
    clicked(target) {
      this.$emit("clicked", target.checked);
      //console.log(target.checked);
      if (target.checked) {
        target.parentElement.parentElement.className += " selected";
      } else {
        target.parentElement.parentElement.className = target.parentElement.parentElement.className.replace(
          "selected",
          ""
        );
      }
    },
  },
};
</script>

<style scoped>
.ss {
  width: 100%;
  height: 100%;
  background-color: rgba(222, 184, 135, 0.287);
}

.main {
  margin-top: 2px;
}

.checkbox {
  width: 99%;
  height: 100%;
  opacity: 0;
}

.selected {
  background-color: #b3e656!important;
}

.bg-custom {
  background-color: #839b97;
}

.bg-custom2 {
  background-color: #d3d3d3;
}

h3 {
  color: white;
  font-size: 25px;
}

.img {
  height: 100px;
  padding: 10px;
}

.video {
  width: 80%;
  padding: 10px;
  box-sizing: border-box;
}
</style>
