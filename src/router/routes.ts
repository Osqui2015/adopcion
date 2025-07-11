import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/general/HomePage.vue') },
      { path: 'cargar-animal', component: () => import('src/pages/admin/animal/CargarAnimal.vue') },
      { path: 'about', component: () => import('src/pages/general/AboutApp.vue') },
      { path: 'veterinarias', component: () => import('pages/Veterinarias.vue') },
      { path: 'quiero-adoptar', component: () => import('src/pages/adopcion/QuieroAdoptar.vue') },
      {
        path: 'admin',
        component: () => import('src/pages/admin/AdminPanel.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'admin-login',
        component: () => import('src/pages/admin/AdminLogin.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
