// src/stores/adopcion.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

interface SolicitudAdopcion {
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
  mensaje: string;
  animal_id: number;
}

export const useAdopcionStore = defineStore('adopcion', () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const mensaje = ref<string | null>(null);

  async function enviarSolicitud(solicitud: SolicitudAdopcion) {
    loading.value = true;
    error.value = null;
    mensaje.value = null;
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/adopciones`, solicitud);
      mensaje.value = 'Solicitud enviada con éxito.';
    } catch (err) {
      console.error('Error al enviar solicitud', err);
      error.value = 'Error al enviar la solicitud de adopción';
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    error,
    mensaje,
    enviarSolicitud,
  };
});
