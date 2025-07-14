import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/general/HomePage.vue') },

      // Página pública
      { path: 'about', component: () => import('src/pages/general/AboutApp.vue') },
      { path: 'quiero-adoptar', component: () => import('src/pages/adopcion/QuieroAdoptar.vue') },
      { path: 'veterinarias', component: () => import('src/pages/adopcion/Veterinarias.vue') },

      // Admin
      {
        path: 'admin',
        component: () => import('src/pages/admin/AdminPanel.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'admin-login',
        component: () => import('src/pages/admin/AdminLogin.vue'),
      },
      {
        path: 'admin/cargar-animal',
        component: () => import('src/pages/admin/animal/CargarAnimal.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'admin/cargar-veterinaria',
        component: () => import('src/pages/admin/veterinaria/CargarVeterinaria.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'admin/solicitudes',
        component: () => import('src/pages/admin/solicitudes/ListaSolicitudes.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },

  // Página 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/ErrorNotFound.vue'),
  },
];

export default routes;
