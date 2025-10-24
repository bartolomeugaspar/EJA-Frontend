import { useState } from 'react'
import { Calendar, Clock, MapPin, Users, CheckCircle, XCircle, X, AlertCircle } from 'lucide-react'
import { useMyPrograms } from '../../hooks/usePrograms'

const MyPrograms = () => {
  const [activeTab, setActiveTab] = useState('inscritos')
  const { programs, loading, error, enrollProgram, cancelEnrollment } = useMyPrograms()
  const [toast, setToast] = useState({ show: false, type: '', message: '' })
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [programToCancel, setProgramToCancel] = useState(null)

  const showToast = (type, message) => {
    setToast({ show: true, type, message })
    setTimeout(() => setToast({ show: false, type: '', message: '' }), 4000)
  }

  const handleEnroll = async (programId) => {
    try {
      await enrollProgram(programId)
      showToast('success', 'Inscrição realizada com sucesso!')
    } catch (err) {
      showToast('error', err.response?.data?.message || 'Erro ao realizar inscrição')
    }
  }

  const handleCancelClick = (programId) => {
    setProgramToCancel(programId)
    setShowCancelModal(true)
  }

  const handleCancelConfirm = async () => {
    try {
      await cancelEnrollment(programToCancel)
      setShowCancelModal(false)
      setProgramToCancel(null)
      showToast('success', 'Inscrição cancelada com sucesso!')
    } catch (err) {
      showToast('error', err.response?.data?.message || 'Erro ao cancelar inscrição')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  const getStatusBadge = (status) => {
    const badges = {
      confirmado: { color: 'bg-blue-100 text-blue-800', text: 'Confirmado' },
      em_andamento: { color: 'bg-green-100 text-green-800', text: 'Em Andamento' },
      concluido: { color: 'bg-gray-100 text-gray-800', text: 'Concluído' },
      disponivel: { color: 'bg-yellow-100 text-yellow-800', text: 'Disponível' }
    }
    return badges[status] || badges.disponivel
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Meus Programas</h1>
        <p className="text-gray-600 mt-2">Acompanhe seus programas e inscrições</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('inscritos')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition ${
                activeTab === 'inscritos'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Programas Inscritos ({programs.inscritos.length})
            </button>
            <button
              onClick={() => setActiveTab('concluidos')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition ${
                activeTab === 'concluidos'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Concluídos ({programs.concluidos.length})
            </button>
            <button
              onClick={() => setActiveTab('disponiveis')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition ${
                activeTab === 'disponiveis'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Disponíveis ({programs.disponiveis.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Programas Inscritos */}
      {activeTab === 'inscritos' && (
        <div className="grid grid-cols-1 gap-6">
          {programs.inscritos.map((program) => (
            <div key={program.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{program.titulo}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {new Date(program.data_inicio).toLocaleDateString('pt-BR')} - {new Date(program.data_fim).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      {program.local}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      {program.vagas} vagas
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(program.status).color}`}>
                  {getStatusBadge(program.status).text}
                </span>
              </div>

              {program.progresso && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Progresso</span>
                    <span className="font-medium text-gray-900">{program.progresso}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full transition-all"
                      style={{ width: `${program.progresso}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                  Ver Detalhes
                </button>
                <button 
                  onClick={() => handleCancel(program.id)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancelar Inscrição
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Programas Concluídos */}
      {activeTab === 'concluidos' && (
        <div className="grid grid-cols-1 gap-6">
          {programs.concluidos.map((program) => (
            <div key={program.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{program.titulo}</h3>
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {new Date(program.data_inicio).toLocaleDateString('pt-BR')} - {new Date(program.data_fim).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      {program.local}
                    </div>
                  </div>
                </div>
              </div>

              {program.certificado && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-600" size={20} />
                      <span className="text-sm font-medium text-green-800">Certificado disponível</span>
                    </div>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm">
                      Baixar Certificado
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Programas Disponíveis */}
      {activeTab === 'disponiveis' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.disponiveis.map((program) => (
            <div key={program.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{program.titulo}</h3>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {new Date(program.data_inicio).toLocaleDateString('pt-BR')} - {new Date(program.data_fim).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  {program.local}
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  {program.vagas} vagas disponíveis
                </div>
              </div>
              <button 
                onClick={() => handleEnroll(program.id)}
                className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition font-medium"
              >
                Inscrever-se
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyPrograms
