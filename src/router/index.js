import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue';
import Signin from '../views/Signin.vue';
import AddBlog from '../views/AddBlog.vue';
import AllBlogs from '../views/AllBlogs.vue';
import MyBlogs from '../views/MyBlogs.vue';
import Blog from '../views/Blog.vue'
import EditBlog from '../views/EditBlog.vue';

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
  // {
  //   path: '/signin',
  //   name: 'signin',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Signin.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
