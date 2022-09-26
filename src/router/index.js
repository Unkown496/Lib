import Vue from 'vue'
import VueRouter from 'vue-router'


// import const for vue optimization
const Index = () => import('@/views/Index.vue');
const Lib = () => import('@/views/Lib.vue');
const Login = () => import('@/views/Login.vue');
const User = () => import('@/views/User.vue');
const Cart = () => import('@/views/Market.vue');
const NotFound = () => import('@/views/NotFound.vue');
const Books = () => import('@/views/Books.vue');


Vue.use(VueRouter);


const routes = [
  {
    path: '/books/:id',
    name: Books,
    component: Books,
  },
  {
    path: '/notFound',
    name: NotFound,
    component: NotFound
  },
  {
    path: '/',
    name: 'Index',
    component: Index,
    alias: ["root"],
  },
  {
    path: '/lib',
    name: 'Library',
    component: Lib,
    alias: ["library", "book", "books", "Lib"],
  }, 
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/user',
    redirect: { path: '/login'}
  },
  {
    path: '/user/:userLogin/:userEmail',
    name: 'User',
    component: User,
    alias: ["cabinet", "user"],
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart
  }
];

const router = new VueRouter({
  routes
});

export default router;
