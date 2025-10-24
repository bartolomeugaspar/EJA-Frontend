import { useState } from 'react'
import { usePrograms } from '../hooks/usePrograms'
import { Calendar, MapPin, Users, Clock, ArrowRight, Search, Filter } from 'lucide-react'
import { Link } from 'react-router-dom'

const Programs = () => {
  const { programs, loading, error } = usePrograms()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || program.tipo === selectedType
    return matchesSearch && matchesType
  })

  const types = ['all', ...new Set(programs.map(p => p.tipo))]

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Programas e Eventos</h1>
          <p className="text-xl text-yellow-50">Workshops, cursos e eventos para impulsionar seu negócio</p>
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
                placeholder="Pesquisar programas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="all">Todos os Tipos</option>
              {types.filter(t => t !== 'all').map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Programs Grid */}
        {filteredPrograms.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Calendar className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum programa encontrado</h3>
            <p className="text-gray-600">Tente ajustar os filtros de pesquisa ou volte mais tarde</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <div key={program.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                {program.imagem && (
                  <img
                    src={program.imagem}
                    alt={program.titulo}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {program.tipo}
                    </span>
                    {program.vagas && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {program.vagas} vagas
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {program.titulo}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {program.descricao}
                  </p>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>
                        {new Date(program.data_inicio).toLocaleDateString('pt-BR')} - {new Date(program.data_fim).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    {program.local && (
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{program.local}</span>
                      </div>
                    )}
                    {program.duracao && (
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{program.duracao}</span>
                      </div>
                    )}
                  </div>
                  <Link
                    to={`/programs/${program.id}`}
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition font-medium"
                  >
                    Ver Detalhes
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Programs
