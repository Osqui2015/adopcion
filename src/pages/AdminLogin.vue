<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="q-pa-xl shadow-2" style="width: 350px;">
      <div class="text-center">
        <q-icon name="admin_panel_settings" size="56px" color="primary" />
        <h5 class="q-mt-md">Ingreso al Panel de Administración</h5>
      </div>
      <q-form @submit="login" class="q-gutter-md q-mt-lg">
        <q-input v-model="user" label="Usuario" filled />
        <q-input v-model="pass" label="Contraseña" type="password" filled />
        <q-btn type="submit" label="Ingresar" color="primary" class="full-width" />
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const user = ref('')
const pass = ref('')
const router = useRouter()
const $q = useQuasar()

function login() {
  if (user.value === 'admin' && pass.value === 'admin123') {
    localStorage.setItem('admin_auth', 'yes')
    $q.notify({
      type: 'positive',
      message: 'Bienvenido al panel de administración'
    })
    void router.push('/admin')
  } else {
    $q.notify({
      type: 'negative',
      message: 'Usuario o contraseña inválidos'
    })
  }
}
</script>
