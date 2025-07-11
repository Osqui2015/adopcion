<template>
  <q-page class="q-pa-md">
    <h2 class="text-h5 text-primary q-mb-md">🐾 Veterinarias cercanas</h2>

    <div class="q-gutter-sm q-mb-md">
      <q-select
        v-model="filtroProvincia"
        label="Provincia"
        :options="provincias"
        clearable
        dense
      />
      <q-select
        v-model="filtroZona"
        label="Zona"
        :options="zonas"
        clearable
        dense
      />
      <q-select
        v-model="filtroGuardia"
        label="Guardia 24hs"
        :options="['Sí', 'No']"
        clearable
        dense
      />
      <q-select
        v-model="filtroEspecialidad"
        label="Especialidad"
        :options="especialidades"
        clearable
        dense
      />
    </div>

    <q-list bordered separator>
      <q-item v-for="vet in veterinariasFiltradas" :key="vet.id">
        <q-item-section>
          <q-item-label class="text-bold">{{ vet.nombre }}</q-item-label>
          <q-item-label caption>{{ vet.direccion }}</q-item-label>
          <q-item-label caption>📞 {{ vet.telefono }}</q-item-label>
          <q-item-label caption>
            Provincia: {{ vet.provincia }} |
            Zona: {{ vet.zona }} |
            Guardia 24hs: {{ vet.guardia24hs ? 'Sí' : 'No' }} |
            Especialidades: {{ vet.especialidades.join(', ') }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <div v-if="veterinariasFiltradas.length === 0" class="text-grey q-mt-md">
      No se encontraron veterinarias con esos filtros.
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Veterinaria {
  id: number
  nombre: string
  direccion: string
  telefono: string
  provincia: string
  zona: string
  guardia24hs: boolean
  especialidades: string[]
}

const veterinarias: Veterinaria[] = [
  {
    id: 1,
    nombre: "Veterinaria San Martín",
    direccion: "San Martín 123, Tucumán",
    telefono: "0381-456789",
    provincia: "Tucumán",
    zona: "Centro",
    guardia24hs: true,
    especialidades: ["Clínica general", "Dermatología"]
  },
  {
    id: 2,
    nombre: "Animalia Vet",
    direccion: "Belgrano 456, Tucumán",
    telefono: "0381-123456",
    provincia: "Tucumán",
    zona: "Yerba Buena",
    guardia24hs: false,
    especialidades: ["Traumatología"]
  },
  {
    id: 3,
    nombre: "Mascotas Salud",
    direccion: "Lavalle 789, Salta",
    telefono: "0387-654321",
    provincia: "Salta",
    zona: "Centro",
    guardia24hs: true,
    especialidades: ["Oftalmología", "Clínica general"]
  }
]

const filtroProvincia = ref('')
const filtroZona = ref('')
const filtroGuardia = ref('')
const filtroEspecialidad = ref('')

const provincias = ["Tucumán", "Salta"]
const zonas = ["Centro", "Yerba Buena"]
const especialidades = [
  "Clínica general",
  "Dermatología",
  "Traumatología",
  "Oftalmología"
]

const veterinariasFiltradas = computed(() => {
  return veterinarias.filter(vet => {
    const coincideProvincia = !filtroProvincia.value || vet.provincia === filtroProvincia.value
    const coincideZona = !filtroZona.value || vet.zona === filtroZona.value
    const coincideGuardia = !filtroGuardia.value || (
      filtroGuardia.value === 'Sí' ? vet.guardia24hs : !vet.guardia24hs
    )
    const coincideEspecialidad = !filtroEspecialidad.value || vet.especialidades.includes(filtroEspecialidad.value)
    return coincideProvincia && coincideZona && coincideGuardia && coincideEspecialidad
  })
})

defineOptions({
  name: 'VeterinariasPage'
})

</script>
