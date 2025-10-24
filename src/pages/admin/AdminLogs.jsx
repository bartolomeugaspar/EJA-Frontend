import { useEffect, useState } from 'react'
import { adminService } from '../../services/adminService'
import { Shield, AlertTriangle, CheckCircle, XCircle, Filter } from 'lucide-react'

const AdminLogs = () => {
  const [logs, setLogs] = useState([])
  const [alerts, setAlerts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [periodo, setPeriodo] = useState('24horas')
  const [filterSucesso, setFilterSucesso] = useState('')

  useEffect(() => {
    loadLogs()
    loadAlerts()
  }, [periodo, filterSucesso])

  const loadLogs = async () => {
    try {
      setLoading(true)
      const params = { periodo, limit: 50 }
      if (filterSucesso !== '') params.sucesso = filterSucesso
      
      const response = await adminService.getLoginLogs(params)
      setLogs(response.data.logs || [])
    } catch (error) {
      console.error('Erro ao carregar logs:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadAlerts = async () => {
    try {
      const response = await adminService.getSecurityAlerts({ periodo, threshold: 3 })
      setAlerts(response.data)
    } catch (error) {
      console.error('Erro ao carregar alertas:', error)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Logs de Segurança</h1>
        <p className="text-gray-600">Monitore tentativas de login e atividades suspeitas</p>
      </div>

      {/* Alertas de Segurança */}
      {alerts && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <span className="text-sm font-medium text-red-600">Alto Risco</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {alerts.resumo?.risco_alto || 0}
            </h3>
            <p className="text-sm text-gray-600">Tentativas suspeitas</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Shield className="text-orange-600" size={24} />
              </div>
              <span className="text-sm font-medium text-orange-600">IPs Suspeitos</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {alerts.resumo?.ips_suspeitos || 0}
            </h3>
            <p className="text-sm text-gray-600">Endereços bloqueados</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <XCircle className="text-blue-600" size={24} />
              </div>
              <span className="text-sm font-medium text-blue-600">Falhas</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {alerts.total_tentativas_falhas || 0}
            </h3>
            <p className="text-sm text-gray-600">Tentativas falhas ({periodo})</p>
          </div>
        </div>
      )}

      {/* Alertas Detalhados - Emails e IPs Suspeitos */}
      {alerts && (alerts.alertas_por_email?.length > 0 || alerts.alertas_por_ip?.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Alertas por Email */}
          {alerts.alertas_por_email?.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Emails Suspeitos</h3>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                  {alerts.alertas_por_email.length} alertas
                </span>
              </div>
              <div className="space-y-2">
                {alerts.alertas_por_email.slice(0, 5).map((alerta, index) => (
                  <div key={index} className="group p-3 bg-gradient-to-r from-red-50 to-red-50/30 hover:from-red-100 hover:to-red-50 rounded-lg border border-red-200 transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="font-semibold text-sm text-gray-900 truncate flex-1 mr-2">{alerta.email}</p>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase flex-shrink-0 ${
                        alerta.nivel_risco === 'alto' ? 'bg-red-500 text-white' :
                        alerta.nivel_risco === 'médio' ? 'bg-orange-500 text-white' :
                        'bg-yellow-500 text-white'
                      }`}>
                        {alerta.nivel_risco}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <span className="font-semibold text-red-700">{alerta.tentativas}</span>
                      <span>tentativas de</span>
                      <span className="font-semibold text-red-700">{alerta.ips.length}</span>
                      <span>IP(s)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Alertas por IP */}
          {alerts.alertas_por_ip?.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">IPs Suspeitos</h3>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                  {alerts.alertas_por_ip.length} alertas
                </span>
              </div>
              <div className="space-y-2">
                {alerts.alertas_por_ip.slice(0, 5).map((alerta, index) => (
                  <div key={index} className="group p-3 bg-gradient-to-r from-orange-50 to-orange-50/30 hover:from-orange-100 hover:to-orange-50 rounded-lg border border-orange-200 transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <code className="font-semibold text-gray-900 text-xs bg-gray-100 px-2 py-1 rounded">{alerta.ip}</code>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase flex-shrink-0 ml-2 ${
                        alerta.nivel_risco === 'alto' ? 'bg-red-500 text-white' :
                        alerta.nivel_risco === 'médio' ? 'bg-orange-500 text-white' :
                        'bg-yellow-500 text-white'
                      }`}>
                        {alerta.nivel_risco}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <span className="font-semibold text-orange-700">{alerta.tentativas}</span>
                      <span>tentativas em</span>
                      <span className="font-semibold text-orange-700">{alerta.emails.length}</span>
                      <span>email(s)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}


      {/* Tabela de Logs */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    IP
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Mensagem
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Data/Hora
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {logs.map((log) => (
                  <tr key={log.id} className={`hover:bg-gray-50 transition ${!log.sucesso ? 'bg-red-50/30' : ''}`}>
                    <td className="px-6 py-4">
                      {log.sucesso ? (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="text-green-500" size={20} />
                          <span className="text-sm font-medium text-green-700">Sucesso</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <XCircle className="text-red-500" size={20} />
                          <span className="text-sm font-medium text-red-700">Falha</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{log.email}</p>
                        {log.users && (
                          <p className="text-sm text-gray-600">{log.users.nome_completo}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {log.ip_address || 'N/A'}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm ${log.sucesso ? 'text-gray-600' : 'text-red-600'}`}>
                        {log.mensagem}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(log.created_at).toLocaleString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {logs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhum log encontrado</p>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  )
}

export default AdminLogs
