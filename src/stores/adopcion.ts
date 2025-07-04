import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAdopcionStore = defineStore('adopcion', () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  interface SolicitudAdopcion {
    nombre: string;
    telefono: string;
    email: string;
    mensaje: string;
    animal_id: number;
  }

  async function enviarSolicitud(solicitud: SolicitudAdopcion) {
    loading.value = true;
    error.value = null;
    try {
      await axios.post('/api/adopciones', solicitud);
    } catch {
      error.value = 'Error al enviar la solicitud de adopción';
    } finally {
      loading.value = false;
    }
  }

  return {
    enviarSolicitud,
    loading,
    error,
  };
});
