import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useArticles } from '../hooks/useArticles'
import { Calendar, User, Clock, ArrowRight, Search } from 'lucide-react'

const Blog = () => {
  const { articles, loading, error } = useArticles()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredArticles = Array.isArray(articles) ? articles.filter(article => {
    const matchesSearch = article.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.conteudo?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || article.categoria === selectedCategory
    return matchesSearch && matchesCategory
  }) : []

  const categories = ['all', ...new Set(Array.isArray(articles) ? articles.map(a => a.categoria).filter(Boolean) : [])]

  if (loading) {
    return (
      <div className="container-custom py-12">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container-custom py-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog EJA</h1>
          <p className="text-xl text-yellow-50">Artigos e conteúdos sobre empreendedorismo</p>
        </div>
      </section>

      <div className="container-custom py-12">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Pesquisar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="all">Todas as Categorias</option>
              {categories.filter(c => c !== 'all').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum artigo encontrado</h3>
            <p className="text-gray-600">Tente ajustar os filtros de pesquisa</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <article key={article.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                {article.imagem_capa && (
                  <img
                    src={article.imagem_capa}
                    alt={article.titulo}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      {article.categoria}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {article.titulo}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.conteudo.replace(/<[^>]*>/g, '').substring(0, 150)}...
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User size={16} />
                      <span>{article.users?.nome_completo || 'Autor'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{new Date(article.created_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${article.id}`}
                    className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium"
                  >
                    Ler mais
                    <ArrowRight className="ml-1" size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
