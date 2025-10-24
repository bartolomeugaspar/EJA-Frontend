import { useState } from 'react'
import { Calendar, Clock, MapPin, Users, CheckCircle, XCircle } from 'lucide-react'

const MyPrograms = () => {
  const [activeTab, setActiveTab] = useState('inscritos')

  const programs = {
    inscritos: [
      {
        id: 1,
        titulo: 'Workshop de Empreendedorismo Digital',
        data_inicio: '2024-02-15',
        data_fim: '2024-02-17',
        local: 'Luanda, Angola',
        vagas: 30,
        status: 'confirmado',
        progresso: 60
      },
      {
        id: 2,
        titulo: 'Programa de Aceleração de Startups',
        data_inicio: '2024-03-01',
        data_fim: '2024-06-01',
        local: 'Online',
        vagas: 20,
        status: 'em_andamento',
        progresso: 35
      }
    ],
    concluidos: [
      {
        id: 3,
        titulo: 'Curso de Marketing Digital',
        data_inicio: '2023-11-01',
        data_fim: '2023-12-15',
        local: 'Online',
        vagas: 50,
        status: 'concluido',
        certificado: true
      }
    ],
    disponiveis: [
      {
        id: 4,
        titulo: 'Mentoria em Gestão Financeira',
        data_inicio: '2024-04-10',
        data_fim: '2024-04-12',
        local: 'Benguela, Angola',
        vagas: 15,
        status: 'disponivel'
      },
      {
        id: 5,
        titulo: 'Workshop de Pitch para Investidores',
        data_inicio: '2024-05-20',
        data_fim: '2024-05-22',
        local: 'Luanda, Angola',
        vagas: 25,
        status: 'disponivel'
      }
    ]
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
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
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
              <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition font-medium">
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
