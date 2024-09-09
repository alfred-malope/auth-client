import { createRouter, createWebHistory } from 'vue-router';
import SignUpPage from '../pages/SignUpPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import EmailVerificationPage from '../pages/EmailVerificationPage.vue';
import DashboardPage from '../pages/DashboardPage.vue';
import ForgotPasswordPage from '../pages/ForgotPasswordPage.vue';
import ResetPasswordPage from '../pages/ResetPasswordPage.vue';
import { useAuthStore } from '../stores/authStore';

const routes = [
  {
    path: '/',
    component: DashboardPage,
    meta: { requiresAuth: true, requiresVerification: true },
  },
  {
    path: '/signup',
    component: SignUpPage,
    meta: { redirectIfAuthenticated: true },
  },
  {
    path: '/login',
    component: LoginPage,
    meta: { redirectIfAuthenticated: true },
  },
  {
    path: '/verify-email',
    component: EmailVerificationPage,
  },
  {
    path: '/forgot-password',
    component: ForgotPasswordPage,
    meta: { redirectIfAuthenticated: true },
  },
  {
    path: '/reset-password/:token',
    component: ResetPasswordPage,
    meta: { redirectIfAuthenticated: true },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to handle authentication and redirection
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

//   if (authStore.isCheckingAuth) {
//     return next(false); // Prevent navigation until authentication check is complete
//   }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next('/login');
  }

  if (to.meta.requiresVerification && (!authStore.isAuthenticated || !authStore.user.isVerified)) {
    return next('/verify-email');
  }

  if (to.meta.redirectIfAuthenticated && authStore.isAuthenticated && authStore.user.isVerified) {
    return next('/');
  }

  next();
});

export default router;
