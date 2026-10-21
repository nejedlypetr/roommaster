import { useStore } from '@/store'
import axios from 'axios'

export const api = axios.create({
    baseURL: import.meta.env.VITE_BE_URL || 'http://localhost:8080/v1',
    headers: {
        'Content-Type': 'application/json',
    },
}) 

// Add authorization header to all requests
api.interceptors.request.use((config) => {
    const token = useStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})