import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: 'cargar-animal', component: () => import('pages/CargarAnimal.vue') },
      { path: 'about', component: () => import('pages/AboutApp.vue') },
      { path: 'veterinarias', component: () => import('pages/Veterinarias.vue') },
      { path: 'quiero-adoptar', component: () => import('pages/QuieroAdoptar.vue') },
      {
        path: 'admin',
        component: () => import('pages/AdminPanel.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'admin-login',
        component: () => import('pages/AdminLogin.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
