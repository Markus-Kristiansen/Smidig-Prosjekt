<template>
  <div class="input-group mb-3">
    <span class="input-group-text" id="basic-addon1">{{ label }}</span>
    <input
      :type="type"
      required
      class="form-control"
      :value="value"
      @input="this.$emit('newValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {

  props: {
    label: String,
    type: String,
  },

  data() {
    return {
      value: "",
    };
  },
};
</script>
