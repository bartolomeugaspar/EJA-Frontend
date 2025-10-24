import { BarChart3, TrendingUp, Users, BookOpen, Calendar, Download } from 'lucide-react'

const AdminReports = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Relatórios e Análises</h1>
        <p className="text-gray-600 mt-2">Visualize estatísticas e métricas da plataforma</p>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Usuários</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">1,234</p>
              <p className="text-sm text-green-600 mt-1">+12% este mês</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Artigos Publicados</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">89</p>
              <p className="text-sm text-green-600 mt-1">+5 este mês</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Programas Ativos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">15</p>
              <p className="text-sm text-yellow-600 mt-1">3 em andamento</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Taxa de Engajamento</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">78%</p>
              <p className="text-sm text-green-600 mt-1">+8% este mês</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Crescimento de Usuários</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <Download size={16} />
              Exportar
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="text-gray-400 mx-auto mb-2" size={48} />
              <p className="text-gray-500">Gráfico de crescimento</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Engajamento por Categoria</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <Download size={16} />
              Exportar
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="text-gray-400 mx-auto mb-2" size={48} />
              <p className="text-gray-500">Gráfico de engajamento</p>
            </div>
          </div>
        </div>
      </div>

      {/* Relatórios Disponíveis */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Relatórios Disponíveis</h2>
        <div className="space-y-3">
          {[
            { nome: 'Relatório de Usuários - Janeiro 2024', data: '01/02/2024', tamanho: '2.4 MB' },
            { nome: 'Análise de Engajamento - Dezembro 2023', data: '05/01/2024', tamanho: '1.8 MB' },
            { nome: 'Relatório de Programas - 2023', data: '20/12/2023', tamanho: '3.2 MB' },
          ].map((relatorio, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{relatorio.nome}</p>
                  <p className="text-sm text-gray-500">{relatorio.data} • {relatorio.tamanho}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                <Download size={16} />
                Baixar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminReports
