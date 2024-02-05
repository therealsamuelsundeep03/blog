<template>
  <div>
    <label class="form-label">{{label}}</label>
    <select
      class="form-select form-select"
      @input="handleInput"
      @blur="validateInput"
    >
      <option value="Development">Development</option>
      <option value="Buisness">Buisness</option>
      <option value="Food">Food</option>
    </select>
  </div>
</template>

<script >
export default {
  name: "TextField",
  props: {
    modelValue: {
      type: String || Null,
      required: true,
      default: "Development"
    },
    label: {
      type: String,
      default: "Label",
    },
    name: {
      type: String,
    },
  },
  methods: {
    handleInput(event) {
      this.$emit("update:modelValue", this.name, event.target.value);
    },
    validateInput() {
      this.$emit("validate", this.name, this.modelValue);
    },
  },
};
</script>

<style>
</style>