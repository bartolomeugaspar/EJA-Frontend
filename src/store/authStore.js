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
      set({
        error: error.response?.data?.message || 'Erro ao fazer login',
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
      set({
        error: error.response?.data?.message || 'Erro ao registrar',
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
  },

  // Limpar erro
  clearError: () => set({ error: null }),
}))
