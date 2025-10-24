import { useState, useEffect } from 'react'
import { adminService } from '../services/adminService'

export const useMembers = () => {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async (params = {}) => {
    try {
      setLoading(true)
      const response = await adminService.getMembers(params)
      setMembers(response.members || [])
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao carregar membros')
      console.error('Erro ao buscar membros:', err)
    } finally {
      setLoading(false)
    }
  }

  const getMemberById = async (id) => {
    try {
      const response = await adminService.getMemberById(id)
      return response.data
    } catch (err) {
      throw err
    }
  }

  const createMember = async (memberData) => {
    try {
      const response = await adminService.createMember(memberData)
      await fetchMembers()
      return response.data
    } catch (err) {
      throw err
    }
  }

  const updateMember = async (id, memberData) => {
    try {
      const response = await adminService.updateMember(id, memberData)
      setMembers(members.map(m => m.id === id ? response.data : m))
      return response.data
    } catch (err) {
      throw err
    }
  }

  const deleteMember = async (id) => {
    try {
      await adminService.deleteMember(id)
      setMembers(members.filter(m => m.id !== id))
    } catch (err) {
      throw err
    }
  }

  const approveMember = async (id) => {
    try {
      const response = await adminService.approveMember(id)
      await fetchMembers()
      return response.data
    } catch (err) {
      throw err
    }
  }

  const rejectMember = async (id, motivo) => {
    try {
      const response = await adminService.rejectMember(id, motivo)
      await fetchMembers()
      return response.data
    } catch (err) {
      throw err
    }
  }

  const toggleMemberStatus = async (id) => {
    try {
      const response = await adminService.toggleMemberStatus(id)
      await fetchMembers()
      return response.data
    } catch (err) {
      throw err
    }
  }

  return {
    members,
    loading,
    error,
    fetchMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember,
    approveMember,
    rejectMember,
    toggleMemberStatus
  }
}
