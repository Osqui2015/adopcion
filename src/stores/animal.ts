// src/stores/animal.ts
import { defineStore } from 'pinia';
import type { Animal } from 'src/types/Animal';
import * as animalService from 'src/services/animalService';

export const useAnimalStore = defineStore('animal', {
  state: () => ({
    animales: [] as Animal[],
    cargando: false,
  }),

  actions: {
    async cargarAnimales() {
      this.cargando = true;
      try {
        this.animales = await animalService.getAnimales();
      } catch (error) {
        console.error('Error cargando animales', error);
      } finally {
        this.cargando = false;
      }
    },

    async agregarAnimal(nuevo: Animal) {
      const creado = await animalService.crearAnimal(nuevo);
      this.animales.push(creado);
    },

    async eliminarAnimal(id: string) {
      await animalService.eliminarAnimal(id);
      this.animales = this.animales.filter((a) => a.id !== id);
    },
  },
});
