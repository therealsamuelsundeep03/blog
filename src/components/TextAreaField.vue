<template>
  <div>
    <div class="form-floating">
      <textarea
        :id="name"
        :value="modelValue"
        class="form-control"
        :name="name"
        @input="handleInput"
        @blur="validateInput"
      ></textarea>
      <label for="floatingTextarea">{{ label }}</label>
    </div>
  </div>
</template>

<script >
export default {
  name: "TextAreaField",
  props: {
    modelValue: {
      type: String || Null,
      required: true,
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
<style scoped>
.form-control {
  height: 40vh;
  width: 80vw;
  margin-top: 50px;
}
</style>