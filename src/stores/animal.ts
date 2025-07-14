// src/stores/animal.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

interface Animal {
  id: number;
  nombre: string;
  descripcion: string;
  foto: string;
  estado: string;
}

export const useAnimalStore = defineStore('animal', () => {
  const animals = ref<Animal[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchAnimals() {
    loading.value = true;
    error.value = null;
    try {
      const res = await axios.get<Animal[]>(`${import.meta.env.VITE_API_URL}/animals`);
      animals.value = res.data;
    } catch (err) {
      console.error('Error al obtener animales', err);
      error.value = 'No se pudieron cargar los animales';
    } finally {
      loading.value = false;
    }
  }

  async function addAnimal(animal: Omit<Animal, 'id' | 'estado'>) {
    loading.value = true;
    error.value = null;
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/animals`, animal);
      await fetchAnimals(); // recarga la lista
    } catch (err) {
      console.error('Error al agregar animal', err);
      error.value = 'Error al agregar el animal';
    } finally {
      loading.value = false;
    }
  }

  return {
    animals,
    loading,
    error,
    fetchAnimals,
    addAnimal,
  };
});
