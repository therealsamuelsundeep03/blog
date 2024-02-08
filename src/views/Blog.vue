<template>
  <navbar />
  <!-- page to view the blog content -->
  <div v-if="loading" class="loading">Loading...</div>
  <div v-else class="blog">
    <div class="blog-head">
      <h2>{{ blog.title }}</h2>
      <h6>{{blog.category}}</h6>
      <div>
        <p>By: {{ username }}</p>
        <p>Date: {{ formatCreatedAt(blog.createdAt) }}</p>
      </div>
    </div>

    <div v-html="formattedPost" class="post"></div>
  </div>
</template>

<script>
import axios from "../api/axios";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "blog",
  components: { Navbar },

  data() {
    return {
      blog: null,
      loading: true,
      username: null,
    };
  },
  mounted() {
    // fetching the data from the backend
    this.fetchData();
  },
  computed: {
     formattedPost() {
        console.log(this.blog.post.includes('\n'))
        return this.blog.post.replace(/\n/g, '<br />');
    }
  },
  methods: {
    async fetchData() {
      try {
        // get id from the all blog or my blog and fetch the blog from the backend
        const blogId = this.$route.params.id;
        const { data } = await axios.get(
          `/blogs/blog/${blogId}`
        );
        if (data.status) {
          this.blog = data.blog;
          this.blog.post.replace(/\n\n/g, '<br><br>');
          this.username = data.username;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    formatCreatedAt(createdAt) {
      const date = new Date(createdAt);
      return date.toLocaleString(); // Adjust the format as needed
    },
  },
};
</script>
<style>
.blog {
    margin: auto;
  margin-top: 80px;
  width: 85vw;
}
h2 {
  text-align: center;
  text-transform: uppercase;
}
.blog p {
  margin: auto;
  margin-top: 40px;
  text-align: justify;
}
.blog-head > div > p{
     margin: 10px;
     text-align: right;
}
.post{
  margin-top: 40px;
}
</style>