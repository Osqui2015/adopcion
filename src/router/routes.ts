import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // Páginas públicas
      { path: '', component: () => import('pages/general/HomePage.vue') },
      { path: 'about', component: () => import('pages/general/AboutApp.vue') },
      { path: 'quiero-adoptar', component: () => import('pages/adopcion/QuieroAdoptar.vue') },
      { path: 'veterinarias', component: () => import('pages/adopcion/Veterinarias.vue') },

      // ⚠️ NUEVA RUTA PARA EL FORMULARIO DE ADOPCIÓN INDIVIDUAL
      {
        path: 'adopcion-form/:id',
        name: 'AdopcionForm',
        component: () => import('pages/adopcion/AdopcionForm.vue'),
      },

      // Admin
      {
        path: 'admin',
        component: () => import('pages/admin/AdminPanel.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'admin-login',
        component: () => import('pages/admin/AdminLogin.vue'),
      },
      {
        path: 'admin/cargar-animal',
        component: () => import('pages/admin/animal/CargarAnimal.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'admin/cargar-veterinaria',
        component: () => import('pages/admin/veterinaria/CargarVeterinaria.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'admin/solicitudes',
        component: () => import('pages/admin/solicitudes/ListaSolicitudes.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },

  // Página 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
