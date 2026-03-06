import axios from 'axios'
import useAuthStore from '@/auth/AuthStore'


const api = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    'x-api-key': 'reqres_480246f9c6654330933adb0fbb00ca1b',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    return Promise.reject(error)
  }
)

export default api
