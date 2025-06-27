<template>
  <q-card class="swipe-card">
    <q-img :src="foto" :alt="nombre" ratio="16/9" />

    <q-card-section>
      <div class="text-subtitle2 text-grey-7">Coincidencia de Palabras Clave</div>
      <q-linear-progress :value="0.9" color="positive" rounded class="q-mt-xs" />
      <div class="text-green text-bold q-mt-xs">90%</div>
    </q-card-section>

    <q-card-section>
      <div class="text-h6 text-primary">{{ nombre }}</div>
      <div class="text-caption text-grey-8">
        {{ tamaño }} | {{ edad }} | {{ sexo }}
      </div>
      <div class="q-mt-sm">
        {{ descripcion }}
      </div>
      <q-btn flat size="sm" label="Leer más..." color="primary" class="q-mt-sm" />
    </q-card-section>

    <q-card-actions align="around">
      <q-btn color="negative" label="No me interesa" @click="rechazar" />
      <q-btn color="positive" label="Me interesa" @click="aceptar" />
      <q-btn round color="secondary" icon="pets" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  nombre: string
  descripcion: string
  foto: string
  tamaño: string
  edad: string
  sexo: string
}>()

const emit = defineEmits<{
  (e: 'like', nombre: string): void
  (e: 'dislike', nombre: string): void
}>()

function aceptar() {
  console.log(`👉 Me interesa: ${props.nombre}`)
  emit('like', props.nombre)
}

function rechazar() {
  console.log(`👈 No me interesa: ${props.nombre}`)
  emit('dislike', props.nombre)
}
</script>

<style scoped>
.swipe-card {
  width: 340px;
  max-width: 90vw;
  margin: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  background: #fff;
  font-family: 'Roboto', sans-serif;
}
</style>
