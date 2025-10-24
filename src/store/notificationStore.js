import { create } from 'zustand'
import { adminService } from '../services/adminService'

export const useNotificationStore = create((set, get) => ({
  unreadCount: 0,
  notifications: [],
  loading: false,

  // Buscar contagem de mensagens não lidas
  fetchUnreadCount: async () => {
    try {
      const response = await adminService.getContacts({ status: 'pendente' })
      const count = response.data?.length || 0
      set({ unreadCount: count })
      return count
    } catch (error) {
      console.error('Erro ao buscar notificações:', error)
      return 0
    }
  },

  // Incrementar contador quando nova mensagem chegar
  incrementUnreadCount: () => {
    set((state) => ({ unreadCount: state.unreadCount + 1 }))
  },

  // Resetar contador quando visualizar mensagens
  resetUnreadCount: () => {
    set({ unreadCount: 0 })
  },

  // Marcar como lida
  markAsRead: () => {
    set({ unreadCount: 0 })
  }
}))
