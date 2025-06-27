<template>
  <q-page class="q-pa-md">
    <h2>📋 Registrar un nuevo animal en adopción</h2>
    <q-card class="q-pa-md" style="max-width: 500px; margin: auto;">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input v-model="animal.nombre" label="Nombre del animal" required />
        <q-input v-model="animal.descripcion" label="Descripción" type="textarea" />
        <q-input v-model="animal.foto" label="URL de la foto" required />
        <q-input v-model="animal.ubicacion" label="Ubicación (ciudad, barrio, etc.)" />
        <div class="row justify-end q-gutter-sm">
          <q-btn label="Guardar" type="submit" color="primary" />
          <q-btn label="Cancelar" flat @click="volver" />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const animal = ref({
  nombre: '',
  descripcion: '',
  foto: '',
  ubicacion: ''
})

function onSubmit() {
  console.log('📦 Animal registrado:', animal.value)
  alert(`Se cargó el animal ${animal.value.nombre} correctamente.`)
  void router.push('/')

}

function volver() {
  void router.push('/')

}
</script>
