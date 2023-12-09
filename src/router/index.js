import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Index.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/places',
    name: 'about',
    component: function () {
      return import('../views/Places.vue');
    },
  },
  {
    path: '/archive',
    name: 'archive',
    component: function () {
      return import('../views/Archive.vue');
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
