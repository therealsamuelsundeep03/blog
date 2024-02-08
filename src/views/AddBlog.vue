<template>
  <navbar />
  <div class="add-blog">
    <h2>Add Blog</h2>
    <!-- form for add blog  -->
    <form @submit.prevent="submitForm">
      <div class="row g-2">
        <div class="col-md titleInp">
          <text-field
            label="Title"
            placeholder="Name of the post"
            type="text"
            name="title"
            v-model="title"
            @update:modelValue="handleInput"
            @validate="validateInput"
          />
          <span class="error-message">{{ titleError }}</span>
        </div>
        <div class="col-md selectInp">
          <select-field
            label="select a category"
            name="category"
            v-model="category"
            @update:modelValue="handleInput"
            @validate="validateInput"
          />
        </div>
      </div>
      <div class="post-md">
        <text-area-field
          name="blog"
          label="Write a post"
          v-model="blog"
          @update:modelValue="handleInput"
          @validate="validateInput"
        />
        <span class="error-message">{{ blogError }}</span>
      </div>
      <button type="submit" class="btn btn-primary" :disabled="loading">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import TextField from "@/components/TextField.vue";
import TextAreaField from "@/components/TextAreaField.vue";
import SelectField from "@/components/SelectField.vue";
import axios from "@/api/axios";

export default {
  components: { Navbar, TextField, TextAreaField, SelectField },
  name: "addBlog",
  data() {
    return {
      title: "",
      blog: "",
      category: "Development",
      titleError: "",
      blogError: "",
      categoryError: "",
      loading: false,
      login: false,
      error: "",
    };
  },
  methods: {
    // to handle the user input
    handleInput(name, value) {
      this.titleError = "";
      this.blogError = "";
      this.error = "";
      if (name === "blog") {
        this.blog = value;
      } else if (name === "title") {
        this.title = value;
      } else if (name === "category") {
        this.category = value;
      }
    },
    // to validate the input
    validateInput(name, value) {
      if (name === "title") {
        this.titleError = value.length > 0 ? "" : "Enter Title";
      } else if (name === "blog") {
        if (value?.length < 300) {
          this.blogError = "Must contain atleast 300 words";
        } else if (value?.length > 500000) {
          this.blogError = "Must contain 500000 words";
        } else {
          this.blogError = "";
        }
      }
    },
    async submitForm() {
      try {
        this.loading = true;
        if (!this.blog.length)
          return (this.blogError = "Must contain atleast 300 words");
        if (!this.title.length) return (this.titleError = "Enter Title");
        if (this.blogError === "" && this.titleError === "") {
          // get user from the localstorage to store the data in the backend
          let user = localStorage.getItem("user");
          const data = await axios.post("/blogs", {
            title: this.title,
            post: this.blog.replace(/\n/g, " \n\n "),
            category: this.category,
            user,
          });
          if (data.status) {
            alert("Blog added to the database");
            this.title = "";
            this.blog = "";
          }
        }
      } catch (error) {
        // handling error responses from the backend
        if (error.response.data.message === "Title is Required") {
          this.titleError = "Title is Required";
        } else if (error.response.data.message === "Post is Required") {
          this.blogError = "Post is Required";
        } else if (error.response.data.message === "category is Required") {
          this.categoryError = "category is Required";
        } else if (error.response.data.message === "Please login again") {
          this.login = true;
        } else if ((error.response.status = 500 || !error?.response?.message)) {
          this.error = "Please try again";
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.add-blog {
  margin: 40px;
}
.row {
  margin-top: 40px;
}
.titleInp {
  max-width: 300px;
}
.selectInp {
  max-width: 300px;
  /* margin-left: 40px; */
}
.error-message {
  color: red;
  font-size: 0.8rem;
}
.btn {
  margin-top: 30px;
  width: 100px;
}
</style>