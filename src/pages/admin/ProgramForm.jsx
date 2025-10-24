import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { adminService } from '../../services/adminService'
import { ArrowLeft, Save, Calendar, MapPin, Users } from 'lucide-react'

const ProgramForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id

  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, type: '', message: '' })
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tipo: '',
    data_inicio: '',
    data_fim: '',
    local: '',
    vagas: '',
    status: 'em_breve'
  })

  useEffect(() => {
    if (isEditing) {
      loadProgram()
    }
  }, [id])

  const loadProgram = async () => {
    try {
      setLoading(true)
      const response = await adminService.getProgramById(id)
      const program = response.data
      setFormData({
        titulo: program.titulo || '',
        descricao: program.descricao || '',
        tipo: program.tipo || '',
        data_inicio: program.data_inicio ? program.data_inicio.split('T')[0] : '',
        data_fim: program.data_fim ? program.data_fim.split('T')[0] : '',
        local: program.local || '',
        vagas: program.vagas || '',
        status: program.status || 'em_breve'
      })
    } catch (error) {
      console.error('Erro ao carregar programa:', error)
      showToast('error', 'Erro ao carregar programa')
    } finally {
      setLoading(false)
    }
  }

  const showToast = (type, message) => {
    setToast({ show: true, type, message })
    setTimeout(() => {
      setToast({ show: false, type: '', message: '' })
    }, 5000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validações
    if (!formData.titulo || !formData.tipo || !formData.data_inicio || !formData.data_fim || !formData.local || !formData.descricao) {
      showToast('error', 'Preencha todos os campos obrigatórios')
      return
    }

    if (formData.titulo.length < 5) {
      showToast('error', 'O título deve ter no mínimo 5 caracteres')
      return
    }

    if (formData.descricao.length < 20) {
      showToast('error', 'A descrição deve ter no mínimo 20 caracteres')
      return
    }

    if (formData.data_fim < formData.data_inicio) {
      showToast('error', 'A data de fim deve ser maior ou igual à data de início')
      return
    }

    try {
      setLoading(true)
      console.log('Dados sendo enviados:', formData)
      
      if (isEditing) {
        const response = await adminService.updateProgram(id, formData)
        console.log('Resposta da atualização:', response)
        showToast('success', 'Programa atualizado com sucesso!')
      } else {
        const response = await adminService.createProgram(formData)
        console.log('Resposta da criação:', response)
        showToast('success', 'Programa criado com sucesso!')
      }
      setTimeout(() => navigate('/admin/programs'), 1500)
    } catch (error) {
      console.error('Erro ao salvar programa:', error)
      console.error('Detalhes do erro:', error.response?.data)
      
      // Mostrar erros de validação detalhados
      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors.map(err => err.message).join(', ')
        console.error('Erros de validação:', errorMessages)
        showToast('error', `Erro de validação: ${errorMessages}`)
      } else {
        showToast('error', error.response?.data?.message || 'Erro ao salvar programa')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/admin/programs')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar para programas
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {isEditing ? 'Editar Programa' : 'Novo Programa'}
        </h1>
        <p className="text-gray-600">
          {isEditing ? 'Atualize as informações do programa' : 'Crie um novo programa, curso ou evento'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8">
        {/* Título */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título * <span className="text-xs text-gray-500">(mínimo 5 caracteres)</span>
          </label>
          <input
            type="text"
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            className="input"
            placeholder="Digite o título do programa"
            required
            minLength={5}
            maxLength={200}
          />
          {formData.titulo && formData.titulo.length < 5 && (
            <p className="text-xs text-red-600 mt-1">Mínimo 5 caracteres</p>
          )}
        </div>

        {/* Tipo e Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo *
            </label>
            <select
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
              className="input"
              required
            >
              <option value="">Selecione um tipo</option>
              <option value="workshop">Workshop</option>
              <option value="curso">Curso</option>
              <option value="mentoria">Mentoria</option>
              <option value="evento">Evento</option>
              <option value="networking">Networking</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="input"
              required
            >
              <option value="em_breve">Em Breve</option>
              <option value="ativo">Ativo</option>
              <option value="encerrado">Encerrado</option>
            </select>
          </div>
        </div>

        {/* Descrição */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição * <span className="text-xs text-gray-500">(mínimo 20 caracteres)</span>
          </label>
          <textarea
            value={formData.descricao}
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            className="input min-h-[120px]"
            placeholder="Descreva o programa..."
            required
            minLength={20}
          />
          {formData.descricao && formData.descricao.length < 20 && (
            <p className="text-xs text-red-600 mt-1">Mínimo 20 caracteres ({formData.descricao.length}/20)</p>
          )}
        </div>

        {/* Datas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar size={16} className="inline mr-1" />
              Data de Início *
            </label>
            <input
              type="date"
              value={formData.data_inicio}
              onChange={(e) => setFormData({ ...formData, data_inicio: e.target.value })}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar size={16} className="inline mr-1" />
              Data de Fim *
            </label>
            <input
              type="date"
              value={formData.data_fim}
              onChange={(e) => setFormData({ ...formData, data_fim: e.target.value })}
              className="input"
              required
            />
          </div>
        </div>

        {/* Local */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin size={16} className="inline mr-1" />
            Local *
          </label>
          <input
            type="text"
            value={formData.local}
            onChange={(e) => setFormData({ ...formData, local: e.target.value })}
            className="input"
            placeholder="Ex: Auditório Principal, Online, etc."
            required
          />
        </div>

        {/* Vagas */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users size={16} className="inline mr-1" />
            Número de Vagas
          </label>
          <input
            type="number"
            value={formData.vagas}
            onChange={(e) => setFormData({ ...formData, vagas: e.target.value })}
            className="input"
            placeholder="Ex: 30 (deixe vazio para ilimitado)"
            min="1"
          />
        </div>

        {/* Botões */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate('/admin/programs')}
            className="btn bg-gray-200 text-gray-700 hover:bg-gray-300"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary inline-flex items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Salvando...
              </>
            ) : (
              <>
                <Save size={18} />
                {isEditing ? 'Atualizar Programa' : 'Criar Programa'}
              </>
            )}
          </button>
        </div>
      </form>

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
              {toast.type === 'success' ? '✓' : '✕'}
            </div>
            <p className="font-medium">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgramForm
