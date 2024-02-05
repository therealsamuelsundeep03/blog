<template>
  <navbar />
  <div v-if="loading" class="loading">Loading...</div>
  <div v-else class="all-blog">
    <h2>All Blogs</h2>
    <div class="row">
      <router-link
        v-for="blog in blogs"
        :key="blog._id"
        class="col-md-6 mb-4"
        :to="{ name: 'blog', params: { id: blog._id } }"
      >
        <div class="card">
          <div class="card-body d-flex flex-column justify-content-between flex-fill">
            <h2 class="card-title">{{ truncatePost(blog.title,50) }}</h2>
            <p class="card-text">{{ truncatePost(blog.post,300) }}</p>
            <p class="card-text category">{{ blog.category }}</p>
            <p class="card-text">Created by: {{ blog.userName }}</p>
            <p class="card-text">Date: {{ formatCreatedAt(blog.createdAt) }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "../api/axios";
import Navbar from "@/components/Navbar.vue";
export default {
  name: "allBlogs",
  components: { Navbar },
  data() {
    return {
      blogs: null,
      loading: true,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const { data } = await axios.get("/blogs");
        if (data.status) {
          this.blogs = data.blogs;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    truncatePost(post, min) {
      const maxLength = min;
      if (post.length > maxLength) {
        return post.substring(0, maxLength) + "...";
      }
      return post;
    },
    formatCreatedAt(createdAt) {
      const date = new Date(createdAt);
      return date.toLocaleString(); 
    },
  },
};
</script>

<style >
a {
  color: #111;
  text-decoration: none;
}
a:hover{
  color: #111;
}
.card-title{
  font-size: 1.3em;
}
.card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.loading {
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.all-blog {
  margin: 40px;
}
.row {
  margin-top: 40px;
}
.card-title {
  margin-bottom: 40px;
}
.category {
  background: #5072a7;
  color: #fff;
  padding: 10px;
  width: 30%;
  border-radius: 10px;
  text-align: center;
}
</style>