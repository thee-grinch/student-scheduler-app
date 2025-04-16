import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../store/user';
import LandingPage from '../views/LandingPage.vue'
import DashboardLayout from '../views/DashboardLayout.vue';
import DashboardView from '../views/DashboardView.vue';
import EventsView from '../views/EventsView.vue';
import AssignmentsView from '../views/AssignmentsView.vue';
import CoursesView from '../views/CoursesView.vue';
import ScheduleView from '../views/ScheduleView.vue';
import NotesView from '../views/NotesView.vue';
import AIChatView from '../views/AIChatView.vue';
import SettingsView from '../views/SettingsView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const routes = [
  {
    path: '/',
    name: 'Landing Page',
    component: LandingPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: { requiresGuest: true }
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'Dashboard', component: DashboardView },
      { path: 'events', name: 'Events', component: EventsView },
      { path: 'assignments', name: 'Assignments', component: AssignmentsView },
      { path: 'courses', name: 'Courses', component: CoursesView },
      { path: 'schedule', name: 'Schedule', component: ScheduleView },
      { path: 'notes', name: 'Notes', component: NotesView },
      { path: 'ai-chat', name: 'AIChat', component: AIChatView },
      { path: 'settings', name: 'Settings', component: SettingsView }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'text-blue-600 dark:text-blue-400',
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  await userStore.initializeUser()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);

  // Check if the user is authenticated
  const isAuthenticated = !!userStore.token && !!userStore.user;

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } });
  } else if (requiresGuest && isAuthenticated) {
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});

export default router;