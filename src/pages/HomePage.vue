<template>
  <q-page class="q-pa-md bg-grey-2">

    <h2 class="text-primary text-center text-h4 q-mb-md">
      🐾 Adopción de Animales
    </h2>

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
        style="min-width: 200px; max-width: 300px;"
      />
    </div>


    <!-- SOLO MUESTRA FILTROS SI HAY PROVINCIA -->
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

      <div class="column items-center q-gutter-md">
        <div v-for="animal in animalesFiltrados" :key="animal.id">
          <SwipeCard
            :nombre="animal.nombre"
            :descripcion="animal.descripcion"
            :foto="animal.foto"
            :tamaño="animal.tamaño"
            :edad="animal.edad"
            :sexo="animal.sexo"
            @like="onLike"
            @dislike="onDislike"
          />
        </div>
      </div>
    </div>

  </q-page>
</template>

<script setup lang="ts">
import SwipeCard from 'components/SwipeCard.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

interface Animal {
  id: number
  nombre: string
  descripcion: string
  foto: string
  tamaño: string
  edad: string
  sexo: string
  tipo: string
  provincia: string
}

const router = useRouter()

// provincias simuladas
const provincias = [
  'Buenos Aires', 'Córdoba', 'Santa Fe', 'Mendoza', 'Salta', 'Tucumán'
]
const provinciaSeleccionada = ref<string | null>(null)

// filtros
const tipos = ['Perro', 'Gato', 'Loro']
const tamaños = ['Pequeño', 'Mediano', 'Grande']
const edades = ['Cachorro', 'Joven', 'Adulto']

const filtroTipo = ref<string | null>(null)
const filtroTamaño = ref<string | null>(null)
const filtroEdad = ref<string | null>(null)

// datos
const animales = ref<Animal[]>([
  {
    id: 1,
    nombre: 'Luna',
    descripcion: 'Muy cariñosa y juguetona.',
    foto: 'https://via.placeholder.com/300x200?text=Luna',
    tamaño: 'Mediano',
    edad: 'Joven',
    sexo: 'Hembra',
    tipo: 'Perro',
    provincia: 'Buenos Aires'
  },
  {
    id: 2,
    nombre: 'Milo',
    descripcion: 'Cachorro activo, ideal para paseos.',
    foto: 'https://via.placeholder.com/300x200?text=Milo',
    tamaño: 'Pequeño',
    edad: 'Cachorro',
    sexo: 'Macho',
    tipo: 'Gato',
    provincia: 'Córdoba'
  },
  {
    id: 3,
    nombre: 'Loro Pepe',
    descripcion: 'Muy parlanchín y sociable.',
    foto: 'https://via.placeholder.com/300x200?text=Loro',
    tamaño: 'Pequeño',
    edad: 'Adulto',
    sexo: 'Macho',
    tipo: 'Loro',
    provincia: 'Tucumán'
  }
])

// filtrado
const animalesFiltrados = computed(() => {
  return animales.value.filter(animal => {
    return (
      animal.provincia === provinciaSeleccionada.value &&
      (!filtroTipo.value || animal.tipo === filtroTipo.value) &&
      (!filtroTamaño.value || animal.tamaño === filtroTamaño.value) &&
      (!filtroEdad.value || animal.edad === filtroEdad.value)
    )
  })
})

function onLike(nombre: string) {
  console.log(`💚 Adoptar: ${nombre}`)
  setTimeout(() => {
    animales.value = animales.value.filter(a => a.nombre !== nombre)
    void router.push(`/adoptar/${nombre}`)
  }, 300)
}

function onDislike(nombre: string) {
  console.log(`💔 No interesado en: ${nombre}`)
  setTimeout(() => {
    animales.value = animales.value.filter(a => a.nombre !== nombre)
  }, 300)
}
</script>
