// src/stores/veterinaria.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export interface Veterinaria {
  id?: number;
  nombre: string;
  direccion: string;
  telefono: string;
  provincia: string;
  guardia: boolean;
}

export const useVeterinariaStore = defineStore('veterinaria', () => {
  const veterinarias = ref<Veterinaria[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchVeterinarias() {
    loading.value = true;
    error.value = null;
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/veterinarias`);
      // asumimos que el backend devuelve un array de veterinarias
      veterinarias.value = res.data as Veterinaria[];
    } catch (err) {
      console.error('Error al obtener veterinarias', err);
      error.value = 'No se pudieron obtener las veterinarias.';
    } finally {
      loading.value = false;
    }
  }

  return {
    veterinarias,
    loading,
    error,
    fetchVeterinarias,
  };
});
