<template>
  <q-page class="q-pa-md">
    <h2 class="text-primary">🐾 Solicitud de adopción</h2>

    <q-banner class="bg-blue-1 text-blue-10 q-mb-md">
      📝 Completá los datos para que podamos contactarte con animales disponibles según tu
      búsqueda.
    </q-banner>

    <q-card class="q-pa-md" style="max-width: 600px; margin: auto">
      <q-form @submit.prevent="onSubmit" class="q-gutter-md">
        <q-select
          v-model="solicitud.tipoAnimal"
          label="Tipo de animal"
          :options="tiposAnimales"
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
          required
        />

        <q-input v-model="solicitud.nombre" label="Tu nombre completo" required />
        <q-input v-model="solicitud.telefono" label="Teléfono de contacto" required />
        <q-input v-model="solicitud.email" type="email" label="Email" required />
        <q-input
          v-model="solicitud.comentario"
          type="textarea"
          label="Comentario adicional"
          autogrow
        />

        <div v-if="errores.length" class="text-negative q-mt-sm">
          <div v-for="err in errores" :key="err">⚠️ {{ err }}</div>
        </div>

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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { z } from "zod";

const router = useRouter();
const dialog = ref(false);
const errores = ref<string[]>([]);

const provincias = ["Tucumán", "Salta", "Córdoba", "Buenos Aires"];
const tiposAnimales = ["Perro", "Gato", "Conejo", "Loro"];

const solicitud = ref({
  tipoAnimal: "",
  tamaño: "",
  edad: "",
  provincia: "",
  nombre: "",
  telefono: "",
  email: "",
  comentario: "",
});

// 🧩 Esquema de validación con Zod
const esquema = z.object({
  tipoAnimal: z.string().min(1, "Seleccioná un tipo de animal"),
  tamaño: z.string().optional(),
  edad: z.string().optional(),
  provincia: z.string().min(1, "Seleccioná una provincia"),
  nombre: z.string().min(1, "El nombre es obligatorio"),
  telefono: z.string().min(1, "El teléfono es obligatorio"),
  email: z.string().email("Email inválido"),
  comentario: z.string().optional(),
});

function onSubmit() {
  const resultado = esquema.safeParse(solicitud.value);

  if (!resultado.success) {
    errores.value = resultado.error.issues.map((issue) => issue.message);
    return;
  }

  errores.value = [];
  console.log("📥 Solicitud de adopción:", resultado.data);
  dialog.value = true;
}

function volver() {
  void router.push("/");
}
</script>
