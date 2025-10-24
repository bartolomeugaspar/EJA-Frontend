import { useState, useEffect } from 'react'
import { adminService } from '../../services/adminService'
import { BarChart3, TrendingUp, Users, BookOpen, Calendar, Download, FileText, AlertCircle } from 'lucide-react'

const AdminReports = () => {
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await adminService.getDashboard()
      console.log('Dashboard response:', response)
      console.log('Dashboard data:', response.data)
      setDashboard(response.data)
    } catch (err) {
      console.error('Erro ao carregar dashboard:', err)
      console.error('Erro detalhado:', err.response?.data)
      setError('Erro ao carregar dados do dashboard')
    } finally {
      setLoading(false)
    }
  }

  const generatePDF = (title, data, type, detailedData) => {
    // Criar janela para impressão
    const printWindow = window.open('', '_blank')
    
    // Verificar se o popup foi bloqueado
    if (!printWindow) {
      alert('Por favor, permita popups para este site para gerar o PDF.\n\nVá em configurações do navegador e permita popups para este domínio.')
      return
    }
    
    let content = ''
    const today = new Date().toLocaleDateString('pt-BR')
    
    // Gerar conteúdo baseado no tipo
    if (type === 'members') {
      const membersRows = detailedData?.map((member, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${member.nome_completo || 'N/A'}</td>
          <td>${member.email || 'N/A'}</td>
          <td>${member.telefone || 'N/A'}</td>
          <td><span class="status-badge status-${member.status_aprovacao}">${member.status_aprovacao || 'N/A'}</span></td>
          <td>${member.data_candidatura ? new Date(member.data_candidatura).toLocaleDateString('pt-BR') : 'N/A'}</td>
        </tr>
      `).join('') || '<tr><td colspan="6" style="text-align: center;">Nenhum membro encontrado</td></tr>'
      
      content = `
        <div class="summary-stats">
          <div class="stat-box"><strong>Total:</strong> ${dashboard?.totalMembers || 0}</div>
          <div class="stat-box"><strong>Aprovados:</strong> ${dashboard?.approvedMembers || 0}</div>
          <div class="stat-box"><strong>Pendentes:</strong> ${dashboard?.pendingMembers || 0}</div>
          <div class="stat-box"><strong>Rejeitados:</strong> ${dashboard?.rejectedMembers || 0}</div>
        </div>
        
        <h2>Lista Completa de Membros</h2>
        <table class="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Data de Cadastro</th>
            </tr>
          </thead>
          <tbody>
            ${membersRows}
          </tbody>
        </table>
      `
    } else if (type === 'programs') {
      const programsRows = detailedData?.map((program, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${program.titulo || 'N/A'}</td>
          <td>${program.tipo || 'N/A'}</td>
          <td>${program.local || 'N/A'}</td>
          <td>${program.vagas || 0}</td>
          <td><span class="status-badge status-${program.status}">${program.status || 'N/A'}</span></td>
          <td>${program.data_inicio ? new Date(program.data_inicio).toLocaleDateString('pt-BR') : 'N/A'}</td>
        </tr>
      `).join('') || '<tr><td colspan="7" style="text-align: center;">Nenhum programa encontrado</td></tr>'
      
      content = `
        <div class="summary-stats">
          <div class="stat-box"><strong>Total:</strong> ${dashboard?.totalPrograms || 0}</div>
          <div class="stat-box"><strong>Ativos:</strong> ${dashboard?.activePrograms || 0}</div>
          <div class="stat-box"><strong>Em Breve:</strong> ${dashboard?.upcomingPrograms || 0}</div>
          <div class="stat-box"><strong>Encerrados:</strong> ${dashboard?.closedPrograms || 0}</div>
        </div>
        
        <h2>Lista Completa de Programas</h2>
        <table class="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Tipo</th>
              <th>Local</th>
              <th>Vagas</th>
              <th>Status</th>
              <th>Data de Início</th>
            </tr>
          </thead>
          <tbody>
            ${programsRows}
          </tbody>
        </table>
      `
    } else if (type === 'activities') {
      const articlesRows = detailedData?.map((article, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${article.titulo || 'N/A'}</td>
          <td>${article.categoria || 'N/A'}</td>
          <td>${article.autor || 'N/A'}</td>
          <td><span class="status-badge ${article.publicado ? 'status-aprovado' : 'status-pendente'}">${article.publicado ? 'Publicado' : 'Rascunho'}</span></td>
          <td>${article.created_at ? new Date(article.created_at).toLocaleDateString('pt-BR') : 'N/A'}</td>
        </tr>
      `).join('') || '<tr><td colspan="6" style="text-align: center;">Nenhum artigo encontrado</td></tr>'
      
      content = `
        <div class="summary-stats">
          <div class="stat-box"><strong>Total de Artigos:</strong> ${dashboard?.totalArticles || 0}</div>
          <div class="stat-box"><strong>Publicados:</strong> ${dashboard?.publishedArticles || 0}</div>
          <div class="stat-box"><strong>Mensagens Pendentes:</strong> ${dashboard?.pendingContacts || 0}</div>
          <div class="stat-box"><strong>Mensagens Respondidas:</strong> ${dashboard?.respondedContacts || 0}</div>
        </div>
        
        <h2>Lista Completa de Artigos</h2>
        <table class="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Categoria</th>
              <th>Autor</th>
              <th>Status</th>
              <th>Data de Criação</th>
            </tr>
          </thead>
          <tbody>
            ${articlesRows}
          </tbody>
        </table>
      `
    }
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${title}</title>
          <style>
            @page {
              size: A4;
              margin: 2cm;
            }
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
              border-bottom: 3px solid #2563eb;
              padding-bottom: 20px;
            }
            .header h1 {
              color: #2563eb;
              margin: 0;
              font-size: 28px;
            }
            .header p {
              color: #666;
              margin: 10px 0 0 0;
            }
            h2 {
              color: #1f2937;
              margin-top: 30px;
              margin-bottom: 15px;
              font-size: 20px;
              border-bottom: 2px solid #e5e7eb;
              padding-bottom: 10px;
            }
            .summary-stats {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 15px;
              margin: 20px 0 30px 0;
            }
            .stat-box {
              background: #f3f4f6;
              padding: 15px;
              border-radius: 8px;
              text-align: center;
              border-left: 4px solid #2563eb;
            }
            .data-table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
              font-size: 12px;
            }
            .data-table thead {
              background: #f9fafb;
            }
            .data-table th {
              padding: 12px 8px;
              text-align: left;
              font-weight: 600;
              color: #374151;
              border-bottom: 2px solid #e5e7eb;
              text-transform: uppercase;
              font-size: 11px;
            }
            .data-table td {
              padding: 10px 8px;
              border-bottom: 1px solid #f3f4f6;
              color: #4b5563;
            }
            .data-table tbody tr:hover {
              background: #f9fafb;
            }
            .data-table tbody tr:last-child td {
              border-bottom: none;
            }
            .status-badge {
              display: inline-block;
              padding: 4px 12px;
              border-radius: 12px;
              font-size: 11px;
              font-weight: 600;
              text-transform: capitalize;
            }
            .status-aprovado {
              background: #d1fae5;
              color: #065f46;
            }
            .status-pendente {
              background: #fef3c7;
              color: #92400e;
            }
            .status-rejeitado {
              background: #fee2e2;
              color: #991b1b;
            }
            .status-ativo {
              background: #d1fae5;
              color: #065f46;
            }
            .status-em_breve {
              background: #dbeafe;
              color: #1e40af;
            }
            .status-encerrado {
              background: #f3f4f6;
              color: #4b5563;
            }
            .footer {
              margin-top: 50px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              text-align: center;
              color: #9ca3af;
              font-size: 12px;
            }
            @media print {
              body {
                padding: 0;
              }
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>EJA - Plataforma de Gestão</h1>
            <p>${title}</p>
            <p>Data: ${today}</p>
          </div>
          
          ${content}
          
          <div class="footer">
            <p>Relatório gerado automaticamente pelo sistema EJA</p>
            <p>© ${new Date().getFullYear()} EJA - Todos os direitos reservados</p>
          </div>
          
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() {
                window.close();
              }, 100);
            }
          </script>
        </body>
      </html>
    `)
    
    printWindow.document.close()
  }

  const handleExportReport = async (type) => {
    try {
      let title = ''
      let detailedData = null
      
      switch(type) {
        case 'members':
          title = 'Relatório de Membros'
          const membersResponse = await adminService.getMembers()
          console.log('Resposta de membros:', membersResponse)
          detailedData = membersResponse.members || membersResponse.data || []
          console.log('Dados detalhados:', detailedData)
          break
        case 'programs':
          title = 'Relatório de Programas'
          const programsResponse = await adminService.getPrograms()
          console.log('Resposta de programas:', programsResponse)
          detailedData = programsResponse.data || []
          break
        case 'activities':
          title = 'Relatório de Atividades'
          const articlesResponse = await adminService.getArticles()
          console.log('Resposta de artigos:', articlesResponse)
          detailedData = articlesResponse.data || []
          break
        default:
          return
      }
      
      generatePDF(title, dashboard, type, detailedData)
    } catch (err) {
      console.error('Erro ao exportar relatório:', err)
      alert('Erro ao exportar relatório')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-3">
        <AlertCircle className="text-red-600 flex-shrink-0" size={24} />
        <div>
          <h3 className="font-semibold text-red-900">Erro ao carregar relatórios</h3>
          <p className="text-red-700 text-sm mt-1">{error}</p>
          <button 
            onClick={loadDashboard}
            className="mt-3 btn btn-primary text-sm"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios e Análises</h1>
          <p className="text-gray-600 mt-2">Visualize estatísticas e métricas da plataforma</p>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="input w-48"
        >
          <option value="week">Esta Semana</option>
          <option value="month">Este Mês</option>
          <option value="year">Este Ano</option>
        </select>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Membros</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {dashboard?.totalMembers || 0}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {dashboard?.pendingMembers || 0} pendentes
              </p>
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
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {dashboard?.totalArticles || 0}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {dashboard?.publishedArticles || 0} publicados
              </p>
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
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {dashboard?.activePrograms || 0}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {dashboard?.totalPrograms || 0} total
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Mensagens Pendentes</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {dashboard?.pendingContacts || 0}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {dashboard?.totalContacts || 0} total
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Estatísticas Detalhadas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Membros por Status</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Aprovados</span>
              <span className="font-semibold text-green-600">{dashboard?.approvedMembers || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pendentes</span>
              <span className="font-semibold text-yellow-600">{dashboard?.pendingMembers || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Rejeitados</span>
              <span className="font-semibold text-red-600">{dashboard?.rejectedMembers || 0}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Programas por Status</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Ativos</span>
              <span className="font-semibold text-green-600">{dashboard?.activePrograms || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Em Breve</span>
              <span className="font-semibold text-blue-600">{dashboard?.upcomingPrograms || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Encerrados</span>
              <span className="font-semibold text-gray-600">{dashboard?.closedPrograms || 0}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Mensagens</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pendentes</span>
              <span className="font-semibold text-yellow-600">{dashboard?.pendingContacts || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Respondidas</span>
              <span className="font-semibold text-green-600">{dashboard?.respondedContacts || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total</span>
              <span className="font-semibold text-gray-600">{dashboard?.totalContacts || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Exportar Relatórios */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Exportar Relatórios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 transition">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Relatório de Membros</h3>
                <p className="text-xs text-gray-500">Dados completos de membros</p>
              </div>
            </div>
            <button 
              onClick={() => handleExportReport('members')}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Download size={16} />
              Gerar PDF
            </button>
          </div>

          <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-green-500 transition">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Relatório de Programas</h3>
                <p className="text-xs text-gray-500">Dados de programas e eventos</p>
              </div>
            </div>
            <button 
              onClick={() => handleExportReport('programs')}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              <Download size={16} />
              Gerar PDF
            </button>
          </div>

          <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-purple-500 transition">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-purple-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Relatório de Atividades</h3>
                <p className="text-xs text-gray-500">Logs e atividades do sistema</p>
              </div>
            </div>
            <button 
              onClick={() => handleExportReport('activities')}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
            >
              <Download size={16} />
              Gerar PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminReports
