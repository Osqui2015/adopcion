import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: 'adoptar/:id', component: () => import('pages/AdopcionForm.vue') },
      { path: 'cargar-animal', component: () => import('pages/CargarAnimal.vue') },
      { path: 'about', component: () => import('pages/AboutPage.vue') },
    ],
  },

  // Siempre dejar esta al final
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
