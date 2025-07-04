// src/boot/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // tu Laravel corre en puerto 8000
});

export default api;
