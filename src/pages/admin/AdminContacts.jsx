import { useState, useEffect } from 'react'
import { adminService } from '../../services/adminService'
import { useNotificationStore } from '../../store/notificationStore'
import { Mail, Phone, Calendar, Trash2, Eye, CheckCircle, XCircle, Search, Send } from 'lucide-react'

const AdminContacts = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [toast, setToast] = useState({ show: false, type: '', message: '' })
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)
  const [contactToDelete, setContactToDelete] = useState(null)
  const { fetchUnreadCount } = useNotificationStore()

  useEffect(() => {
    loadContacts()
  }, [])

  const showToast = (type, message) => {
    setToast({ show: true, type, message })
    setTimeout(() => {
      setToast({ show: false, type: '', message: '' })
    }, 5000)
  }

  const loadContacts = async () => {
    try {
      setLoading(true)
      const response = await adminService.getContacts()
      console.log('Contatos:', response)
      setContacts(response.data || [])
      // Atualizar contador de notificações
      await fetchUnreadCount()
    } catch (error) {
      console.error('Erro ao carregar contatos:', error)
      showToast('error', 'Erro ao carregar mensagens')
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (contact) => {
    setSelectedContact(contact)
    setShowDetailsModal(true)
  }

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false)
    setSelectedContact(null)
  }

  const handleMarkAsRead = async (id) => {
    try {
      await adminService.updateContactStatus(id, 'respondido')
      showToast('success', 'Mensagem marcada como respondida!')
      loadContacts()
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      showToast('error', 'Erro ao atualizar status')
    }
  }

  const handleOpenDeleteModal = (contact) => {
    setContactToDelete(contact)
    setShowDeleteModal(true)
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
    setContactToDelete(null)
  }

  const handleConfirmDelete = async () => {
    if (!contactToDelete) return

    try {
      await adminService.deleteContact(contactToDelete.id)
      showToast('success', 'Mensagem deletada com sucesso!')
      handleCloseDeleteModal()
      loadContacts()
    } catch (error) {
      console.error('Erro ao deletar mensagem:', error)
      showToast('error', 'Erro ao deletar mensagem')
    }
  }

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.assunto?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mensagens de Contato</h1>
        <p className="text-gray-600 mt-2">Gerencie as mensagens recebidas através do formulário de contato</p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Pesquisar por nome, email ou assunto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input md:w-48"
          >
            <option value="all">Todos os Status</option>
            <option value="pendente">Pendente</option>
            <option value="respondido">Respondido</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assunto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{contact.nome}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <Mail size={14} />
                        {contact.email}
                      </div>
                      {contact.telefone && (
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone size={14} />
                          {contact.telefone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{contact.assunto}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{contact.mensagem}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {contact.created_at ? new Date(contact.created_at).toLocaleDateString('pt-BR') : 'Data não disponível'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      contact.status === 'respondido'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {contact.status === 'respondido' ? 'Respondido' : 'Pendente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleViewDetails(contact)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Ver detalhes"
                      >
                        <Eye size={18} />
                      </button>
                      <a 
                        href={`mailto:${contact.email}?subject=Re: ${encodeURIComponent(contact.assunto)}&body=${encodeURIComponent(`Olá ${contact.nome},\n\nObrigado por entrar em contato conosco.\n\nEm resposta à sua mensagem:\n"${contact.mensagem}"\n\n`)}`}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition inline-block"
                        title="Responder por email"
                      >
                        <Send size={18} />
                      </a>
                      {contact.status !== 'respondido' && (
                        <button 
                          onClick={() => handleMarkAsRead(contact.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                          title="Marcar como respondido"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleOpenDeleteModal(contact)}
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

          {filteredContacts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhuma mensagem encontrada</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Detalhes */}
      {showDetailsModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Detalhes da Mensagem</h2>
                <button
                  onClick={handleCloseDetailsModal}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  <XCircle size={24} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Nome:</h3>
                  <p className="text-gray-900">{selectedContact.nome}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Email:</h3>
                    <div className="flex items-center text-gray-900">
                      <Mail size={16} className="mr-2" />
                      <a href={`mailto:${selectedContact.email}`} className="hover:text-blue-600">
                        {selectedContact.email}
                      </a>
                    </div>
                  </div>
                  {selectedContact.telefone && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-1">Telefone:</h3>
                      <div className="flex items-center text-gray-900">
                        <Phone size={16} className="mr-2" />
                        {selectedContact.telefone}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Assunto:</h3>
                  <p className="text-gray-900">{selectedContact.assunto}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Mensagem:</h3>
                  <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                    {selectedContact.mensagem}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Data:</h3>
                    <div className="flex items-center text-gray-900">
                      <Calendar size={16} className="mr-2" />
                      {selectedContact.created_at ? new Date(selectedContact.created_at).toLocaleDateString('pt-BR') : 'Data não disponível'}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Status:</h3>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      selectedContact.status === 'respondido'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedContact.status === 'respondido' ? 'Respondido' : 'Pendente'}
                    </span>
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
              {selectedContact.status !== 'respondido' && (
                <button
                  onClick={() => {
                    handleMarkAsRead(selectedContact.id)
                    handleCloseDetailsModal()
                  }}
                  className="btn btn-primary inline-flex items-center gap-2"
                >
                  <CheckCircle size={18} />
                  Marcar como Respondido
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteModal && contactToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                <Trash2 className="text-red-600" size={24} />
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
                Deletar Mensagem?
              </h2>
              
              <p className="text-gray-600 text-center mb-4">
                Tem certeza que deseja deletar esta mensagem? Esta ação não pode ser desfeita.
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="space-y-2 text-sm">
                  <p><strong>De:</strong> {contactToDelete.nome}</p>
                  <p><strong>Email:</strong> {contactToDelete.email}</p>
                  <p><strong>Assunto:</strong> {contactToDelete.assunto}</p>
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

export default AdminContacts
