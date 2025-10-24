import { useState, useEffect } from 'react'
import { Mail, Phone, Calendar, Trash2, Eye, CheckCircle } from 'lucide-react'

const AdminContacts = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setContacts([
        {
          id: 1,
          nome: 'João Silva',
          email: 'joao@example.com',
          telefone: '+244 923 456 789',
          assunto: 'Dúvida sobre programas',
          mensagem: 'Gostaria de saber mais sobre os programas de aceleração...',
          data: '2024-01-20',
          status: 'pendente'
        },
        {
          id: 2,
          nome: 'Maria Santos',
          email: 'maria@example.com',
          telefone: '+244 912 345 678',
          assunto: 'Parceria',
          mensagem: 'Tenho interesse em estabelecer uma parceria...',
          data: '2024-01-19',
          status: 'respondido'
        }
      ])
      setLoading(false)
    }, 500)
  }, [])

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
              {contacts.map((contact) => (
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
                      {new Date(contact.data).toLocaleDateString('pt-BR')}
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
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye size={18} />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <CheckCircle size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminContacts
