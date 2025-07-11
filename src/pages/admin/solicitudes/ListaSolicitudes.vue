<template>
  <div class="p-6 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Cargar Veterinaria</h1>
    <form @submit.prevent="enviarFormulario" class="space-y-4">
      <div>
        <label class="block text-sm font-medium">Nombre</label>
        <input
          v-model="veterinaria.nombre"
          type="text"
          required
          class="w-full border rounded p-2"
        />
      </div>
      <div>
        <label class="block text-sm font-medium">Dirección</label>
        <input
          v-model="veterinaria.direccion"
          type="text"
          required
          class="w-full border rounded p-2"
        />
      </div>
      <div>
        <label class="block text-sm font-medium">Teléfono</label>
        <input
          v-model="veterinaria.telefono"
          type="text"
          required
          class="w-full border rounded p-2"
        />
      </div>
      <div>
        <label class="block text-sm font-medium">Horario</label>
        <input
          v-model="veterinaria.horario"
          type="text"
          required
          class="w-full border rounded p-2"
        />
      </div>

      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Guardar
      </button>
    </form>

    <div v-if="mensaje" class="mt-4 text-green-600 font-semibold">
      {{ mensaje }}
    </div>
    <div v-if="error" class="mt-4 text-red-600 font-semibold">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const veterinaria = ref({
  nombre: "",
  direccion: "",
  telefono: "",
  horario: "",
});

const mensaje = ref("");
const error = ref("");

const enviarFormulario = async () => {
  mensaje.value = "";
  error.value = "";
  try {
    const response = await axios.post("/api/veterinarias", veterinaria.value);
    mensaje.value = "Veterinaria cargada con éxito.";
    veterinaria.value = { nombre: "", direccion: "", telefono: "", horario: "" };
  } catch (e) {
    error.value = "Error al cargar la veterinaria.";
    console.error(e);
  }
};
</script>
