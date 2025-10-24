import { useAuthStore } from '../store/authStore'
import { Calendar, BookOpen, Users, TrendingUp } from 'lucide-react'
import { useMyPrograms } from '../hooks/usePrograms'
import { useSavedArticles } from '../hooks/useArticles'
import { useState, useEffect } from 'react'
import api from '../services/api'

const Dashboard = () => {
  const { user } = useAuthStore()
  const { programs } = useMyPrograms()
  const { articles: savedArticles } = useSavedArticles()
  const [upcomingPrograms, setUpcomingPrograms] = useState([])
  const [recommendedArticles, setRecommendedArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // Buscar próximos programas
      const programsRes = await api.get('/programs')
      const upcoming = programsRes.data.data.filter(p => 
        new Date(p.data_inicio) > new Date()
      ).slice(0, 2)
      setUpcomingPrograms(upcoming)

      // Buscar artigos recomendados
      const articlesRes = await api.get('/blog/articles?limit=2')
      setRecommendedArticles(articlesRes.data.data.articles || [])
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const stats = [
    { label: 'Programas Inscritos', value: programs.inscritos.length.toString(), icon: Calendar, color: 'bg-blue-500' },
    { label: 'Artigos Salvos', value: savedArticles.length.toString(), icon: BookOpen, color: 'bg-green-500' },
    { label: 'Programas Disponíveis', value: programs.disponiveis.length.toString(), icon: Users, color: 'bg-purple-500' },
    { label: 'Programas Concluídos', value: programs.concluidos.length.toString(), icon: TrendingUp, color: 'bg-orange-500' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Olá, {user?.nome_completo?.split(' ')[0]}! 👋
        </h2>
        <p className="text-gray-600">
          Aqui está um resumo da sua atividade na plataforma
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Próximos Eventos</h3>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
            </div>
          ) : upcomingPrograms.length === 0 ? (
            <p className="text-gray-600 text-center py-8">Nenhum evento próximo</p>
          ) : (
            <div className="space-y-4">
              {upcomingPrograms.map((program) => (
                <div key={program.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="text-primary-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">{program.titulo}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(program.data_inicio).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Artigos Recomendados</h3>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
            </div>
          ) : recommendedArticles.length === 0 ? (
            <p className="text-gray-600 text-center py-8">Nenhum artigo disponível</p>
          ) : (
            <div className="space-y-4">
              {recommendedArticles.map((article) => (
                <div key={article.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <BookOpen className="text-primary-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">{article.titulo}</p>
                    <p className="text-sm text-gray-600">{article.categoria}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
