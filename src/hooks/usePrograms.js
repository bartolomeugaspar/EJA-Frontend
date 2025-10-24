import { useState, useEffect } from 'react'
import api from '../services/api'

export const usePrograms = () => {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPrograms()
  }, [])

  const fetchPrograms = async () => {
    try {
      setLoading(true)
      const response = await api.get('/programs')
      setPrograms(response.data.data || [])
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao carregar programas')
      console.error('Erro ao buscar programas:', err)
    } finally {
      setLoading(false)
    }
  }

  const createProgram = async (programData) => {
    try {
      const response = await api.post('/programs', programData)
      setPrograms([...programs, response.data.data])
      return response.data
    } catch (err) {
      throw err
    }
  }

  const updateProgram = async (id, programData) => {
    try {
      const response = await api.put(`/programs/${id}`, programData)
      setPrograms(programs.map(p => p.id === id ? response.data.data : p))
      return response.data
    } catch (err) {
      throw err
    }
  }

  const deleteProgram = async (id) => {
    try {
      await api.delete(`/programs/${id}`)
      setPrograms(programs.filter(p => p.id !== id))
    } catch (err) {
      throw err
    }
  }

  return {
    programs,
    loading,
    error,
    fetchPrograms,
    createProgram,
    updateProgram,
    deleteProgram
  }
}

export const useMyPrograms = () => {
  const [programs, setPrograms] = useState({
    inscritos: [],
    concluidos: [],
    disponiveis: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMyPrograms()
  }, [])

  const fetchMyPrograms = async () => {
    try {
      setLoading(true)
      // Buscar programas do usuário
      const response = await api.get('/programs/user/my-programs')
      setPrograms(response.data.data || { inscritos: [], concluidos: [], disponiveis: [] })
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao carregar programas')
      console.error('Erro ao buscar meus programas:', err)
    } finally {
      setLoading(false)
    }
  }

  const enrollProgram = async (programId) => {
    try {
      await api.post(`/programs/${programId}/enroll`)
      await fetchMyPrograms()
    } catch (err) {
      throw err
    }
  }

  const cancelEnrollment = async (programId) => {
    try {
      await api.delete(`/programs/${programId}/enroll`)
      await fetchMyPrograms()
    } catch (err) {
      throw err
    }
  }

  return {
    programs,
    loading,
    error,
    fetchMyPrograms,
    enrollProgram,
    cancelEnrollment
  }
}
