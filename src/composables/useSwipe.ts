import { useRouter } from 'vue-router';
import type { Animal } from 'src/types/Animal';

export function useSwipe() {
  const router = useRouter();

  function aceptar(animalId: number) {
    console.log(`✅ Interesado en animal con ID: ${animalId}`);
    // router.push devuelve una Promise → esperarla
    router.push({ name: 'AdopcionForm', params: { id: animalId } }).catch((err) => {
      console.error('Error al redirigir:', err);
    });
  }

  function rechazar(animalId: number, animales: Animal[]) {
    console.log(`❌ Rechazado animal con ID: ${animalId}`);
    return animales.filter((a) => a.id !== animalId);
  }

  return { aceptar, rechazar };
}
