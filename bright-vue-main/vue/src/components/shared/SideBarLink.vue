<template>
  <router-link :to="routePath" class="link1">
      <h3>{{title}}</h3>
  </router-link>
</template>

<script>
export default {
  props: {
    title: String,
    routePath: String,
  },
};
</script>


<style scoped>

h3{

padding: 10px;

}

h3:hover{

background-color: #E6E6E6;
color: #555555;

}

</style>

