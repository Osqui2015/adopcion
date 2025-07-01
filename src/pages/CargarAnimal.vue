<template>
  <q-page class="q-pa-md">

    <h2 class="text-primary">📋 Registrar un nuevo animal en adopción</h2>

    <q-banner class="bg-blue-1 text-blue-10 q-mb-md">
      📌 Recordá completar la mayor cantidad de datos posible para facilitar la adopción.
    </q-banner>

    <q-card class="q-pa-md" style="max-width: 600px; margin: auto;">
      <q-stepper
        v-model="paso"
        vertical
        color="primary"
        animated
      >
        <!-- PASO 1 -->
        <q-step :name="1" title="Datos generales" icon="pets">
          <q-form class="q-gutter-md">
            <q-input
              v-model="animal.nombre"
              label="Nombre"
              :rules="[val => !!val || 'Campo requerido']"
              required
            />
            <q-input
              v-model="animal.descripcion"
              label="Descripción"
              type="textarea"
            />
            <q-select
              v-model="animal.provincia"
              label="Provincia"
              :options="provincias"
              :rules="[val => !!val || 'Seleccionar provincia']"
              required
            />
            <q-select
              v-model="animal.tipo"
              label="Tipo de animal"
              :options="tiposAnimales"
              :rules="[val => !!val || 'Seleccionar tipo']"
              required
            />
            <q-select
              v-model="animal.edad"
              label="Edad"
              :options="edades"
              required
            />
            <q-input
              v-model="animal.ubicacion"
              label="Ubicación (barrio, calle, etc.)"
            />
          </q-form>
          <q-stepper-navigation>
            <q-btn @click="paso = 2" color="primary" label="Siguiente" />
          </q-stepper-navigation>
        </q-step>

        <!-- PASO 2 -->
        <q-step :name="2" title="Información de salud" icon="medical_services">
          <q-select
            v-model="animal.vacunacion"
            label="Vacunación"
            :options="['Completa', 'Incompleta', 'Desconocida']"
          />
          <q-select
            v-model="animal.castrado"
            label="Castrado"
            :options="['Sí', 'No', 'Desconocido']"
          />
          <q-select
            v-model="animal.compatibilidad"
            label="Compatibilidad"
            :options="['Con perros', 'Con gatos', 'Con niños', 'Con todos']"
            multiple
          />
          <q-input
            v-model="animal.peso"
            type="number"
            label="Peso aproximado (kg)"
          />
          <q-input
            v-model="animal.raza"
            label="Raza (opcional)"
          />
          <q-input
            v-model="animal.color"
            label="Color del pelaje"
          />
          <q-stepper-navigation>
            <q-btn @click="paso = 3" color="primary" label="Siguiente" />
            <q-btn flat @click="paso = 1" label="Volver" />
          </q-stepper-navigation>
        </q-step>

        <!-- PASO 3 -->
        <q-step :name="3" title="Fotos y confirmación" icon="photo_camera">
          <q-file
            v-model="archivoFoto"
            label="Subir foto"
            accept="image/*"
            filled
          />
          <div v-if="previewFoto" class="q-mt-md">
            <q-img
              :src="previewFoto"
              style="max-height: 200px;"
              spinner-color="primary"
            />
          </div>
          <q-separator class="q-my-md" />
          <div class="text-h6">Vista previa:</div>
          <q-card class="q-mt-sm">
            <q-card-section>
              <div class="text-bold">{{ animal.nombre }}</div>
              <div>{{ animal.descripcion }}</div>
              <div class="text-caption">
                {{ animal.tipo }} | {{ animal.edad }} | {{ animal.provincia }}
              </div>
              <div class="text-caption">
                Vacunación: {{ animal.vacunacion }} | Castrado: {{ animal.castrado }}
              </div>
            </q-card-section>
          </q-card>
          <q-stepper-navigation>
            <q-btn color="green" @click="onSubmit" label="Confirmar y guardar" />
            <q-btn flat @click="paso = 2" label="Volver" />
          </q-stepper-navigation>
        </q-step>

      </q-stepper>
    </q-card>

    <!-- carrusel para animales existentes en la provincia -->
    <div v-if="animalesFiltrados.length" class="q-mt-xl">
      <h5 class="text-primary">Animales ya registrados en {{ animal.provincia }}</h5>
      <q-carousel
        v-model="slideActivo"
        swipeable
        animated
        height="250px"
        class="bg-grey-2"
      >
        <q-carousel-slide
          v-for="(item, index) in animalesFiltrados"
          :name="index"
          :key="index"
        >
          <q-card class="q-pa-sm">
            <img :src="item.foto" alt="foto animal" style="max-height: 120px; object-fit: cover;" />
            <q-card-section>
              <div class="text-bold">{{ item.nombre }}</div>
              <div class="text-caption">{{ item.descripcion }}</div>
            </q-card-section>
          </q-card>
        </q-carousel-slide>
      </q-carousel>
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const paso = ref(1)
const slideActivo = ref(0)
const archivoFoto = ref<File | null>(null)
const previewFoto = ref<string | null>(null)

watch(archivoFoto, (file) => {
  if (file) {
    const reader = new FileReader()
    reader.onload = e => {
      previewFoto.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
})

const provincias = ["Tucumán", "Salta"]
const tiposAnimales = ["Perro", "Gato", "Loro", "Conejo"]
const edades = ["Cachorro", "Joven", "Adulto"]

const animal = ref({
  nombre: '',
  descripcion: '',
  provincia: '',
  tipo: '',
  edad: '',
  ubicacion: '',
  vacunacion: '',
  castrado: '',
  compatibilidad: [] as string[],
  peso: null as number | null,
  raza: '',
  color: ''
})

const animalesRegistrados = [
  {
    nombre: 'Luna',
    descripcion: 'Mestiza juguetona',
    foto: 'https://via.placeholder.com/300x200?text=Luna',
    provincia: 'Tucumán'
  },
  {
    nombre: 'Rex',
    descripcion: 'Cruza labrador sociable',
    foto: 'https://via.placeholder.com/300x200?text=Rex',
    provincia: 'Tucumán'
  },
  {
    nombre: 'Milo',
    descripcion: 'Gato travieso',
    foto: 'https://via.placeholder.com/300x200?text=Milo',
    provincia: 'Salta'
  }
]

const animalesFiltrados = computed(() => {
  return animal.value.provincia
    ? animalesRegistrados.filter(a => a.provincia === animal.value.provincia)
    : []
})

function onSubmit() {
  console.log('📦 Animal registrado:', {
    ...animal.value,
    imagen: archivoFoto.value?.name || 'sin foto'
  })
  alert(`✅ ${animal.value.nombre} fue cargado correctamente.`)
  void router.push('/')
}
</script>
