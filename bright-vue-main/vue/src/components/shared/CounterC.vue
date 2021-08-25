<template>
  <div class="col-4 p-2">
    <h3>{{ label }}</h3>

    <h5>Current: {{ currentValue }}</h5>

    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">New value</span>
      <input
        class="form-control"
        type="number"
        min="0"
        :value="currentValue"
        @input="$emit('newValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    currentValue: Number,
  },
};
</script>

<style scoped></style>
