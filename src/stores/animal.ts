import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from 'src/boot/axios';

export const useAnimalStore = defineStore('animal', () => {
  interface Animal {
    id: number;
    nombre: string;
    descripcion: string;
    foto: string;
    estado: string;
  }

  const animals = ref<Animal[]>([]);
  const loading = ref(false);

  async function fetchAnimals() {
    loading.value = true;
    try {
      const res = await api.get('/animals');
      animals.value = res.data;
    } catch (error) {
      console.error('Error al obtener animales', error);
    } finally {
      loading.value = false;
    }
  }

  async function addAnimal(animal: Animal) {
    try {
      await api.post('/animals', animal);
      await fetchAnimals(); // para refrescar la lista
    } catch (error) {
      console.error('Error al agregar animal', error);
    }
  }

  return { animals, loading, fetchAnimals, addAnimal };
});
