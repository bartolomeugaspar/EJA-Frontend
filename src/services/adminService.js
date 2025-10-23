import api from './api'

export const adminService = {
  // Dashboard
  getDashboard: async () => {
    const response = await api.get('/reports/dashboard')
    return response.data
  },

  // Usuários
  getUsers: async (params) => {
    const response = await api.get('/users', { params })
    return response.data
  },

  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`)
    return response.data
  },

  updateUser: async (id, data) => {
    const response = await api.put(`/users/${id}`, data)
    return response.data
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`)
    return response.data
  },

  toggleUserStatus: async (id) => {
    const response = await api.patch(`/users/${id}/toggle-status`)
    return response.data
  },

  getUserStats: async () => {
    const response = await api.get('/users/stats')
    return response.data
  },

  // Artigos
  getArticles: async (params) => {
    const response = await api.get('/blog/articles', { params })
    return response.data
  },

  createArticle: async (data) => {
    const response = await api.post('/blog/articles', data)
    return response.data
  },

  updateArticle: async (id, data) => {
    const response = await api.put(`/blog/articles/${id}`, data)
    return response.data
  },

  deleteArticle: async (id) => {
    const response = await api.delete(`/blog/articles/${id}`)
    return response.data
  },

  // Programas
  getPrograms: async (params) => {
    const response = await api.get('/programs', { params })
    return response.data
  },

  createProgram: async (data) => {
    const response = await api.post('/programs', data)
    return response.data
  },

  updateProgram: async (id, data) => {
    const response = await api.put(`/programs/${id}`, data)
    return response.data
  },

  deleteProgram: async (id) => {
    const response = await api.delete(`/programs/${id}`)
    return response.data
  },

  // Mensagens de Contato
  getContacts: async (params) => {
    const response = await api.get('/contact', { params })
    return response.data
  },

  updateContactStatus: async (id, status) => {
    const response = await api.put(`/contact/${id}/status`, { status })
    return response.data
  },

  // Logs de Login
  getLoginLogs: async (params) => {
    const response = await api.get('/reports/login-logs', { params })
    return response.data
  },

  getSecurityAlerts: async (params) => {
    const response = await api.get('/reports/security-alerts', { params })
    return response.data
  },

  // Relatórios
  getMembersReport: async (params) => {
    const response = await api.get('/reports/members', { params })
    return response.data
  },

  getProgramsReport: async (params) => {
    const response = await api.get('/reports/programs', { params })
    return response.data
  },

  getActivitiesReport: async (params) => {
    const response = await api.get('/reports/activities', { params })
    return response.data
  },
}
