import { useEffect, useState } from 'react'
import { adminService } from '../../services/adminService'
import { Search, UserPlus, Edit, Trash2, Eye, X, Save, CheckCircle, AlertCircle, Check, XCircle } from 'lucide-react'

const AdminMembers = () => {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [memberToAction, setMemberToAction] = useState(null)
  const [rejectReason, setRejectReason] = useState('')
  const [toast, setToast] = useState({ show: false, type: '', message: '' })
  const [formData, setFormData] = useState({
    nome_completo: '',
    email: '',
    data_nascimento: '',
    genero: '',
    nivel_escolaridade: '',
    area_interesse: '',
    telefone: '',
    endereco: ''
  })

  useEffect(() => {
    loadMembers()
  }, [filterStatus])

  const loadMembers = async () => {
    try {
      setLoading(true)
      const params = {}
      if (filterStatus) params.status_aprovacao = filterStatus
      
      const response = await adminService.getMembers(params)
      setMembers(response.members || [])
    } catch (error) {
      console.error('Erro ao carregar membros:', error)
      showToast('error', 'Erro ao carregar membros')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenApproveModal = (member) => {
    setMemberToAction(member)
    setShowApproveModal(true)
  }

  const handleOpenRejectModal = (member) => {
    setMemberToAction(member)
    setRejectReason('')
    setShowRejectModal(true)
  }

  const handleApproveMember = async () => {
    if (!memberToAction) return
    
    try {
      console.log('Aprovando membro:', memberToAction.id)
      const response = await adminService.approveMember(memberToAction.id)
      console.log('Resposta da aprovação:', response)
      showToast('success', 'Membro aprovado com sucesso! Usuário criado.')
      loadMembers()
      setShowApproveModal(false)
      setMemberToAction(null)
    } catch (error) {
      console.error('Erro completo ao aprovar membro:', error)
      console.error('Resposta do erro:', error.response?.data)
      const errorMessage = error.response?.data?.message || 'Erro ao aprovar membro'
      showToast('error', errorMessage)
    }
  }

  const handleRejectMember = async () => {
    if (!memberToAction) return
    
    try {
      await adminService.rejectMember(memberToAction.id, rejectReason)
      showToast('success', 'Candidatura rejeitada')
      loadMembers()
      setShowRejectModal(false)
      setMemberToAction(null)
      setRejectReason('')
    } catch (error) {
      console.error('Erro ao rejeitar membro:', error)
      showToast('error', 'Erro ao rejeitar membro')
    }
  }

  const handleDeleteMember = async (memberId) => {
    if (window.confirm('Tem certeza que deseja deletar esta candidatura?')) {
      try {
        await adminService.deleteMember(memberId)
        showToast('success', 'Candidatura deletada com sucesso!')
        loadMembers()
      } catch (error) {
        console.error('Erro ao deletar:', error)
        showToast('error', 'Erro ao deletar')
      }
    }
  }

  const handleOpenModal = (member = null) => {
    if (member) {
      setEditingMember(member)
      setFormData({
        nome_completo: member.nome_completo,
        email: member.email,
        data_nascimento: member.data_nascimento || '',
        genero: member.genero || '',
        nivel_escolaridade: member.nivel_escolaridade || '',
        area_interesse: member.area_interesse || '',
        telefone: member.telefone || '',
        endereco: member.endereco || ''
      })
    } else {
      setEditingMember(null)
      setFormData({
        nome_completo: '',
        email: '',
        data_nascimento: '',
        genero: '',
        nivel_escolaridade: '',
        area_interesse: '',
        telefone: '',
        endereco: ''
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingMember(null)
    setFormData({
      nome_completo: '',
      email: '',
      data_nascimento: '',
      genero: '',
      nivel_escolaridade: '',
      area_interesse: '',
      telefone: '',
      endereco: ''
    })
  }

  const handleViewDetails = (member) => {
    setSelectedMember(member)
    setShowDetailsModal(true)
  }

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false)
    setSelectedMember(null)
  }

  const showToast = (type, message) => {
    setToast({ show: true, type, message })
    setTimeout(() => {
      setToast({ show: false, type: '', message: '' })
    }, 5000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (editingMember) {
        await adminService.updateMember(editingMember.id, formData)
        showToast('success', 'Membro atualizado com sucesso!')
      } else {
        await adminService.createMember(formData)
        showToast('success', 'Candidatura de membro criada com sucesso!')
      }
      loadMembers()
      handleCloseModal()
    } catch (error) {
      console.error('Erro completo:', error)
      console.error('Resposta do servidor:', error.response?.data)
      
      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors.map(err => 
          err.message
        ).join(', ')
        showToast('error', `Erros: ${errorMessages}`)
      } else {
        showToast('error', error.response?.data?.message || 'Erro ao salvar')
      }
    }
  }

  const filteredMembers = members.filter(member =>
    member.nome_completo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status) => {
    const statusConfig = {
      pendente: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pendente' },
      aprovado: { bg: 'bg-green-100', text: 'text-green-700', label: 'Aprovado' },
      rejeitado: { bg: 'bg-red-100', text: 'text-red-700', label: 'Rejeitado' }
    }
    
    const config = statusConfig[status] || statusConfig.pendente
    
    return (
      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestão de Membros
          </h1>
          <p className="text-gray-600">
            Gerencie as candidaturas e membros da organização
          </p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn btn-primary inline-flex items-center"
        >
          <UserPlus size={20} className="mr-2" />
          Nova Candidatura
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Pesquisar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input"
            >
              <option value="">Todos os Status</option>
              <option value="pendente">Pendente</option>
              <option value="aprovado">Aprovado</option>
              <option value="rejeitado">Rejeitado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Candidato
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Telefone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Área de Interesse
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Data Candidatura
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                          {member.nome_completo?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{member.nome_completo}</p>
                          <p className="text-sm text-gray-600">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {member.telefone || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {member.area_interesse || '-'}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(member.status_aprovacao)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(member.data_candidatura || member.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(member)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Ver detalhes"
                        >
                          <Eye size={18} />
                        </button>
                        {member.status_aprovacao === 'pendente' && (
                          <>
                            <button
                              onClick={() => handleOpenApproveModal(member)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                              title="Aprovar"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              onClick={() => handleOpenRejectModal(member)}
                              className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition"
                              title="Rejeitar"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleOpenModal(member)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Deletar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredMembers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhum membro encontrado</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Mostrando {filteredMembers.length} de {members.length} membros
        </p>
      </div>

      {/* Modal de Criar/Editar Membro */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingMember ? 'Editar Membro' : 'Nova Candidatura'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={formData.nome_completo}
                    onChange={(e) => setFormData({ ...formData, nome_completo: e.target.value })}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Nascimento *
                  </label>
                  <input
                    type="date"
                    value={formData.data_nascimento}
                    onChange={(e) => setFormData({ ...formData, data_nascimento: e.target.value })}
                    className="input"
                    required
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gênero *
                  </label>
                  <select
                    value={formData.genero}
                    onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
                    className="input"
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                    <option value="prefiro_nao_dizer">Prefiro não dizer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nível de Escolaridade *
                  </label>
                  <select
                    value={formData.nivel_escolaridade}
                    onChange={(e) => setFormData({ ...formData, nivel_escolaridade: e.target.value })}
                    className="input"
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="ensino_basico">Ensino Básico</option>
                    <option value="ensino_medio">Ensino Médio</option>
                    <option value="ensino_tecnico">Ensino Técnico</option>
                    <option value="ensino_superior">Ensino Superior</option>
                    <option value="pos_graduacao">Pós-Graduação</option>
                    <option value="mestrado">Mestrado</option>
                    <option value="doutorado">Doutorado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    className="input"
                    placeholder="+244 923 456 789"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Área de Interesse *
                </label>
                <input
                  type="text"
                  value={formData.area_interesse}
                  onChange={(e) => setFormData({ ...formData, area_interesse: e.target.value })}
                  className="input"
                  placeholder="Ex: Tecnologia, Marketing, Finanças"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço
                </label>
                <textarea
                  value={formData.endereco}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                  className="input"
                  placeholder="Endereço completo"
                  rows="3"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="btn btn-primary flex-1 inline-flex items-center justify-center"
                >
                  <Save size={18} className="mr-2" />
                  {editingMember ? 'Salvar Alterações' : 'Criar Candidatura'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn bg-gray-200 text-gray-700 hover:bg-gray-300 px-6"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Detalhes */}
      {showDetailsModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Detalhes do Membro
              </h2>
              <button
                onClick={handleCloseDetailsModal}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {selectedMember.nome_completo?.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedMember.nome_completo}</h3>
                  <p className="text-gray-600">{selectedMember.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                  <div>{getStatusBadge(selectedMember.status_aprovacao)}</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Data de Candidatura</label>
                  <p className="text-gray-900">{new Date(selectedMember.data_candidatura || selectedMember.created_at).toLocaleDateString('pt-BR')}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Data de Nascimento</label>
                  <p className="text-gray-900">
                    {selectedMember.data_nascimento 
                      ? new Date(selectedMember.data_nascimento).toLocaleDateString('pt-BR')
                      : '-'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Gênero</label>
                  <p className="text-gray-900 capitalize">{selectedMember.genero?.replace('_', ' ') || '-'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Nível de Escolaridade</label>
                  <p className="text-gray-900 capitalize">{selectedMember.nivel_escolaridade?.replace('_', ' ') || '-'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Telefone</label>
                  <p className="text-gray-900">{selectedMember.telefone || '-'}</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Área de Interesse</label>
                  <p className="text-gray-900">{selectedMember.area_interesse || '-'}</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Endereço</label>
                  <p className="text-gray-900">{selectedMember.endereco || '-'}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    handleCloseDetailsModal()
                    handleOpenApproveModal(selectedMember)
                  }}
                  className="btn btn-primary flex-1 inline-flex items-center justify-center"
                >
                  <Check size={18} className="mr-2" />
                  Aprovar Membro
                </button>
                <button
                  onClick={() => {
                    handleCloseDetailsModal()
                    handleOpenRejectModal(selectedMember)
                  }}
                  className="btn bg-red-600 text-white hover:bg-red-700 flex-1 inline-flex items-center justify-center"
                >
                  <XCircle size={18} className="mr-2" />
                  Rejeitar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Aprovação */}
      {showApproveModal && memberToAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full mb-4">
                <Check className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                Aprovar Membro
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Deseja aprovar a candidatura de <strong>{memberToAction.nome_completo}</strong>?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowApproveModal(false)
                    setMemberToAction(null)
                  }}
                  className="btn bg-gray-200 text-gray-700 hover:bg-gray-300 flex-1"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleApproveMember}
                  className="btn btn-primary flex-1"
                >
                  Confirmar Aprovação
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Rejeição */}
      {showRejectModal && memberToAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                <XCircle className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                Rejeitar Candidatura
              </h3>
              <p className="text-gray-600 text-center mb-4">
                Deseja rejeitar a candidatura de <strong>{memberToAction.nome_completo}</strong>?
              </p>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motivo da rejeição (opcional)
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="input"
                  placeholder="Descreva o motivo da rejeição..."
                  rows="4"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowRejectModal(false)
                    setMemberToAction(null)
                    setRejectReason('')
                  }}
                  className="btn bg-gray-200 text-gray-700 hover:bg-gray-300 flex-1"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleRejectMember}
                  className="btn bg-red-600 text-white hover:bg-red-700 flex-1"
                >
                  Confirmar Rejeição
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 transition-all duration-300 ease-out transform translate-x-0 opacity-100">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-xl border-2 min-w-[300px] ${
            toast.type === 'success' 
              ? 'bg-green-50 border-green-500 text-green-900' 
              : 'bg-red-50 border-red-500 text-red-900'
          }`}>
            <div className={`flex-shrink-0 ${
              toast.type === 'success' ? 'text-green-500' : 'text-red-500'
            }`}>
              {toast.type === 'success' ? (
                <CheckCircle size={24} />
              ) : (
                <AlertCircle size={24} />
              )}
            </div>
            <span className="font-medium flex-1">{toast.message}</span>
            <button
              onClick={() => setToast({ show: false, type: '', message: '' })}
              className={`flex-shrink-0 hover:opacity-70 transition-opacity ${
                toast.type === 'success' ? 'text-green-700' : 'text-red-700'
              }`}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminMembers
