import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/LandingLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../pages/LandingPage.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/DefaultLayout.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../pages/DashboardPage.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'tickets',
          name: 'tickets',
          component: () => import('../pages/TicketPage.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/auth',
      component: () => import('../layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../pages/LoginPage.vue'),
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import('../pages/SignupPage.vue'),
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.user) {
    return { name: 'login' };
  }
});

export default router;