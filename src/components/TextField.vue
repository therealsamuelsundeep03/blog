<template>
  <div>
    <label :for="name" class="form-label">{{ label }}</label>
    <input
      :id="name"
      :type="type"
      :value="modelValue"
      class="form-control"
      :name="name"
      :placeholder="placeholder"
      @input="handleInput"
      @blur="validateInput"
    />
  </div>
</template>

<script >
export default {
  name: "TextField",
  props: {
    modelValue: {
      type: String || Null,
      required: true,
    },
    label: {
      type: String,
      default: "Label",
    },
    placeholder: {
      type: String,
    },
    type: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  methods: {
    handleInput(event) {
      this.$emit("update:modelValue",this.name,event.target.value);
    },
    validateInput() {
      this.$emit("validate", this.name, this.modelValue);
    },
  },
};
</script>

<style>
</style>