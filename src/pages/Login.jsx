import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Mail, Lock, AlertCircle, ArrowRight, CheckCircle, X } from 'lucide-react'
import loginImage from '../assets/image1.jpeg'

const Login = () => {
  const navigate = useNavigate()
  const { login, isLoading, error, clearError, isAuthenticated, user } = useAuthStore()
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  })
  const [showToast, setShowToast] = useState(false)
  const [successToast, setSuccessToast] = useState(false)

  // Redirecionar se já estiver autenticado (apenas na montagem inicial)
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('Usuário já autenticado, redirecionando...')
      const redirectPath = user.role === 'admin' ? '/admin' : '/dashboard'
      navigate(redirectPath, { replace: true })
    }
  }, [])    
  useEffect(() => {
    if (error) {
      setShowToast(true)
      // Auto-fechar após 8 segundos (mais tempo para contas desativadas)
      const timer = setTimeout(() => {
        setShowToast(false)
        clearError()
      }, 8000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (error) {
      clearError()
      setShowToast(false)
    }
  }

  const handleCloseToast = () => {
    setShowToast(false)
    clearError()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Iniciando processo de login...')
    
    try {
      const result = await login(formData)
      
      // Se chegou aqui, o login foi bem-sucedido
      console.log('Login bem-sucedido! Resultado:', result)
      
      // Verificar se o login foi realmente bem-sucedido
      if (!result || !result.data?.user) {
        console.error('Login falhou - sem dados de usuário')
        return
      }
      
      // Mostrar toast de sucesso
      setSuccessToast(true)
      
      // Redirecionar baseado na role do usuário
      const userRole = result.data.user.role
      const redirectPath = userRole === 'admin' ? '/admin' : '/dashboard'
      
      console.log('Role do usuário:', userRole)
      console.log('Redirecionando para:', redirectPath)
      
      // Aguardar 1 segundo para mostrar o toast antes de redirecionar
      setTimeout(() => {
        navigate(redirectPath, { replace: true })
      }, 2000)
    } catch (err) {
      // Erro capturado - usuário inativo, senha errada, etc.
      console.error('Erro no login:', err)
      console.error('Status:', err.response?.status)
      console.error('Mensagem:', err.response?.data?.message)
      return
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-gray-100 px-4 py-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{animationDelay: '4s'}}></div>
      
      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Entrar na sua conta</h2>
          <p className="text-gray-600">Bem-vindo de volta ao EJA</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition text-gray-900"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-semibold text-gray-900 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="senha"
                  name="senha"
                  type="password"
                  required
                  value={formData.senha}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition text-gray-900"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-prim-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                  Lembrar por 30 dias
                </label>
              </div>

              <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700 font-semibold">
                Esqueceu?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all font-bold text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Entrando...</span>
                </>
              ) : (
                <>
                  <span>Entrar</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Não tem uma conta?</span>
              </div>
            </div>

            <Link 
              to="/register" 
              className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all"
            >
              Criar conta gratuitamente
            </Link>
          </div>
        </div>
      </div>

      {/* Toast de Sucesso */}
      {successToast && (
        <div className="fixed top-4 right-4 z-50 max-w-md animate-slide-in">
          <div className="rounded-xl shadow-2xl border-2 bg-green-50 border-green-400 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 text-green-600">
                  <CheckCircle size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base mb-1 text-green-900">
                    Login realizado com sucesso!
                  </h3>
                  <p className="text-sm text-green-800">
                    Redirecionando para o painel...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast de Erro */}
      {showToast && error && (
        <div className="fixed top-4 right-4 z-[9999] max-w-md animate-slide-in">
          <div className={`rounded-xl shadow-2xl border-2 overflow-hidden ${
            error.includes('desativada') || error.includes('inativa')
              ? 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-400'
              : 'bg-gradient-to-br from-red-50 to-red-100 border-red-400'
          }`}>
            <div className="p-5">
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  error.includes('desativada') || error.includes('inativa')
                    ? 'bg-orange-500'
                    : 'bg-red-500'
                }`}>
                  <AlertCircle className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-lg mb-1 ${
                    error.includes('desativada') || error.includes('inativa')
                      ? 'text-orange-900'
                      : 'text-red-900'
                  }`}>
                    {error.includes('desativada') || error.includes('inativa') 
                      ? '⚠️ Conta Desativada' 
                      : '❌ Erro ao fazer login'
                    }
                  </h3>
                  <p className={`text-sm mb-2 font-medium ${
                    error.includes('desativada') || error.includes('inativa')
                      ? 'text-orange-800'
                      : 'text-red-800'
                  }`}>
                    {error}
                  </p>
                  
                  {(error.includes('desativada') || error.includes('inativa')) && (
                    <div className="mt-3 pt-3 border-t border-orange-300 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-orange-600">📧</span>
                        <a 
                          href="mailto:quetaboost@gmail.com" 
                          className="text-sm text-orange-700 hover:text-orange-900 underline font-medium"
                        >
                          quetaboost@gmail.com
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-600">📞</span>
                        <a 
                          href="https://wa.me/244954931747" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-orange-700 hover:text-orange-900 underline font-medium"
                        >
                          +244 954 931 747 (WhatsApp)
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleCloseToast}
                  className={`flex-shrink-0 hover:opacity-70 transition-opacity ${
                    error.includes('desativada') || error.includes('inativa')
                      ? 'text-orange-600'
                      : 'text-red-600'
                  }`}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login
