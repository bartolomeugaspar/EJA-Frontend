import { create } from 'zustand'
import { authService } from '../services/authService'

export const useAuthStore = create((set) => ({
  user: authService.getCurrentUser(),
  isAuthenticated: authService.isAuthenticated(),
  isLoading: false,
  error: null,

  // Login
  login: async (credentials) => {
    set({ isLoading: true, error: null })
    try {
      const response = await authService.login(credentials)
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      })
      return response
    } catch (error) {
      let errorMessage = 'Erro ao fazer login'
      
      if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.'
      } else if (error.response?.data?.message) {
        // Usar a mensagem específica do backend (inclui "Conta desativada")
        errorMessage = error.response.data.message
      } else if (error.response?.status === 401) {
        errorMessage = 'E-mail ou senha incorretos. Verifique suas credenciais.'
      }
      
      set({
        error: errorMessage,
        isLoading: false,
      })
      throw error
    }
  },

  // Register
  register: async (userData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await authService.register(userData)
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      })
      return response
    } catch (error) {
      console.error('Erro completo de registro:', error)
      console.error('Resposta do servidor:', error.response?.data)
      
      let errorMessage = 'Erro ao registrar'
      
      if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.'
      } else if (error.response?.status === 400) {
        // Mostrar detalhes específicos do erro 400
        const details = error.response.data
        if (details.errors && Array.isArray(details.errors)) {
          errorMessage = details.errors.map(err => err.msg).join(', ')
        } else {
          errorMessage = details.message || 'Dados inválidos. Verifique os campos.'
        }
      } else if (error.response?.status === 409) {
        errorMessage = 'Este e-mail já está cadastrado. Tente fazer login.'
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      }
      
      set({
        error: errorMessage,
        isLoading: false,
      })
      throw error
    }
  },

  // Logout
  logout: () => {
    authService.logout()
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    })
    // Redirecionar para a home
    window.location.href = '/'
  },

  // Limpar erro
  clearError: () => set({ error: null }),
}))
