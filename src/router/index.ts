import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // Lazy-loaded when the route is visited
      component: () => import('../views/RealTimeView.vue'),
    },
  ],
});

export default router;
