<template>
  <navbar />
  <div v-if="loading" class="loading">Loading...</div>
  <div v-else class="view-blog">
    <!-- if delete icon is clicked then this modal will pop up -->
    <div v-if="modal" class="overlay">
      <div
        class="modal fade show"
        tabindex="-1"
        aria-labelledby="modalLabel"
        style="display: block"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabel">Delete Confirmation</h5>
              <button
                @click="closeModal"
                type="button"
                class="btn-close"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete this blog?</p>
            </div>
            <div class="modal-footer">
              <button @click="deleteBlog" type="button" class="btn btn-danger">
                Delete
              </button>
              <button
                @click="closeModal"
                type="button"
                class="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h2>My Blogs</h2>
    <!-- if there are no blogs -->
    <h3 v-if="!blogs?.length" class="no-blog">No Blogs</h3>
    <!-- looping trough the blogs -->
    <div class="row equal-height">
      <router-link
        v-for="blog in blogs"
        :key="blog._id"
        class="col-md-6 mb-4"
        :to="{ name: 'blog', params: { id: blog._id } }"
      >
        <div class="card h-100">
          <div class="card-body d-flex flex-column justify-content-between flex-fill">
            <h2 class="card-title">{{ truncatePost(blog.title,50) }}</h2>
            <p class="card-text">{{ truncatePost(blog.post,300) }}</p>
            <div class="footer">
              <div>
                <p class="card-text category">{{ blog.category }}</p>
                <p class="card-text">Created by: {{ username }}</p>
                <p class="card-text">
                  Date: {{ formatCreatedAt(blog.createdAt) }}
                </p>
              </div>
              <div class="icons">
                <span title="delete" @click.prevent="handleDelete(blog._id)">
                  <svg
                    class="icon delete"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                    />
                  </svg>
                </span>
                <!-- when clicked on edit icon then redirect to the view blog page -->
                <span @click.prevent="handleEdit(blog._id)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      class="icon edit"
                    >
                      <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                      <path
                        d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V299.6l-94.7 94.7c-8.2 8.2-14 18.5-16.8 29.7l-15 60.1c-2.3 9.4-1.8 19 1.4 27.8H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM549.8 235.7l14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-29.4 29.4-71-71 29.4-29.4c15.6-15.6 40.9-15.6 56.6 0zM311.9 417L441.1 287.8l71 71L382.9 487.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z"
                      />
                    </svg>
                </span>
              </div>
            </div>
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
  name: "myblogs",
  components: { Navbar },
  data() {
    return {
      blogs: null,
      user:null,
      username: null,
      loading: true,
      modal: false,
      id: null,
      edit: false,
      blog:null
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    // getting data from the backend
    async fetchData() {
      try {
        this.user  =localStorage.getItem('user');
        const { data } = await axios.get(`/blogs/${this.user}`);
        if (data.status) {
          this.blogs = data.blogs;
          this.username = data.username;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    // redirect to the page and pass the blog id
    handleEdit(id){
      this.$router.push({ name: 'editblog', params: { id } });
    },
    truncatePost(post,min) {
      const maxLength = min;
      if (post.length > maxLength) {
        return post.substring(0, maxLength) + "...";
      }
      return post;
    },
    formatCreatedAt(createdAt) {
      const date = new Date(createdAt);
      return date.toLocaleString(); // Adjust the format as needed
    },
    // function to open delete modal
    handleDelete(id) {
      this.modal = true;
      this.id = id;
    },
    // to delete a blog in the backend
    async deleteBlog() {
      try {
        const { data } = await axios.delete(
          `/blogs/${this.user}/${this.id}`
        );
        if (data.status) {
          this.blogs = this.blogs.filter(({ _id }) => _id !== this.id);
          this.modal = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // to close the modal
    closeModal() {
      this.id = null;
      this.modal = false;
    },
  },
};
</script>

<style >
.card {
  border-radius: 10px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
/* .equal-height {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
} */
.loading {
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.view-blog {
  margin: 40px;
  position: relative;
}
.row {
  margin-top: 40px;
}
.card-title {
  margin-bottom: 20px;
}
.icon {
  height: 15px;
  width: 15px;
  fill: #aaa;
}
.icons {
  position: absolute;
  right: 30px;
  z-index: 1;
  display: flex;
  gap: 10px;
  bottom: 30px;
}
.delete:hover {
  fill: red;
}
.edit:hover {
  fill: orange;
}
.modal {
  border: 2px solid #fff;
  border-radius: 10px;
  z-index: 2;
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
.footer{
  bottom: 30px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap:8px
}
.footer > div > .card-text{
  width:100%;
  margin: 8px
}
.category {
  background: #5072a7;
  color: #fff;
  padding: 5px;
  border-radius: 10px;
  font-size: 0.9rem;
  text-align: center;
}
.no-blog{
  margin-top: 60px;
}
</style>