<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="q-pa-xl shadow-2" style="width: 350px;">
      <div class="text-center">
        <q-icon name="admin_panel_settings" size="56px" color="primary" />
        <h5 class="q-mt-md">Ingreso al Panel de Administración</h5>
      </div>
      <q-form @submit.prevent="login" class="q-gutter-md q-mt-lg">
        <q-input
          v-model="user"
          label="Correo"
          filled
          type="email"
          :disable="loading"
          required
        />
        <q-input
          v-model="pass"
          label="Contraseña"
          type="password"
          filled
          :disable="loading"
          required
        />
        <q-btn
          type="submit"
          label="Ingresar"
          color="primary"
          class="full-width"
          :loading="loading"
        />
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAdminStore } from 'src/stores/admin'

const user = ref('')
const pass = ref('')
const router = useRouter()
const $q = useQuasar()

const adminStore = useAdminStore()

const loading = adminStore.loading

// observar errores del store
watch(() => adminStore.error, (val) => {
  if (val) {
    $q.notify({
      type: 'negative',
      message: val
    })
  }
})

// observar autenticación
watch(() => adminStore.isAuth, (val) => {
  if (val) {
    $q.notify({
      type: 'positive',
      message: 'Bienvenido al panel de administración'
    })
    void router.push('/admin')
  }
})

async function login() {
  await adminStore.loginAdmin({
    email: user.value,
    password: pass.value
  })
}
</script>
