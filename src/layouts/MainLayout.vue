<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <!-- botón hamburguesa SOLO móviles -->
        <q-btn
          v-if="isMobile"
          flat
          dense
          round
          icon="menu"
          @click="toggleDrawer"
          class="q-mr-sm"
        />

        <q-toolbar-title>
          🐾 Adopción App
        </q-toolbar-title>

        <!-- links SOLO escritorio -->
        <div
          v-if="!isMobile"
          class="q-gutter-sm"
        >
          <q-btn flat dense label="Inicio" @click="goTo('/')" />
          <q-btn flat dense label="Cargar Animal" @click="goTo('/cargar-animal')" />
          <q-btn flat dense label="Acerca de" @click="goTo('/about')" />
          <q-btn flat dense label="Veterinarias" @click="goTo('/veterinarias')" />

        </div>
      </q-toolbar>
    </q-header>

    <!-- drawer SOLO en móviles -->
    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      overlay
      class="bg-grey-1"
    >
      <q-list>
        <q-item clickable v-ripple @click="goTo('/')">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Inicio</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goTo('/cargar-animal')">
          <q-item-section avatar>
            <q-icon name="add" />
          </q-item-section>
          <q-item-section>Cargar Animal</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goTo('/about')">
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>Acerca de</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goTo('/veterinarias')">
          <q-item-section avatar>
            <q-icon name="local_hospital" />
          </q-item-section>
          <q-item-section>Veterinarias</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const leftDrawerOpen = ref(false)
const router = useRouter()
const $q = useQuasar()

// breakpoint responsivo
const isMobile = computed(() => $q.screen.lt.md)

function toggleDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function goTo(path: string) {
  void router.push(path)
  leftDrawerOpen.value = false
}
</script>
