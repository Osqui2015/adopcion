<template>
  <q-page class="q-pa-md">

    <div class="row items-center justify-between q-mb-md">
      <h2 class="text-primary">
        <q-icon name="shield" class="q-mr-sm" />
        Panel de Administración
      </h2>
      <q-btn
        label="Cerrar sesión"
        color="negative"
        icon="logout"
        @click="logout"
        unelevated
        dense
      />
    </div>

    <q-banner class="bg-blue-1 text-blue-10 q-mb-md q-pa-md rounded-borders shadow-2">
      <q-icon name="info" class="q-mr-sm" />
      Desde este panel puedes aprobar, editar o rechazar animales, así como gestionar veterinarias registradas.
    </q-banner>

    <q-card flat bordered class="q-pa-md q-mb-md shadow-2">
      <q-table
        title="Animales pendientes de aprobación"
        :rows="animales"
        :columns="columns"
        row-key="id"
        flat
        bordered
        dense
        class="rounded-borders"
      >
        <template v-slot:body-cell-estado="props">
          <q-td>
            <q-badge
              :color="props.row.estado === 'pendiente' ? 'orange' : props.row.estado === 'aprobado' ? 'green' : 'red'"
              class="text-white"
            >
              {{ props.row.estado }}
            </q-badge>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td>
            <q-btn
              size="sm"
              color="positive"
              icon="check"
              label="Aprobar"
              flat
              @click="aprobarAnimal(props.row)"
            />
            <q-btn
              size="sm"
              color="negative"
              icon="close"
              label="Rechazar"
              flat
              @click="rechazarAnimal(props.row)"
            />
            <q-btn
              size="sm"
              color="primary"
              icon="edit"
              label="Editar"
              flat
              @click="editarAnimal(props.row)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-card flat bordered class="q-pa-md shadow-2">
      <div class="row items-center justify-between q-mb-md">
        <h5 class="text-primary">
          <q-icon name="local_hospital" class="q-mr-sm" />
          Gestión de Veterinarias
        </h5>
        <q-btn
          label="Agregar veterinaria"
          color="primary"
          icon="add"
          @click="veterinariaDialog = true"
          unelevated
        />
      </div>
    </q-card>

    <!-- Dialog veterinarias -->
    <q-dialog v-model="veterinariaDialog">
      <q-card style="max-width: 400px" class="q-pa-md">
        <q-card-section class="text-h6 text-primary">
          <q-icon name="add_business" class="q-mr-sm" />
          Nueva veterinaria
        </q-card-section>
        <q-card-section>
          <q-form @submit="guardarVeterinaria" class="q-gutter-md">
            <q-input v-model="veterinaria.nombre" label="Nombre" filled required />
            <q-input v-model="veterinaria.direccion" label="Dirección" filled />
            <q-input v-model="veterinaria.telefono" label="Teléfono" filled />
            <q-select
              v-model="veterinaria.provincia"
              label="Provincia"
              filled
              :options="provincias"
            />
            <q-toggle v-model="veterinaria.guardia" label="Atiende 24hs" />
            <div class="row justify-end q-gutter-sm q-mt-md">
              <q-btn type="submit" color="primary" label="Guardar" unelevated />
              <q-btn flat label="Cancelar" v-close-popup />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import type { QTableColumn } from 'quasar'

const router = useRouter()
const $q = useQuasar()

interface Animal {
  id: number
  nombre: string
  descripcion: string
  foto: string
  estado: string
}

const animales = ref<Animal[]>([
  {
    id: 1,
    nombre: 'Luna',
    descripcion: 'Mestiza joven, vacunada',
    foto: '',
    estado: 'pendiente'
  },
  {
    id: 2,
    nombre: 'Pepe',
    descripcion: 'Gato blanco, castrado',
    foto: '',
    estado: 'pendiente'
  }
])

const columns: QTableColumn[] = [
  { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left' },
  { name: 'descripcion', label: 'Descripción', field: 'descripcion', align: 'left' },
  { name: 'estado', label: 'Estado', field: 'estado', align: 'left' },
  { name: 'actions', label: 'Acciones', field: 'actions', align: 'right' }
]

// veterinaria
const veterinariaDialog = ref(false)
const provincias = ['Tucumán', 'Salta', 'Buenos Aires', 'Córdoba']
const veterinaria = ref({
  nombre: '',
  direccion: '',
  telefono: '',
  provincia: '',
  guardia: false
})

function aprobarAnimal(row: Animal) {
  row.estado = 'aprobado'
  $q.notify({ type: 'positive', message: `Animal ${row.nombre} aprobado` })
}
function rechazarAnimal(row: Animal) {
  row.estado = 'rechazado'
  $q.notify({ type: 'negative', message: `Animal ${row.nombre} rechazado` })
}
function editarAnimal(row: Animal) {
  $q.notify({
    type: 'info',
    message: `Aquí podrías abrir un editor para ${row.nombre}`
  })
}
function guardarVeterinaria() {
  $q.notify({
    type: 'positive',
    message: `Veterinaria ${veterinaria.value.nombre} registrada`
  })
  veterinariaDialog.value = false
  veterinaria.value = {
    nombre: '',
    direccion: '',
    telefono: '',
    provincia: '',
    guardia: false
  }
}
function logout() {
  localStorage.removeItem('admin_auth')
  void router.push('/admin-login')
}
</script>
