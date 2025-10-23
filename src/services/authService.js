import api from './api'

export const authService = {
  // Registro de novo usuário
  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  // Login
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    if (response.data.success) {
      const { token, user } = response.data.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    }
    return response.data
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  // Recuperar senha
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email })
    return response.data
  },

  // Redefinir senha
  resetPassword: async (token, newPassword) => {
    const response = await api.post('/auth/reset-password', {
      token,
      senha: newPassword,
    })
    return response.data
  },

  // Verificar se está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  },

  // Obter usuário atual
  getCurrentUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },
}
