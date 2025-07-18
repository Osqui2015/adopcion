<template>
  <q-page class="q-pa-md">
    <h2>🐾 Formulario de Adopción</h2>

    <q-card class="q-pa-md" style="max-width: 500px; margin: auto">
      <q-card-section>
        <div class="text-h6">
          Formulario para adoptar a:
          <strong>{{ animal?.nombre || "..." }}</strong>
        </div>
        <div class="text-caption text-grey-7 q-mt-xs">
          {{ animal?.descripcion }}
        </div>
      </q-card-section>

      <q-form @submit.prevent="onSubmit" class="q-gutter-md">
        <q-input v-model="form.nombre" label="Tu nombre" required />
        <q-input v-model="form.email" label="Tu email" type="email" required />
        <q-input v-model="form.telefono" label="Teléfono de contacto" required />
        <q-input v-model="form.direccion" label="Dirección" />
        <q-input
          v-model="form.motivo"
          label="¿Por qué querés adoptarlo?"
          type="textarea"
        />

        <div class="row justify-end q-gutter-sm">
          <q-btn label="Enviar" type="submit" color="primary" :loading="loading" />
          <q-btn label="Cancelar" flat @click="volver" />
        </div>
      </q-form>

      <q-banner v-if="mensaje" class="bg-green-1 text-green-10 q-mt-md" rounded>
        {{ mensaje }}
      </q-banner>
      <q-banner v-if="error" class="bg-red-1 text-red-10 q-mt-md" rounded>
        {{ error }}
      </q-banner>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAnimalStore } from "src/stores/animal";
import { useAdopcionStore } from "src/stores/adopcion";
import type { Animal } from "src/types/Animal";

const route = useRoute();
const router = useRouter();

const animalId = Number(route.params.id);

const animalStore = useAnimalStore();
const adopcionStore = useAdopcionStore();

const form = ref({
  nombre: "",
  email: "",
  telefono: "",
  direccion: "",
  motivo: "",
});

const animal = computed<Animal | undefined>(() =>
  animalStore.animales.find((a) => a.id === animalId)
);

const loading = computed(() => adopcionStore.loading);
const mensaje = computed(() => adopcionStore.mensaje);
const error = computed(() => adopcionStore.error);

onMounted(async () => {
  if (!animal.value) {
    await animalStore.cargarAnimales();
  }
});

async function onSubmit() {
  if (!animal.value) {
    alert("No se encontró el animal seleccionado.");
    return;
  }

  const payload = {
    nombre: form.value.nombre,
    email: form.value.email,
    telefono: form.value.telefono,
    direccion: form.value.direccion,
    mensaje: form.value.motivo,
    animal_id: animal.value.id,
  };

  await adopcionStore.enviarSolicitud(payload);
}

function volver() {
  void router.push("/");
}
</script>
