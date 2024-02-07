import { createRouter, createWebHistory } from 'vue-router';
import { store } from '@/store';
import Login from '../views/Login.vue';
import Signin from '../views/Signin.vue';
import AddBlog from '../views/AddBlog.vue';
import AllBlogs from '../views/AllBlogs.vue';
import MyBlogs from '../views/MyBlogs.vue';
import Blog from '../views/Blog.vue'
import EditBlog from '../views/EditBlog.vue';
import Checkmail from '../views/Checkmail.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin
  },
  {
    path: '/check-mail',
    name: 'checkmail',
    component: Checkmail
  },
  {
    path: '/',
    name: 'allblogs',
    component: AllBlogs
  },
  {
    path: '/my-blogs',
    name: 'myblogs',
    component: MyBlogs
  },
  {
    path: '/blog/:id',
    name: 'blog',
    component: Blog,
  },
  {
    path: '/add-blog',
    name: 'addblog',
    component: AddBlog
  },
  {
    path: '/edit-blog/:id',
    name: 'editblog',
    component: EditBlog
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  if (to.name !== 'login' && to.name !== 'signin' && to.name !== 'checkmail' && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router
