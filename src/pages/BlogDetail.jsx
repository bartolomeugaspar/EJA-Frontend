import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Calendar, User, ArrowLeft, AlertCircle, Clock, Tag } from 'lucide-react'
import api from '../services/api'

const BlogDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get(`/blog/articles/${id}`)
        console.log('Resposta da API:', response.data)
        setArticle(response.data.data || response.data.article)
      } catch (err) {
        setError('Erro ao carregar artigo')
        console.error('Erro ao buscar artigo:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error && !article) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md w-full text-center">
          <AlertCircle className="mx-auto text-red-600 mb-4" size={48} />
          <p className="text-red-600 mb-4">{error}</p>
          <Link to="/blog" className="btn btn-primary">
            Voltar para Blog
          </Link>
        </div>
      </div>
    )
  }

  if (!article) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-96 bg-gradient-to-r from-yellow-500 to-yellow-600">
        {article.imagem && (
          <>
            <img
              src={article.imagem}
              alt={article.titulo}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
          </>
        )}
        
        <div className="relative container-custom h-full flex flex-col justify-end pb-12 px-4">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-8 left-4 md:left-0 flex items-center gap-2 text-white hover:text-gray-200 transition"
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>

          {article.categoria && (
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold border border-white/30">
                {article.categoria}
              </span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {article.titulo}
          </h1>

          <div className="flex flex-wrap gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <User size={20} />
              <span>{article.users?.nome_completo || 'Autor'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>{new Date(article.created_at).toLocaleDateString('pt-BR')}</span>
            </div>
            {article.tempo_leitura && (
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>{article.tempo_leitura} min de leitura</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container-custom py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line text-base sm:text-lg">
                {article.conteudo}
              </div>
            </div>

            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag size={20} className="text-gray-400" />
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-gray-200">
              <Link
                to="/blog"
                className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-semibold"
              >
                <ArrowLeft size={20} className="mr-2" />
                Voltar para o Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
