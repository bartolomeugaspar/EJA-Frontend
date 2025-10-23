import { useAuthStore } from '../store/authStore'
import { Calendar, BookOpen, Users, TrendingUp } from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuthStore()

  const stats = [
    { label: 'Programas Inscritos', value: '3', icon: Calendar, color: 'bg-blue-500' },
    { label: 'Artigos Lidos', value: '12', icon: BookOpen, color: 'bg-green-500' },
    { label: 'Conexões', value: '45', icon: Users, color: 'bg-purple-500' },
    { label: 'Progresso', value: '68%', icon: TrendingUp, color: 'bg-orange-500' },
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
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="text-primary-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="font-medium text-gray-900">Workshop de Marketing Digital</p>
                <p className="text-sm text-gray-600">15 de Novembro, 2025</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="text-primary-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="font-medium text-gray-900">Curso de Empreendedorismo</p>
                <p className="text-sm text-gray-600">20 de Novembro, 2025</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Artigos Recomendados</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <BookOpen className="text-primary-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="font-medium text-gray-900">10 Dicas para Empreendedores</p>
                <p className="text-sm text-gray-600">Leitura de 5 min</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <BookOpen className="text-primary-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="font-medium text-gray-900">Marketing Digital para Startups</p>
                <p className="text-sm text-gray-600">Leitura de 8 min</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
