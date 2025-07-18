<template>
  <q-card class="animal-card q-mb-md">
    <q-img :src="animal.foto" ratio="16/9" />
    <q-card-section>
      <div class="text-h6 text-primary">{{ animal.nombre }}</div>
      <div class="text-caption">{{ animal.descripcion }}</div>
      <div class="text-grey">Edad: {{ animal.edad }} | Tamaño: {{ animal.tamaño }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
defineProps<{
  animal: {
    nombre: string;
    descripcion: string;
    foto: string;
    edad: string;
    tamaño: string;
  };
}>();
</script>

<style scoped>
.animal-card {
  max-width: 300px;
  margin: auto;
}
</style>
