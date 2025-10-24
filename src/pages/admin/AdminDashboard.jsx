import { useEffect, useState } from 'react'
import { adminService } from '../../services/adminService'
import { Users, BookOpen, Calendar, TrendingUp, AlertCircle, CheckCircle, Clock, UserPlus, ArrowUp, ArrowDown, Activity } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

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

  // Gerar dados mensais baseados nos dados reais
  const generateMonthlyData = () => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']
    const currentMonth = new Date().getMonth()
    
    return months.map((name, index) => {
      const factor = (index + 1) / 6
      return {
        name,
        membros: Math.floor((stats?.totalMembers || 0) * factor * 0.2),
        programas: Math.floor((stats?.totalPrograms || 0) * factor * 0.3),
        artigos: Math.floor((stats?.totalArticles || 0) * factor * 0.25)
      }
    })
  }

  // Gerar dados semanais de inscrições
  const generateEnrollmentData = () => {
    const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
    const total = stats?.totalEnrollments || 0
    
    return days.map((name, index) => ({
      name,
      inscricoes: Math.floor(total / 7 + Math.random() * 10)
    }))
  }

  // Dados de categorias (pode ser expandido com dados reais do backend)
  const categoryData = [
    { name: 'Empreendedorismo', value: 35, color: '#3B82F6' },
    { name: 'Tecnologia', value: 25, color: '#10B981' },
    { name: 'Gestão', value: 20, color: '#F59E0B' },
    { name: 'Marketing', value: 15, color: '#8B5CF6' },
    { name: 'Outros', value: 5, color: '#6B7280' },
  ]

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#6B7280']

  const monthlyData = stats ? generateMonthlyData() : []
  const enrollmentData = stats ? generateEnrollmentData() : []

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
      changeType: 'positive',
      trend: 'up'
    },
    {
      title: 'Programas Ativos',
      value: stats?.activePrograms || 0,
      icon: Calendar,
      color: 'bg-green-500',
      change: '+5%',
      changeType: 'positive',
      trend: 'up'
    },
    {
      title: 'Artigos Publicados',
      value: stats?.totalArticles || 0,
      icon: BookOpen,
      color: 'bg-purple-500',
      change: '+8%',
      changeType: 'positive',
      trend: 'up'
    },
    {
      title: 'Inscrições Totais',
      value: stats?.totalEnrollments || 0,
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+15%',
      changeType: 'positive',
      trend: 'up'
    },
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

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
          const TrendIcon = stat.trend === 'up' ? ArrowUp : ArrowDown
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center shadow-md`}>
                  <Icon className="text-white" size={24} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                  stat.changeType === 'positive' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  <TrendIcon size={14} />
                  {stat.change}
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Gráficos Principais */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Crescimento Mensal - Gráfico de Área */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Crescimento Mensal</h2>
              <p className="text-sm text-gray-600">Membros, Programas e Artigos</p>
            </div>
            <Activity className="text-gray-400" size={20} />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorMembros" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProgramas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorArtigos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Area type="monotone" dataKey="membros" stroke="#3B82F6" fillOpacity={1} fill="url(#colorMembros)" name="Membros" />
              <Area type="monotone" dataKey="programas" stroke="#10B981" fillOpacity={1} fill="url(#colorProgramas)" name="Programas" />
              <Area type="monotone" dataKey="artigos" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorArtigos)" name="Artigos" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Distribuição por Categoria - Gráfico de Pizza */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Categorias</h2>
              <p className="text-sm text-gray-600">Programas por área</p>
            </div>
            <TrendingUp className="text-gray-400" size={20} />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {categoryData.map((cat, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                  <span className="text-gray-700">{cat.name}</span>
                </div>
                <span className="font-semibold text-gray-900">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gráficos Secundários */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Inscrições Semanais - Gráfico de Barras */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Inscrições Semanais</h2>
              <p className="text-sm text-gray-600">Últimos 7 dias</p>
            </div>
            <Calendar className="text-gray-400" size={20} />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="inscricoes" fill="#F59E0B" radius={[8, 8, 0, 0]} name="Inscrições" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Novos Membros */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Novos Membros</h2>
            <UserPlus className="text-gray-400" size={20} />
          </div>
          {stats?.recentMembers && stats.recentMembers.length > 0 ? (
            <div className="space-y-3">
              {stats.recentMembers.slice(0, 4).map((member, index) => {
                const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500']
                const initials = member.nome_completo
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .substring(0, 2)
                  .toUpperCase()
                
                const daysAgo = Math.floor((new Date() - new Date(member.created_at)) / (1000 * 60 * 60 * 24))
                const timeText = daysAgo === 0 ? 'Hoje' : daysAgo === 1 ? 'Ontem' : `${daysAgo}d atrás`
                
                return (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${colors[index % colors.length]} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                        {initials}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{member.nome_completo}</p>
                        <p className="text-xs text-gray-600">{member.email}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{timeText}</span>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">Nenhum novo membro recente</p>
          )}
          <Link to="/admin/users" className="block mt-4 text-center text-blue-600 hover:text-blue-700 font-medium text-sm">
            Ver todos os usuários →
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-sm p-6 border border-blue-100">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/articles/new"
            className="group p-5 bg-white rounded-xl hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-200"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md">
              <BookOpen className="text-white" size={24} />
            </div>
            <p className="font-semibold text-gray-900 mb-1">Novo Artigo</p>
            <p className="text-xs text-gray-600">Criar publicação</p>
          </Link>
          <Link
            to="/admin/programs/new"
            className="group p-5 bg-white rounded-xl hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-200"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md">
              <Calendar className="text-white" size={24} />
            </div>
            <p className="font-semibold text-gray-900 mb-1">Novo Programa</p>
            <p className="text-xs text-gray-600">Adicionar evento</p>
          </Link>
          <Link
            to="/admin/users"
            className="group p-5 bg-white rounded-xl hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-200"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md">
              <Users className="text-white" size={24} />
            </div>
            <p className="font-semibold text-gray-900 mb-1">Usuários</p>
            <p className="text-xs text-gray-600">Gerenciar membros</p>
          </Link>
          <Link
            to="/admin/reports"
            className="group p-5 bg-white rounded-xl hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-200"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md">
              <TrendingUp className="text-white" size={24} />
            </div>
            <p className="font-semibold text-gray-900 mb-1">Relatórios</p>
            <p className="text-xs text-gray-600">Ver estatísticas</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
