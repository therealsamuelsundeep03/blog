<template>
  <navbar />
  <div v-if="loading" class="loading">Loading...</div>
  <div v-else class="blog">
    <div class="blog-head">
      <h2>{{ blog.title }}</h2>
      <div>
        <p>By: {{ blog.username }}</p>
        <p>Date: {{ formatCreatedAt(blog.createdAt) }}</p>
      </div>
    </div>
    <p>{{ blog.post }}</p>
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
    this.fetchData();
    console.log(this.blog);
  },
  methods: {
    async fetchData() {
      try {
        const blogId = this.$route.params.id;
        let user = localStorage.getItem('user');
        const { data } = await axios.get(
          `/blogs/${user}/${blogId}`
        );
        if (data.status) {
          this.blog = data.blog;
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
  text-align: left;
}
.blog-head{
    display: flex;
    justify-content: space-between;
}
.blog-head > div > p{
     margin: 10px;
     text-align: right;
}
</style>