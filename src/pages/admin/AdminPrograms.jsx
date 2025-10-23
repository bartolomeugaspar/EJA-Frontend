import { useEffect, useState } from 'react'
import { adminService } from '../../services/adminService'
import { Search, Plus, Edit, Trash2, Calendar, MapPin, Users } from 'lucide-react'

const AdminPrograms = () => {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadPrograms()
  }, [])

  const loadPrograms = async () => {
    try {
      setLoading(true)
      const response = await adminService.getPrograms()
      setPrograms(response.data || [])
    } catch (error) {
      console.error('Erro ao carregar programas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProgram = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este programa?')) {
      try {
        await adminService.deleteProgram(id)
        loadPrograms()
      } catch (error) {
        console.error('Erro ao deletar programa:', error)
      }
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
        <button className="btn btn-primary inline-flex items-center">
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
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteProgram(program.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
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
    </div>
  )
}

export default AdminPrograms
