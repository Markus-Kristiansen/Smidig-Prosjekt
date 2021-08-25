<template>
  <div class="col-5">

    <div class="heading align-items-center">
        <h3>{{ title }}</h3>
        <img :src="require(`@/assets/${imgSrc}`)" alt="PART ICON">
    </div>

          <iframe
              class="video"
            :src="videoUrl"
            title="YouTube video player"
            frameborder="0"
            allowfullscreen
          ></iframe>
    </div>
</template>

<script>
export default {
  props: {
    title: String,
    imgSrc: String,
    videoUrl: String,
  },
};
</script>



<style scoped>
  
.heading{

display: flex;
justify-content: center;
align-items: center;

}

    h3{

        color: white;
      
    }

    .video {
        width: 100%;
        min-height: 300px;
        border: 5px solid #C3DC93;
    }

    img{

      height: 40px;
      margin: 20px;

    }
</style>
