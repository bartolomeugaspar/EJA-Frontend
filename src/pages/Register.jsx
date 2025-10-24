import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Calendar, Phone, MapPin, AlertCircle, CheckCircle } from 'lucide-react'
import api from '../services/api'

const Register = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    nome_completo: '',
    email: '',
    data_nascimento: '',
    genero: '',
    nivel_escolaridade: '',
    area_interesse: '',
    telefone: '',
    endereco: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await api.post('/members', formData)
      setSuccess(true)
      setTimeout(() => {
        navigate('/')
      }, 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao enviar candidatura. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-gray-100 px-4 py-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={40} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Candidatura Enviada!</h2>
          <p className="text-gray-600 mb-6">
            Sua candidatura foi recebida com sucesso. Nossa equipe irá analisá-la e entraremos em contato em breve.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Você receberá um e-mail de confirmação em <strong>{formData.email}</strong>
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
          >
            Voltar para Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-gray-100 px-4 py-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{animationDelay: '4s'}}></div>
      
      <div className="max-w-2xl w-full relative z-10">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Candidatura de Membro</h2>
          <p className="text-sm text-gray-600">Junte-se à comunidade EJA e transforme seu futuro empreendedor</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-4 border border-white/20">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Informações Pessoais */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2 pb-1.5 border-b border-gray-200">Informações Pessoais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                <div className="md:col-span-2">
                  <label htmlFor="nome_completo" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      id="nome_completo"
                      name="nome_completo"
                      type="text"
                      required
                      value={formData.nome_completo}
                      onChange={handleChange}
                      className="input pl-10"
                      placeholder="João Silva"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input pl-10"
                      placeholder="joao@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      id="telefone"
                      name="telefone"
                      type="tel"
                      value={formData.telefone}
                      onChange={handleChange}
                      className="input pl-10"
                      placeholder="+244 923 456 789"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="data_nascimento" className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Nascimento *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      id="data_nascimento"
                      name="data_nascimento"
                      type="date"
                      required
                      max={new Date().toISOString().split('T')[0]}
                      value={formData.data_nascimento}
                      onChange={handleChange}
                      className="input pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="genero" className="block text-sm font-medium text-gray-700 mb-1">
                    Gênero *
                  </label>
                  <select
                    id="genero"
                    name="genero"
                    required
                    value={formData.genero}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="">Selecione...</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                    <option value="prefiro_nao_dizer">Prefiro não dizer</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Informações Acadêmicas */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2 pb-1.5 border-b border-gray-200">Informações Acadêmicas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                <div>
                  <label htmlFor="nivel_escolaridade" className="block text-sm font-medium text-gray-700 mb-1">
                    Nível de Escolaridade *
                  </label>
                  <select
                    id="nivel_escolaridade"
                    name="nivel_escolaridade"
                    required
                    value={formData.nivel_escolaridade}
                    onChange={handleChange}
                    className="input"
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
                  <label htmlFor="area_interesse" className="block text-sm font-medium text-gray-700 mb-1">
                    Área de Interesse *
                  </label>
                  <input
                    id="area_interesse"
                    name="area_interesse"
                    type="text"
                    required
                    value={formData.area_interesse}
                    onChange={handleChange}
                    className="input"
                    placeholder="Ex: Tecnologia, Marketing, Finanças"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="endereco" className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      id="endereco"
                      name="endereco"
                      type="text"
                      value={formData.endereco}
                      onChange={handleChange}
                      className="input pl-10"
                      placeholder="Luanda, Angola"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center pt-2">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                Concordo com os{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700">
                  Termos de Uso
                </a>{' '}
                e{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700">
                  Política de Privacidade
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all font-bold text-sm shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-3"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Enviando candidatura...</span>
                </div>
              ) : (
                'Enviar Candidatura'
              )}
            </button>

            <p className="text-center text-xs text-gray-600 mt-4">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
                Fazer Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
