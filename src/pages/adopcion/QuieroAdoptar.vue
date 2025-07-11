<template>
  <q-page class="q-pa-md">

    <h2 class="text-primary">🐾 Solicitud de adopción</h2>

    <q-banner class="bg-blue-1 text-blue-10 q-mb-md">
      📝 Completá los datos para que podamos contactarte con animales disponibles según tu búsqueda.
    </q-banner>

    <q-card class="q-pa-md" style="max-width: 600px; margin: auto;">
      <q-form @submit="onSubmit" class="q-gutter-md">

        <q-select
          v-model="solicitud.tipoAnimal"
          label="Tipo de animal"
          :options="tiposAnimales"
          :rules="[val => !!val || 'Campo requerido']"
          required
        />
        <q-select
          v-model="solicitud.tamaño"
          label="Tamaño deseado"
          :options="['Pequeño', 'Mediano', 'Grande']"
          clearable
        />
        <q-select
          v-model="solicitud.edad"
          label="Edad deseada"
          :options="['Cachorro', 'Joven', 'Adulto']"
          clearable
        />
        <q-select
          v-model="solicitud.provincia"
          label="Provincia"
          :options="provincias"
          :rules="[val => !!val || 'Campo requerido']"
          required
        />

        <q-input
          v-model="solicitud.nombre"
          label="Tu nombre completo"
          :rules="[val => !!val || 'Campo requerido']"
          required
        />
        <q-input
          v-model="solicitud.telefono"
          label="Teléfono de contacto"
          :rules="[val => !!val || 'Campo requerido']"
          required
        />
        <q-input
          v-model="solicitud.email"
          type="email"
          label="Email"
          :rules="[val => !!val || 'Campo requerido']"
          required
        />
        <q-input
          v-model="solicitud.comentario"
          type="textarea"
          label="Comentario adicional"
          autogrow
        />

        <div class="row justify-end q-gutter-sm">
          <q-btn type="submit" color="primary" label="Enviar solicitud" />
          <q-btn flat label="Cancelar" @click="volver" />
        </div>

      </q-form>
    </q-card>

    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section class="text-h6 text-positive">
          ✅ Solicitud enviada
        </q-card-section>
        <q-card-section>
          Gracias {{ solicitud.nombre }}, te contactaremos pronto.
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const dialog = ref(false)

const provincias = ["Tucumán", "Salta", "Córdoba", "Buenos Aires"]
const tiposAnimales = ["Perro", "Gato", "Conejo", "Loro"]

const solicitud = ref({
  tipoAnimal: '',
  tamaño: '',
  edad: '',
  provincia: '',
  nombre: '',
  telefono: '',
  email: '',
  comentario: ''
})

function onSubmit() {
  console.log('📥 Solicitud de adopción:', solicitud.value)
  dialog.value = true

  // aquí podrías guardar en LocalStorage o enviar a un backend
  // localStorage.setItem('solicitudesAdopcion', JSON.stringify(solicitud.value))
}

function volver() {
  void router.push('/')
}
</script>
