<template>
  <nav class="navContainer">
    <router-link to="/" class="title">MEDIUM</router-link>
    <div v-if="user" class="nav-link">
      <!-- navigations -->
      <router-link to="/">Blogs</router-link>
      <router-link to="/my-blogs">My Blogs</router-link>
      <router-link to="/add-blog">Add Blog</router-link>
      <button class="logout" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      user: false,
    };
  },
  methods: {
    // for the following pages there should not be any nav links.
    isLoggedIn() {
      this.user  = localStorage.getItem('user') ? true : false;
    },
    logout(){
      this.$router.push({path: '/login'});
      localStorage.removeItem('user');
    }
  },
  mounted() {
    this.isLoggedIn();
  },
};
</script>

<style scoped>
.title {
  font-weight: 600;
}
.navContainer {
  display: flex;
  height: 50px;
  background: #fff;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.nav-link > a {
  margin-right: 25px;
}
.logout{
  border: none;
  color: #fff;
  background-color: #42b983;
  border-radius: 2px;
}
</style>