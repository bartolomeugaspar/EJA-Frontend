import { useEffect, useState } from 'react'
import { adminService } from '../../services/adminService'
import { Search, Plus, Edit, Trash2, Eye, CheckCircle, XCircle } from 'lucide-react'

const AdminArticles = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = async () => {
    try {
      setLoading(true)
      const response = await adminService.getArticles()
      console.log('Resposta da API:', response)
      setArticles(response.data?.articles || [])
    } catch (error) {
      console.error('Erro ao carregar artigos:', error)
      setArticles([]) // Garantir que articles seja sempre um array
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteArticle = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este artigo?')) {
      try {
        await adminService.deleteArticle(id)
        loadArticles()
      } catch (error) {
        console.error('Erro ao deletar artigo:', error)
      }
    }
  }

  const filteredArticles = articles.filter(article =>
    article.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.categoria?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestão de Artigos</h1>
          <p className="text-gray-600">Gerencie o conteúdo do blog</p>
        </div>
        <button className="btn btn-primary inline-flex items-center">
          <Plus size={20} className="mr-2" />
          Novo Artigo
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Pesquisar artigos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">Nenhum artigo encontrado</p>
          </div>
        ) : (
          filteredArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
              {article.imagem_capa && (
                <img src={article.imagem_capa} alt={article.titulo} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                    {article.categoria}
                  </span>
                  {article.publicado ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : (
                    <XCircle className="text-gray-400" size={20} />
                  )}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{article.titulo}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{article.conteudo}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{article.visualizacoes || 0} visualizações</span>
                  <span>{new Date(article.created_at).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200 font-medium text-sm">
                    <Eye size={18} />
                    <span>Ver</span>
                  </button>
                  <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-all duration-200 font-medium text-sm">
                    <Edit size={18} />
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={() => handleDeleteArticle(article.id)}
                    className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 border border-red-200 hover:border-red-300"
                    title="Deletar artigo"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AdminArticles
