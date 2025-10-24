import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminService } from '../../services/adminService'
import { Search, Plus, Edit, Trash2, Calendar, MapPin, Users, Eye, CheckCircle, XCircle } from 'lucide-react'

const AdminPrograms = () => {
  const navigate = useNavigate()
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [toast, setToast] = useState({ show: false, type: '', message: '' })
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [programToDelete, setProgramToDelete] = useState(null)

  useEffect(() => {
    loadPrograms()
  }, [])
  const showToast = (type, message) => {
    setToast({ show: true, type, message })
    setTimeout(() => {
      setToast({ show: false, type: '', message: '' })
    }, 5000)
  }

  const loadPrograms = async () => {
    try {
      setLoading(true)
      const response = await adminService.getPrograms()
      setPrograms(response.data || [])
    } catch (error) {
      console.error('Erro ao carregar programas:', error)
      showToast('error', 'Erro ao carregar programas')
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (program) => {
    setSelectedProgram(program)
    setShowDetailsModal(true)
  }

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false)
    setSelectedProgram(null)
  }

  const handleOpenDeleteModal = (program) => {
    setProgramToDelete(program)
    setShowDeleteModal(true)
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
    setProgramToDelete(null)
  }

  const handleConfirmDelete = async () => {
    if (!programToDelete) return

    try {
      await adminService.deleteProgram(programToDelete.id)
      showToast('success', 'Programa deletado com sucesso!')
      handleCloseDeleteModal()
      loadPrograms()
    } catch (error) {
      console.error('Erro ao deletar programa:', error)
      showToast('error', 'Erro ao deletar programa')
    }
  }

  const filteredPrograms = programs.filter(program =>
    program.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.tipo?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-700'
      case 'em_breve': return 'bg-blue-100 text-blue-700'
      case 'encerrado': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'workshop': return 'bg-purple-100 text-purple-700'
      case 'curso': return 'bg-blue-100 text-blue-700'
      case 'mentoria': return 'bg-orange-100 text-orange-700'
      case 'evento': return 'bg-pink-100 text-pink-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestão de Programas</h1>
          <p className="text-gray-600">Gerencie workshops, cursos e eventos</p>
        </div>
        <button 
          onClick={() => navigate('/admin/programs/new')}
          className="btn btn-primary inline-flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Novo Programa
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Pesquisar programas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>

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
                    Programa
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Local
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Vagas
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPrograms.map((program) => (
                  <tr key={program.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{program.titulo}</p>
                        <p className="text-sm text-gray-600 line-clamp-1">{program.descricao}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getTipoColor(program.tipo)}`}>
                        {program.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar size={16} className="mr-2" />
                        {new Date(program.data_inicio).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={16} className="mr-2" />
                        <span className="line-clamp-1">{program.local}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users size={16} className="mr-2" />
                        {program.vagas_disponiveis || 0}/{program.vagas}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(program.status)}`}>
                        {program.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => handleViewDetails(program)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Ver detalhes"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => navigate(`/admin/programs/edit/${program.id}`)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(program)}
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

            {filteredPrograms.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhum programa encontrado</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal de Detalhes */}
      {showDetailsModal && selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full my-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{selectedProgram.titulo}</h2>
                <button
                  onClick={handleCloseDetailsModal}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  <XCircle size={24} />
                </button>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getTipoColor(selectedProgram.tipo)}`}>
                  {selectedProgram.tipo}
                </span>
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedProgram.status)}`}>
                  {selectedProgram.status}
                </span>
              </div>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Descrição:</h3>
                  <p className="text-gray-700">{selectedProgram.descricao}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Data de Início:</h3>
                    <div className="flex items-center text-gray-700">
                      <Calendar size={16} className="mr-2" />
                      {new Date(selectedProgram.data_inicio).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Data de Fim:</h3>
                    <div className="flex items-center text-gray-700">
                      <Calendar size={16} className="mr-2" />
                      {selectedProgram.data_fim ? new Date(selectedProgram.data_fim).toLocaleDateString('pt-BR') : 'Não definida'}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Local:</h3>
                  <div className="flex items-center text-gray-700">
                    <MapPin size={16} className="mr-2" />
                    {selectedProgram.local}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Vagas:</h3>
                    <div className="flex items-center text-gray-700">
                      <Users size={16} className="mr-2" />
                      {selectedProgram.vagas} vagas
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Vagas Disponíveis:</h3>
                    <div className="flex items-center text-gray-700">
                      <Users size={16} className="mr-2" />
                      {selectedProgram.vagas_disponiveis || 0} disponíveis
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={handleCloseDetailsModal}
                className="btn bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  handleCloseDetailsModal()
                  navigate(`/admin/programs/edit/${selectedProgram.id}`)
                }}
                className="btn btn-primary inline-flex items-center gap-2"
              >
                <Edit size={18} />
                Editar Programa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteModal && programToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                <Trash2 className="text-red-600" size={24} />
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
                Deletar Programa?
              </h2>
              
              <p className="text-gray-600 text-center mb-4">
                Tem certeza que deseja deletar este programa? Esta ação não pode ser desfeita e todos os dados relacionados serão perdidos.
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="space-y-2 text-sm">
                  <p><strong>Programa:</strong> {programToDelete.titulo}</p>
                  <p><strong>Tipo:</strong> {programToDelete.tipo}</p>
                  <p><strong>Data:</strong> {new Date(programToDelete.data_inicio).toLocaleDateString('pt-BR')}</p>
                  <p><strong>Vagas:</strong> {programToDelete.vagas}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCloseDeleteModal}
                  className="flex-1 btn bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 btn bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
                >
                  Deletar
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
                <XCircle size={24} />
              )}
            </div>
            <p className="font-medium">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPrograms
