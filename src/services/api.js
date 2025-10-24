import axios from 'axios'

const API_URL = 'https://eja-backend.vercel.app/api'

// Criar instância do axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Só redirecionar para login se for erro 401 E não for uma tentativa de login/registro/inscrição
    const isAuthEndpoint = error.config?.url?.includes('/auth/login') || 
                          error.config?.url?.includes('/auth/register')
    const isPublicEndpoint = error.config?.url?.includes('/enroll')
    
    if (error.response?.status === 401 && !isAuthEndpoint && !isPublicEndpoint) {
      // Token inválido ou expirado em requisições autenticadas
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
