<template>
  <q-layout view="hHh lpR fFf">
    <!-- HEADER -->
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          🐾 Adopción App
        </q-toolbar-title>

        <q-btn flat dense label="Inicio" @click="$router.push('/')" />
        <q-btn flat dense label="Cargar Animal" @click="$router.push('/cargar-animal')" />
        <q-btn flat dense label="Acerca de" @click="$router.push('/about')" />
      </q-toolbar>

    </q-header>


    <!-- PAGE CONTAINER -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">


</script>
