// src/services/animalService.ts
import type { Animal } from 'src/types/Animal';
import api from 'boot/axios';

export const getAnimales = async (): Promise<Animal[]> => {
  const { data }: { data: Animal[] } = await api.get('/animales');
  return data;
};

export const crearAnimal = async (nuevo: Animal): Promise<Animal> => {
  const { data }: { data: Animal } = await api.post('/animales', nuevo);
  return data;
};

export const eliminarAnimal = async (id: string): Promise<void> => {
  await api.delete(`/animales/${id}`);
};
