import { useState } from 'react'
import { BookOpen, Calendar, User, Bookmark, Trash2, ExternalLink } from 'lucide-react'

const SavedArticles = () => {
  const [articles, setArticles] = useState([
    {
      id: 1,
      titulo: 'Como Validar Sua Ideia de Negócio',
      resumo: 'Aprenda técnicas essenciais para validar sua ideia antes de investir tempo e dinheiro...',
      autor: 'João Silva',
      data_publicacao: '2024-01-15',
      categoria: 'Empreendedorismo',
      imagem: '/api/placeholder/400/250',
      data_salvo: '2024-01-20'
    },
    {
      id: 2,
      titulo: '10 Erros Comuns de Startups Iniciantes',
      resumo: 'Conheça os principais erros que startups cometem e como evitá-los...',
      autor: 'Maria Santos',
      data_publicacao: '2024-01-10',
      categoria: 'Startups',
      imagem: '/api/placeholder/400/250',
      data_salvo: '2024-01-18'
    },
    {
      id: 3,
      titulo: 'Marketing Digital para Pequenos Negócios',
      resumo: 'Estratégias de marketing digital acessíveis para pequenos empreendedores...',
      autor: 'Pedro Costa',
      data_publicacao: '2024-01-05',
      categoria: 'Marketing',
      imagem: '/api/placeholder/400/250',
      data_salvo: '2024-01-15'
    }
  ])

  const handleRemove = (id) => {
    if (confirm('Deseja remover este artigo dos salvos?')) {
      setArticles(articles.filter(article => article.id !== id))
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Artigos Salvos</h1>
        <p className="text-gray-600 mt-2">Seus artigos favoritos em um só lugar</p>
      </div>

      {articles.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Bookmark className="mx-auto text-gray-400 mb-4" size={64} />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum artigo salvo</h3>
          <p className="text-gray-600 mb-6">Comece a salvar artigos interessantes para ler depois</p>
          <a
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
          >
            <BookOpen size={20} />
            Explorar Artigos
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="h-48 md:h-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                    <BookOpen className="text-white" size={64} />
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full mb-2">
                        {article.categoria}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{article.titulo}</h3>
                      <p className="text-gray-600 text-sm mb-4">{article.resumo}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      {article.autor}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(article.data_publicacao).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Bookmark size={14} />
                      Salvo em {new Date(article.data_salvo).toLocaleDateString('pt-BR')}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                      <ExternalLink size={16} />
                      Ler Artigo
                    </button>
                    <button
                      onClick={() => handleRemove(article.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                    >
                      <Trash2 size={16} />
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {articles.length > 0 && (
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Você tem <strong>{articles.length}</strong> {articles.length === 1 ? 'artigo salvo' : 'artigos salvos'}
          </p>
        </div>
      )}
    </div>
  )
}

export default SavedArticles
