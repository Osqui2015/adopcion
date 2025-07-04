import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAdminStore = defineStore('admin', () => {
  const isAuth = ref(false);
  const error = ref<string | null>(null);
  const loading = ref(false);

  async function loginAdmin(credentials: { email: string; password: string }) {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, credentials);

      if (response.data.success) {
        localStorage.setItem('admin_auth', 'yes');
        isAuth.value = true;
      } else {
        error.value = response.data.mensaje || 'Credenciales inválidas';
        isAuth.value = false;
      }
    } catch {
      error.value = 'Error de conexión con el servidor';
      isAuth.value = false;
    } finally {
      loading.value = false;
    }
  }

  function logout() {
    localStorage.removeItem('admin_auth');
    isAuth.value = false;
  }

  return {
    isAuth,
    loginAdmin,
    logout,
    loading,
    error,
  };
});
