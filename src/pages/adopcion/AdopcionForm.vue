<template>
  <q-page class="q-pa-md">
    <h2>🐾 Formulario de Adopción</h2>
    <q-card class="q-pa-md" style="max-width: 500px; margin: auto;">
      <q-card-section>
        <div class="text-h6">Formulario para adoptar a: <strong>{{ nombreAnimal }}</strong></div>
      </q-card-section>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input v-model="form.nombre" label="Tu nombre" required />
        <q-input v-model="form.email" label="Tu email" type="email" required />
        <q-input v-model="form.telefono" label="Teléfono de contacto" required />
        <q-input v-model="form.direccion" label="Dirección" />
        <q-input v-model="form.motivo" label="¿Por qué querés adoptarlo?" type="textarea" />
        <div class="row justify-end q-gutter-sm">
          <q-btn label="Enviar" type="submit" color="primary" />
          <q-btn label="Cancelar" flat @click="volver" />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const nombreAnimal = (route.params.id as string) || 'Desconocido';

const form = ref({
  nombre: '',
  email: '',
  telefono: '',
  direccion: '',
  motivo: ''
})

function onSubmit() {
  console.log(`📨 Solicitud de adopción para ${nombreAnimal}`, form.value)
  // en la práctica podrías llamar a una API aquí
  alert(`Gracias por tu interés en adoptar a ${nombreAnimal}. Te contactaremos pronto.`)
  void router.push('/')

}

function volver() {
  void router.push('/')

}
</script>
