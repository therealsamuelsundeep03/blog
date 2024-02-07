<template>
  <navbar />
  <div v-if="loading" class="loading">Loading...</div>
  <div class="edit-blog">
    <h2>Edit Blog</h2>
    <!-- form  -->
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
      <button type="submit" class="btn btn-primary" :disabled = "loading">Submit</button>
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
  name: "edit-blog",
  data() {
    return {
      title: "",
      user: "",
      blog: "",
      category: "",
      id: null,
      blogId: null,
      titleError: "",
      blogError: "",
      categoryError: "",
      loading: false,
      login: false,
      error: "",
      loading: false
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    // fetching data
    async fetchData() {
      try {
        // set loading to true
        this.loading = true;
        const blogId = this.$route.params.id;
        this.user = localStorage.getItem("user");

        const { data } = await axios.get(`/blogs/blog/${blogId}`);
        console.log(data);
        // if we get the data then store it in the blog
        if (data.status) {
            this.title = data.blog.title;
            this.category = data.blog.category;
            this.blog = data.blog.post;
            this.id = data.blog._id;
            console.log(this.category);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    // to handle the input
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
        // this.loading = true
        if (!this.blog.length)
          return (this.blogError = "Must contain atleast 300 words");
        if (!this.title.length) return (this.titleError = "Enter Title");
        if (this.blogError === "" && this.titleError === "") {
          const blogId = this.$route.params.id;
          const { data } = await axios.put(`/blogs/${this.user}/${blogId}`, {
            title: this.title,
            post: this.blog,
            category: this.category,
          });

          if (data.status) {
            // if in backend the data is updated then send an alert message
            alert("Blog updated to the database");
            this.title = "";
            this.blog = "";
          }
        }
      } catch (error) {
        // handling the backend response
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
    closeModal() {
      this.modal = false;
    },
  },
};
</script>

<style>
.edit-blog {
  margin: 40px;
}
h2 {
  text-align: left;
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
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1050; /* Adjust as needed based on other z-index values in your project */
}
</style>