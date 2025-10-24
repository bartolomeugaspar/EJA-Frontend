import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { adminService } from '../../services/adminService'
import { ArrowLeft, Save, Eye, Upload, X } from 'lucide-react'

const ArticleForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id

  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, type: '', message: '' })
  const [formData, setFormData] = useState({
    titulo: '',
    conteudo: '',
    categoria: '',
    tags: [],
    imagem_capa: '',
    publicado: false
  })
  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    if (isEditing) {
      loadArticle()
    }
  }, [id])

  const loadArticle = async () => {
    try {
      setLoading(true)
      const response = await adminService.getArticleById(id)
      const article = response.data
      setFormData({
        titulo: article.titulo || '',
        conteudo: article.conteudo || '',
        categoria: article.categoria || '',
        tags: article.tags || [],
        imagem_capa: article.imagem_capa || '',
        publicado: article.publicado || false
      })
    } catch (error) {
      console.error('Erro ao carregar artigo:', error)
      showToast('error', 'Erro ao carregar artigo')
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

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      })
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.titulo || !formData.conteudo || !formData.categoria) {
      showToast('error', 'Preencha todos os campos obrigatórios')
      return
    }

    try {
      setLoading(true)
      if (isEditing) {
        await adminService.updateArticle(id, formData)
        showToast('success', 'Artigo atualizado com sucesso!')
      } else {
        await adminService.createArticle(formData)
        showToast('success', 'Artigo criado com sucesso!')
      }
      setTimeout(() => navigate('/admin/articles'), 1500)
    } catch (error) {
      console.error('Erro ao salvar artigo:', error)
      showToast('error', error.response?.data?.message || 'Erro ao salvar artigo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/admin/articles')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar para artigos
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {isEditing ? 'Editar Artigo' : 'Novo Artigo'}
        </h1>
        <p className="text-gray-600">
          {isEditing ? 'Atualize as informações do artigo' : 'Crie um novo artigo para o blog'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8">
        {/* Título */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título *
          </label>
          <input
            type="text"
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            className="input"
            placeholder="Digite o título do artigo"
            required
          />
        </div>

        {/* Categoria e Publicado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria *
            </label>
            <select
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              className="input"
              required
            >
              <option value="">Selecione uma categoria</option>
              <option value="Educação">Educação</option>
              <option value="Tecnologia">Tecnologia</option>
              <option value="Saúde">Saúde</option>
              <option value="Cultura">Cultura</option>
              <option value="Ciência">Ciência</option>
              <option value="Sociedade">Sociedade</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex items-center h-full">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.publicado}
                  onChange={(e) => setFormData({ ...formData, publicado: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-700">
                  {formData.publicado ? 'Publicado' : 'Rascunho'}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Imagem de Capa */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL da Imagem de Capa
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={formData.imagem_capa}
              onChange={(e) => setFormData({ ...formData, imagem_capa: e.target.value })}
              className="input flex-1"
              placeholder="https://exemplo.com/imagem.jpg"
            />
            {formData.imagem_capa && (
              <button
                type="button"
                onClick={() => setFormData({ ...formData, imagem_capa: '' })}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <X size={20} />
              </button>
            )}
          </div>
          {formData.imagem_capa && (
            <div className="mt-3">
              <img
                src={formData.imagem_capa}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x400?text=Imagem+Inválida'
                }}
              />
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              className="input flex-1"
              placeholder="Digite uma tag e pressione Enter"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="btn btn-secondary"
            >
              Adicionar
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-blue-900"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Conteúdo */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Conteúdo *
          </label>
          <textarea
            value={formData.conteudo}
            onChange={(e) => setFormData({ ...formData, conteudo: e.target.value })}
            className="input min-h-[400px] font-mono text-sm"
            placeholder="Digite o conteúdo do artigo..."
            required
          />
          <p className="text-xs text-gray-500 mt-2">
            Dica: Use Markdown para formatação
          </p>
        </div>

        {/* Botões */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate('/admin/articles')}
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
                {isEditing ? 'Atualizar Artigo' : 'Criar Artigo'}
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

export default ArticleForm
