import { route } from 'quasar/wrappers';
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router';

import routes from './routes';

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // 🚀 Global Guard para proteger rutas de admin
  router.beforeEach((to, from, next) => {
    const isAuth = localStorage.getItem('admin_auth') === 'yes';

    if (to.meta.requiresAuth && !isAuth) {
      next('/admin-login');
      return;
    }
    next();
  });

  return router;
});
