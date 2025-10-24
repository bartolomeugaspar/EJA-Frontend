import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Calendar, MapPin, Users, Clock, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
import api from '../services/api'

const ProgramDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [program, setProgram] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [enrolling, setEnrolling] = useState(false)
  const [enrolled, setEnrolled] = useState(false)

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await api.get(`/programs/${id}`)
        console.log('Resposta da API:', response.data)
        // O backend retorna { success: true, data: {...program} }
        setProgram(response.data.data || response.data.program)
      } catch (err) {
        setError('Erro ao carregar detalhes do programa')
        console.error('Erro ao buscar programa:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProgram()
  }, [id])

  const handleEnroll = async () => {
    setEnrolling(true)
    try {
      // Fazer a inscrição no programa
      await api.post(`/programs/${id}/enroll`)
      
      // Atualizar o número de vagas localmente
      setProgram(prevProgram => ({
        ...prevProgram,
        vagas: prevProgram.vagas > 0 ? prevProgram.vagas - 1 : 0
      }))
      
      setEnrolled(true)
      setTimeout(() => {
        navigate('/programs')
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao se inscrever no programa')
      console.error('Erro ao se inscrever:', err)
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error && !program) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md w-full text-center">
          <AlertCircle className="mx-auto text-red-600 mb-4" size={48} />
          <p className="text-red-600 mb-4">{error}</p>
          <Link to="/programs" className="btn btn-primary">
            Voltar para Programas
          </Link>
        </div>
      </div>
    )
  }

  if (!program) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section com Imagem */}
      <div className="relative h-96 bg-gradient-to-r from-yellow-500 to-yellow-600">
        {program.imagem && (
          <>
            <img
              src={program.imagem}
              alt={program.titulo}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
          </>
        )}
        
        <div className="relative container-custom h-full flex flex-col justify-end pb-12">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-8 left-4 md:left-0 flex items-center gap-2 text-white hover:text-gray-200 transition"
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold border border-white/30">
              {program.tipo}
            </span>
            {program.status && (
              <span className={`px-4 py-2 backdrop-blur-sm rounded-full text-sm font-semibold border ${
                program.status === 'ativo' ? 'bg-green-500/20 text-white border-green-400/30' :
                program.status === 'em_breve' ? 'bg-yellow-500/20 text-white border-yellow-400/30' :
                'bg-gray-500/20 text-white border-gray-400/30'
              }`}>
                {program.status === 'ativo' ? 'Inscrições Abertas' :
                 program.status === 'em_breve' ? 'Em Breve' :
                 'Encerrado'}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {program.titulo}
          </h1>

          <div className="flex flex-wrap gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>
                {new Date(program.data_inicio).toLocaleDateString('pt-BR')} - {new Date(program.data_fim).toLocaleDateString('pt-BR')}
              </span>
            </div>
            {program.local && (
              <div className="flex items-center gap-2">
                <MapPin size={20} />
                <span>{program.local}</span>
              </div>
            )}
            {program.duracao && (
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>{program.duracao}</span>
              </div>
            )}
            {program.vagas && (
              <div className="flex items-center gap-2">
                <Users size={20} />
                <span>{program.vagas} vagas disponíveis</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Descrição */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre o Programa</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {program.descricao}
              </p>
            </div>

            {/* Objetivos */}
            {program.objetivos && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Objetivos</h2>
                <p className="text-gray-700 leading-relaxed">
                  {program.objetivos}
                </p>
              </div>
            )}

            {/* Requisitos */}
            {program.requisitos && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Requisitos</h2>
                <p className="text-gray-700 leading-relaxed">
                  {program.requisitos}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Inscreva-se</h3>

              {enrolled ? (
                <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-8 text-center mb-6 shadow-lg">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
                    <CheckCircle className="text-white" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-green-900 mb-2">Inscrição Realizada!</h3>
                  <p className="text-green-800 font-medium mb-4">
                    Parabéns! Você foi inscrito com sucesso no programa.
                  </p>
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 mb-4">
                    <p className="text-sm text-green-700">
                      ✓ Confirmação enviada para seu e-mail<br/>
                      ✓ Acesse "Meus Programas" para mais detalhes
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                    <span>Redirecionando...</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600">Início</span>
                      <span className="font-semibold text-gray-900">
                        {new Date(program.data_inicio).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600">Término</span>
                      <span className="font-semibold text-gray-900">
                        {new Date(program.data_fim).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    {program.duracao && (
                      <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <span className="text-gray-600">Duração</span>
                        <span className="font-semibold text-gray-900">{program.duracao}</span>
                      </div>
                    )}
                    {program.vagas !== null && program.vagas !== undefined && (
                      <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <span className="text-gray-600">Vagas</span>
                        <span className={`font-semibold ${
                          program.vagas === 0 ? 'text-red-600' :
                          program.vagas <= 5 ? 'text-orange-600' :
                          'text-gray-900'
                        }`}>
                          {program.vagas === 0 ? 'Esgotadas' : program.vagas}
                        </span>
                      </div>
                    )}
                    {program.local && (
                      <div className="flex justify-between items-center py-3">
                        <span className="text-gray-600">Local</span>
                        <span className="font-semibold text-gray-900 text-right">{program.local}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleEnroll}
                    disabled={enrolling || program.status !== 'ativo' || (program.vagas !== null && program.vagas <= 0)}
                    className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {enrolling ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Inscrevendo...</span>
                      </div>
                    ) : program.vagas !== null && program.vagas <= 0 ? (
                      'Vagas Esgotadas'
                    ) : program.status === 'ativo' ? (
                      'Inscrever-se Agora'
                    ) : program.status === 'em_breve' ? (
                      'Em Breve'
                    ) : (
                      'Encerrado'
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Ao se inscrever, você concorda com nossos termos e condições
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast de Erro */}
      {error && program && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-50 max-w-md animate-slide-in">
          <div className="bg-red-50 border-2 border-red-400 rounded-xl shadow-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <AlertCircle className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-red-900 mb-1">Erro ao se inscrever</h3>
                <p className="text-sm text-red-800">{error}</p>
              </div>
              <button
                onClick={() => setError('')}
                className="flex-shrink-0 text-red-600 hover:text-red-800"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgramDetail
