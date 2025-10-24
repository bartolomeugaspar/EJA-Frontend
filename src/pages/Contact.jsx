import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import api from '../services/api'

const Contact = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await api.post('/contact', formData)
      setSuccess(true)
      setFormData({
        nome: '',
        email: '',
        assunto: '',
        mensagem: ''
      })
      
      // Limpar mensagem de sucesso após 5 segundos
      setTimeout(() => setSuccess(false), 5000)
      
      // Notificar o sistema que há uma nova mensagem (se houver admin logado)
      // O contador será atualizado automaticamente pelo polling no AdminHeader
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao enviar mensagem. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Contato</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Entre em Contato</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Mail className="text-primary-600 mt-1" size={20} />
              <div>
                <p className="font-medium">Email Corporativo</p>
                <p className="text-gray-600">quetaboost@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="text-primary-600 mt-1" size={20} />
              <div>
                <p className="font-medium">Telefone & WhatsApp</p>
                <p className="text-gray-600">+244 954 931 747</p>
                <p className="text-gray-600 text-sm mt-1">Atendimento: +244 942 301 884</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="text-primary-600 mt-1" size={20} />
              <div>
                <p className="font-medium">Nosso Escritório</p>
                <p className="text-gray-600">Rua Principal, Nº 123</p>
                <p className="text-gray-600">Luanda, Angola</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Envie uma Mensagem</h2>
          
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-green-800 font-medium">Mensagem enviada com sucesso!</p>
                <p className="text-green-700 text-sm">Entraremos em contato em breve.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="input"
                placeholder="Seu nome"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                placeholder="seu@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assunto *</label>
              <input
                type="text"
                name="assunto"
                value={formData.assunto}
                onChange={handleChange}
                className="input"
                placeholder="Assunto da mensagem"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem *</label>
              <textarea
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                className="input"
                rows="4"
                placeholder="Sua mensagem"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Enviar Mensagem
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
