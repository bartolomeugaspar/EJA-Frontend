import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Plus, Edit, Trash2, Save, X, CheckCircle, XCircle } from 'lucide-react'

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    cargo: '',
    texto: '',
    imagem: '',
    ordem: 0,
    ativo: true
  })

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    try {
      setLoading(true)
      const response = await api.get('/testimonials')
      setTestimonials(response.data.data || [])
    } catch (error) {
      console.error('Erro ao carregar depoimentos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await api.put(`/testimonials/${editingId}`, formData)
      } else {
        await api.post('/testimonials', formData)
      }
      loadTestimonials()
      resetForm()
    } catch (error) {
      console.error('Erro ao salvar depoimento:', error)
      alert(error.response?.data?.message || 'Erro ao salvar depoimento')
    }
  }

  const handleEdit = (testimonial) => {
    setFormData(testimonial)
    setEditingId(testimonial.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este depoimento?')) {
      try {
        await api.delete(`/testimonials/${id}`)
        loadTestimonials()
      } catch (error) {
        console.error('Erro ao deletar depoimento:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      nome: '',
      cargo: '',
      texto: '',
      imagem: '',
      ordem: 0,
      ativo: true
    })
    setEditingId(null)
    setShowForm(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestão de Depoimentos</h1>
          <p className="text-gray-600">Gerencie os depoimentos exibidos na home</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary inline-flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Novo Depoimento
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {editingId ? 'Editar Depoimento' : 'Novo Depoimento'}
            </h2>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome *
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cargo *
                </label>
                <input
                  type="text"
                  value={formData.cargo}
                  onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                  className="input"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Depoimento *
              </label>
              <textarea
                value={formData.texto}
                onChange={(e) => setFormData({ ...formData, texto: e.target.value })}
                className="input"
                rows="4"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL da Imagem
              </label>
              <input
                type="url"
                value={formData.imagem}
                onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                className="input"
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ordem
                </label>
                <input
                  type="number"
                  value={formData.ordem}
                  onChange={(e) => setFormData({ ...formData, ordem: parseInt(e.target.value) })}
                  className="input"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">Menor número aparece primeiro</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.ativo}
                  onChange={(e) => setFormData({ ...formData, ativo: e.target.value === 'true' })}
                  className="input"
                >
                  <option value="true">Ativo</option>
                  <option value="false">Inativo</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary inline-flex items-center">
                <Save size={18} className="mr-2" />
                Salvar
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="btn bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de Depoimentos */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Cargo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Depoimento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Ordem
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {testimonials.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                  Nenhum depoimento cadastrado
                </td>
              </tr>
            ) : (
              testimonials.map((testimonial) => (
                <tr key={testimonial.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {testimonial.imagem && (
                        <img
                          src={testimonial.imagem}
                          alt={testimonial.nome}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <span className="font-medium text-gray-900">{testimonial.nome}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{testimonial.cargo}</td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="max-w-xs truncate">{testimonial.texto}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{testimonial.ordem}</td>
                  <td className="px-6 py-4">
                    {testimonial.ativo ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle size={14} className="mr-1" />
                        Ativo
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        <XCircle size={14} className="mr-1" />
                        Inativo
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(testimonial)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Editar"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Excluir"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminTestimonials
