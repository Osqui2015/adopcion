<template>
  <q-page class="q-pa-md bg-grey-2">
    <h2 class="text-primary text-center text-h4 q-mb-md">🐾 Adopción de Animales</h2>

    <!-- SELECCIONAR PROVINCIA -->
    <div class="q-mb-xl q-mt-lg row justify-center">
      <q-select
        v-model="provinciaSeleccionada"
        label="Seleccioná tu provincia"
        :options="provincias"
        outlined
        dense
        emit-value
        map-options
        style="min-width: 200px; max-width: 300px"
      />
    </div>

    <!-- FILTROS -->
    <div v-if="provinciaSeleccionada">
      <div class="row q-gutter-md justify-center q-mb-lg">
        <q-select
          v-model="filtroTipo"
          label="Tipo de animal"
          :options="tipos"
          clearable
          outlined
          dense
          style="min-width: 150px"
        />
        <q-select
          v-model="filtroTamaño"
          label="Tamaño"
          :options="tamaños"
          clearable
          outlined
          dense
          style="min-width: 150px"
        />
        <q-select
          v-model="filtroEdad"
          label="Edad"
          :options="edades"
          clearable
          outlined
          dense
          style="min-width: 150px"
        />
      </div>

      <!-- TARJETAS -->
      <div class="column items-center q-gutter-md">
        <SwipeCard
          v-for="animal in animalesFiltrados"
          :key="animal.id"
          :id="animal.id"
          :nombre="animal.nombre"
          :descripcion="animal.descripcion"
          :foto="animal.imagenUrl"
          :tamaño="animal.tamaño"
          :edad="animal.edad"
          :sexo="animal.sexo"
          @like="onLike"
          @dislike="onDislike"
        />
      </div>

      <div v-if="!animalesFiltrados.length" class="text-grey q-mt-lg text-center">
        No hay animales disponibles con esos filtros.
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import SwipeCard from "components/SwipeCard.vue";
import { ref, computed, onMounted } from "vue";
import { useSwipe } from "src/composables/useSwipe";
import { useAnimalStore } from "src/stores/animal";

const { aceptar, rechazar } = useSwipe();
const animalStore = useAnimalStore();

// Cargar animales desde el backend al montar
onMounted(async () => {
  await animalStore.cargarAnimales();
});

// Filtros
const provincias = ["Buenos Aires", "Córdoba", "Santa Fe", "Mendoza", "Salta", "Tucumán"];
const tipos = ["Perro", "Gato", "Loro"];
const tamaños = ["Pequeño", "Mediano", "Grande"];
const edades = ["Cachorro", "Joven", "Adulto"];

const provinciaSeleccionada = ref<string | null>(null);
const filtroTipo = ref<string | null>(null);
const filtroTamaño = ref<string | null>(null);
const filtroEdad = ref<string | null>(null);

// Filtrado dinámico
const animalesFiltrados = computed(() => {
  return animalStore.animales.filter((animal) => {
    return (
      animal.disponible &&
      animal.provincia === provinciaSeleccionada.value &&
      (!filtroTipo.value || animal.tipo === filtroTipo.value) &&
      (!filtroTamaño.value || animal.tamaño === filtroTamaño.value) &&
      (!filtroEdad.value || animal.edad === filtroEdad.value)
    );
  });
});

function onLike(id: number) {
  aceptar(id);
  animalStore.animales = animalStore.animales.filter((a) => a.id !== id);
}

function onDislike(id: number) {
  animalStore.animales = rechazar(id, animalStore.animales);
}
</script>
