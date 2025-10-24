import { useEffect, useState } from 'react'
import { adminService } from '../../services/adminService'
import { Search, Filter, UserPlus, Edit, Trash2, ToggleLeft, ToggleRight, Eye, X, Save, CheckCircle, AlertCircle } from 'lucide-react'

const AdminUsers = ({ filterRole: initialFilterRole = '' }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState(initialFilterRole)
  const [filterStatus, setFilterStatus] = useState('')
  const isMembersPage = initialFilterRole === 'member'
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [toast, setToast] = useState({ show: false, type: '', message: '' })
  const [formData, setFormData] = useState({
    nome_completo: '',
    email: '',
    senha: '',
    confirmacao_senha: '',
    data_nascimento: '',
    genero: '',
    nivel_escolaridade: '',
    area_interesse: '',
    telefone: '',
    endereco: '',
    role: 'user',
    ativo: true
  })

  useEffect(() => {
    loadUsers()
  }, [filterRole, filterStatus])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const params = {}
      
      if (isMembersPage) {
        // Para página de membros, usar endpoint específico
        if (filterRole) params.status_aprovacao = filterRole
        if (filterStatus) params.ativo = filterStatus
        
        const response = await adminService.getMembers(params)
        setUsers(response.members || [])
      } else {
        // Para página de usuários, usar endpoint geral
        if (filterRole) params.role = filterRole
        if (filterStatus) params.ativo = filterStatus
        
        const response = await adminService.getUsers(params)
        setUsers(response.data.users || [])
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleStatus = async (userId) => {
    try {
      await adminService.toggleUserStatus(userId)
      loadUsers()
    } catch (error) {
      console.error('Erro ao alterar status:', error)
    }
  }

  const handleApproveMember = async (userId) => {
    if (!window.confirm('Deseja aprovar este membro?')) return
    
    try {
      await adminService.approveMember(userId)
      showToast('success', 'Membro aprovado com sucesso!')
      loadUsers()
    } catch (error) {
      console.error('Erro ao aprovar membro:', error)
      showToast('error', 'Erro ao aprovar membro')
    }
  }

  const handleRejectMember = async (userId) => {
    const motivo = window.prompt('Motivo da rejeição (opcional):')
    if (motivo === null) return // Cancelou
    
    try {
      await adminService.rejectMember(userId, motivo)
      showToast('success', 'Candidatura rejeitada')
      loadUsers()
    } catch (error) {
      console.error('Erro ao rejeitar membro:', error)
      showToast('error', 'Erro ao rejeitar membro')
    }
  }

  const handleDeleteUser = async (userId) => {
    const confirmMessage = isMembersPage 
      ? 'Tem certeza que deseja deletar esta candidatura?' 
      : 'Tem certeza que deseja deletar este usuário?'
    
    if (window.confirm(confirmMessage)) {
      try {
        if (isMembersPage) {
          await adminService.deleteMember(userId)
          showToast('success', 'Candidatura deletada com sucesso!')
        } else {
          await adminService.deleteUser(userId)
          showToast('success', 'Usuário deletado com sucesso!')
        }
        loadUsers()
      } catch (error) {
        console.error('Erro ao deletar:', error)
        showToast('error', 'Erro ao deletar')
      }
    }
  }

  const handleOpenModal = (user = null) => {
    if (user) {
      setFormData({
        nome_completo: user.nome_completo,
        email: user.email,
        senha: '',
        confirmacao_senha: '',
        data_nascimento: user.data_nascimento || '',
        genero: user.genero || '',
        nivel_escolaridade: user.nivel_escolaridade || '',
        area_interesse: user.area_interesse || '',
        telefone: user.telefone || '',
        endereco: user.endereco || '',
        role: user.role || 'user',
        ativo: user.ativo !== undefined ? user.ativo : true
      })
    } else {
      setEditingUser(null)
      setFormData({
        nome_completo: '',
        email: '',
        senha: '',
        confirmacao_senha: '',
        data_nascimento: '',
        genero: '',
        nivel_escolaridade: '',
        area_interesse: '',
        telefone: '',
        endereco: '',
        role: 'user',
        ativo: true
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingUser(null)
    setFormData({
      nome_completo: '',
      email: '',
      senha: '',
      confirmacao_senha: '',
      data_nascimento: '',
      genero: '',
      nivel_escolaridade: '',
      area_interesse: '',
      telefone: '',
      role: 'user',
      ativo: true
    })
  }

  const showToast = (type, message) => {
    setToast({ show: true, type, message })
    setTimeout(() => {
      setToast({ show: false, type: '', message: '' })
    }, 5000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validar senhas apenas para usuários (não para membros)
    if (!isMembersPage && !editingUser && formData.senha !== formData.confirmacao_senha) {
      showToast('error', 'As senhas não coincidem!')
      return
    }
    
    try {
      if (editingUser) {
        // Ao editar
        if (isMembersPage) {
          // Remover campos de senha ao editar membro
          const { senha, confirmacao_senha, role, ativo, ...memberData } = formData
          await adminService.updateMember(editingUser.id, memberData)
          showToast('success', 'Membro atualizado com sucesso!')
        } else {
          await adminService.updateUser(editingUser.id, formData)
          showToast('success', 'Usuário atualizado com sucesso!')
        }
      } else {
        // Ao criar
        if (isMembersPage) {
          // Criar membro via endpoint de membros (SEM SENHA)
          const { senha, confirmacao_senha, role, ativo, ...memberData } = formData
          await adminService.createMember(memberData)
          showToast('success', 'Candidatura de membro criada com sucesso!')
        } else {
          // Criar usuário via registro (remover role e ativo)
          const { role, ativo, ...userData } = formData
          await adminService.createUser(userData)
          showToast('success', 'Usuário criado com sucesso!')
        }
      }
      loadUsers()
      handleCloseModal()
    } catch (error) {
      console.error('Erro completo:', error)
      console.error('Resposta do servidor:', error.response?.data)
      
      // Mostrar erros detalhados
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

  const filteredUsers = users.filter(user =>
    user.nome_completo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isMembersPage ? 'Gestão de Membros' : 'Gestão de Usuários'}
          </h1>
          <p className="text-gray-600">
            {isMembersPage 
              ? 'Gerencie os membros cadastrados na plataforma' 
              : 'Gerencie todos os usuários da plataforma (membros e admins)'}
          </p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn btn-primary inline-flex items-center"
        >
          <UserPlus size={20} className="mr-2" />
          {isMembersPage ? 'Novo Membro' : 'Novo Usuário'}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="input"
            >
              <option value="">Todos os Perfis</option>
              <option value="admin">Administrador</option>
              <option value="member">Membro</option>
            </select>
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input"
            >
              <option value="">Todos os Status</option>
              <option value="true">Ativos</option>
              <option value="false">Inativos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
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
                    Usuário
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Perfil
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Área de Interesse
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Cadastro
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                          {user.nome_completo?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.nome_completo}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {user.role === 'admin' ? 'Administrador' : 'Membro'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.area_interesse || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        user.ativo
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {user.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(isMembersPage ? user.data_candidatura : user.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Ver detalhes"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleOpenModal(user)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition"
                          title={user.ativo ? 'Desativar' : 'Ativar'}
                        >
                          {user.ativo ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
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

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhum usuário encontrado</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Mostrando {filteredUsers.length} de {users.length} usuários
        </p>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            Anterior
          </button>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
            1
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            2
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            Próximo
          </button>
        </div>
      </div>

      {/* Modal de Criar/Editar Usuário */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
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

              {/* Campos de senha apenas para usuários, não para membros */}
              {!isMembersPage && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {editingUser ? 'Nova Senha (deixe em branco para não alterar)' : 'Senha *'}
                    </label>
                    <input
                      type="password"
                      value={formData.senha}
                      onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                      className="input"
                      required={!editingUser}
                      minLength="6"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {editingUser ? 'Confirmar Nova Senha' : 'Confirmar Senha *'}
                    </label>
                    <input
                      type="password"
                      value={formData.confirmacao_senha}
                      onChange={(e) => setFormData({ ...formData, confirmacao_senha: e.target.value })}
                      className="input"
                      required={!editingUser}
                      minLength="6"
                    />
                  </div>
                </div>
              )}

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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Perfil
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="input"
                  >
                    <option value="user">Usuário</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.ativo}
                    onChange={(e) => setFormData({ ...formData, ativo: e.target.value === 'true' })}
                    className="input"
                  >
                    <option value="true">Ativo</option>
                    <option value="false">Inativo</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="btn btn-primary flex-1 inline-flex items-center justify-center"
                >
                  <Save size={18} className="mr-2" />
                  {editingUser ? 'Salvar Alterações' : 'Criar Usuário'}
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

export default AdminUsers
