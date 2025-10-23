import { useEffect, useState } from 'react'
import { adminService } from '../../services/adminService'
import { Users, BookOpen, Calendar, TrendingUp, AlertCircle, CheckCircle, Clock, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const response = await adminService.getDashboard()
      setStats(response.data)
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total de Membros',
      value: stats?.totalMembers || 0,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Programas Ativos',
      value: stats?.activePrograms || 0,
      icon: Calendar,
      color: 'bg-green-500',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Artigos Publicados',
      value: stats?.totalArticles || 0,
      icon: BookOpen,
      color: 'bg-purple-500',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Inscrições Totais',
      value: stats?.totalEnrollments || 0,
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+15%',
      changeType: 'positive'
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Visão geral do sistema EJA</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="text-white" size={24} />
                </div>
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Charts and Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Novos Membros */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Novos Membros (30 dias)</h2>
            <UserPlus className="text-gray-400" size={20} />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                  MS
                </div>
                <div>
                  <p className="font-medium text-gray-900">Maria Santos</p>
                  <p className="text-sm text-gray-600">maria@example.com</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">Hoje</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  JP
                </div>
                <div>
                  <p className="font-medium text-gray-900">João Pedro</p>
                  <p className="text-sm text-gray-600">joao@example.com</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">Ontem</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  AC
                </div>
                <div>
                  <p className="font-medium text-gray-900">Ana Costa</p>
                  <p className="text-sm text-gray-600">ana@example.com</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 dias atrás</span>
            </div>
          </div>
          <Link to="/admin/users" className="block mt-4 text-center text-primary-600 hover:text-primary-700 font-medium text-sm">
            Ver todos os usuários →
          </Link>
        </div>

        {/* Atividades Recentes */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Atividades Recentes</h2>
            <Clock className="text-gray-400" size={20} />
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-medium text-gray-900">Novo programa criado</p>
                <p className="text-sm text-gray-600">Workshop de Marketing Digital</p>
                <p className="text-xs text-gray-500 mt-1">Há 2 horas</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
              <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-medium text-gray-900">Artigo publicado</p>
                <p className="text-sm text-gray-600">10 Dicas para Empreendedores</p>
                <p className="text-xs text-gray-500 mt-1">Há 5 horas</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
              <Users className="text-purple-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-medium text-gray-900">Nova inscrição</p>
                <p className="text-sm text-gray-600">Maria Santos - Curso de Empreendedorismo</p>
                <p className="text-xs text-gray-500 mt-1">Há 1 dia</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            to="/admin/articles/new"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center"
          >
            <BookOpen className="mx-auto mb-2 text-gray-400" size={24} />
            <p className="font-medium text-gray-700">Novo Artigo</p>
          </Link>
          <Link
            to="/admin/programs/new"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-center"
          >
            <Calendar className="mx-auto mb-2 text-gray-400" size={24} />
            <p className="font-medium text-gray-700">Novo Programa</p>
          </Link>
          <Link
            to="/admin/users"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
          >
            <Users className="mx-auto mb-2 text-gray-400" size={24} />
            <p className="font-medium text-gray-700">Gerenciar Usuários</p>
          </Link>
          <Link
            to="/admin/reports"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-center"
          >
            <TrendingUp className="mx-auto mb-2 text-gray-400" size={24} />
            <p className="font-medium text-gray-700">Ver Relatórios</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
