import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { User, Mail, Lock, Calendar, Phone, MapPin, AlertCircle } from 'lucide-react'

const Register = () => {
  const navigate = useNavigate()
  const { register, isLoading, error, clearError } = useAuthStore()
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
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    clearError()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.senha !== formData.confirmacao_senha) {
      alert('As senhas não coincidem')
      return
    }

    try {
      await register(formData)
      navigate('/dashboard')
    } catch (err) {
      // Error is handled by the store
    }
  }

  return (
    <div className="min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Criar Conta</h2>
          <p className="mt-2 text-gray-600">Junte-se à comunidade EJA</p>
        </div>

        <div className="card">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações Pessoais */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informações Pessoais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informações Acadêmicas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Senha */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Segurança</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">
                    Senha *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      id="senha"
                      name="senha"
                      type="password"
                      required
                      minLength={6}
                      value={formData.senha}
                      onChange={handleChange}
                      className="input pl-10"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmacao_senha" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar Senha *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      id="confirmacao_senha"
                      name="confirmacao_senha"
                      type="password"
                      required
                      minLength={6}
                      value={formData.confirmacao_senha}
                      onChange={handleChange}
                      className="input pl-10"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center">
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
              className="btn btn-primary w-full"
            >
              {isLoading ? 'Criando conta...' : 'Criar Conta'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
