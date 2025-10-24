import { useState, useEffect } from 'react'
import api from '../services/api'

export const useUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await api.get('/users')
      setUsers(response.data.data || [])
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao carregar usuários')
      console.error('Erro ao buscar usuários:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateUser = async (id, userData) => {
    try {
      const response = await api.put(`/users/${id}`, userData)
      setUsers(users.map(u => u.id === id ? response.data.data : u))
      return response.data
    } catch (err) {
      throw err
    }
  }

  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`)
      setUsers(users.filter(u => u.id !== id))
    } catch (err) {
      throw err
    }
  }

  return {
    users,
    loading,
    error,
    fetchUsers,
    updateUser,
    deleteUser
  }
}
