import { useAuthStore } from '../../store/authStore'
import { useNotificationStore } from '../../store/notificationStore'
import { Bell, User, LogOut, Settings, Mail, Shield, Calendar, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logoEja from '../../assets/image3.jpeg'

const AdminHeader = () => {
  const { user, logout } = useAuthStore()
  const { unreadCount, fetchUnreadCount } = useNotificationStore()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [previousCount, setPreviousCount] = useState(0)
  const [showNotification, setShowNotification] = useState(false)
  const navigate = useNavigate()

  // Buscar contagem de mensagens não lidas ao carregar
  useEffect(() => {
    const loadCount = async () => {
      const count = await fetchUnreadCount()
      setPreviousCount(count)
    }
    loadCount()
    
    // Atualizar a cada 30 segundos
    const interval = setInterval(async () => {
      const newCount = await fetchUnreadCount()
      
      // Se houver novas mensagens, mostrar notificação
      if (newCount > previousCount) {
        setShowNotification(true)
        setTimeout(() => setShowNotification(false), 5000)
      }
      
      setPreviousCount(newCount)
    }, 30000)

    return () => clearInterval(interval)
  }, [previousCount])

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="px-8 py-4 flex items-center justify-between">
        {/* Logo e Título */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-white shadow-sm">
            <img src={logoEja} alt="EJA Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Painel Administrativo</h1>
            <p className="text-xs text-gray-600">Sistema de Gestão EJA</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Notificações */}
          <button 
            onClick={() => navigate('/admin/contacts')}
            className="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition"
            title={`${unreadCount} mensagem${unreadCount !== 1 ? 'ns' : ''} não lida${unreadCount !== 1 ? 's' : ''}`}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              </>
            )}
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">{user?.nome_completo}</p>
                <p className="text-xs text-gray-600">Administrador</p>
              </div>
            </button>

            {/* Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <button 
                  onClick={() => {
                    setShowUserModal(true)
                    setShowUserMenu(false)
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <User size={16} />
                  <span>Meu Perfil</span>
                </button>
                <button 
                  onClick={() => navigate('/admin/settings')}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <Settings size={16} />
                  <span>Configurações</span>
                </button>
                <hr className="my-2" />
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Sair</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast de Nova Mensagem */}
      {showNotification && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in-right">
          <div className="bg-white rounded-lg shadow-xl border-2 border-primary-500 p-4 min-w-[300px] flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <Bell className="text-primary-600" size={20} />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Nova Mensagem!</h4>
              <p className="text-sm text-gray-600 mt-1">
                Você recebeu uma nova mensagem de contato.
              </p>
              <button
                onClick={() => {
                  navigate('/admin/contacts')
                  setShowNotification(false)
                }}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium mt-2"
              >
                Ver mensagens →
              </button>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Dropdown de Perfil do Usuário */}
      {showUserModal && (
        <>
          {/* Overlay para fechar ao clicar fora */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowUserModal(false)}
          ></div>
          
          <div className="fixed top-20 right-8 z-50 w-[340px] bg-white rounded-xl shadow-2xl border border-gray-100 max-h-[calc(100vh-6rem)] overflow-hidden animate-fade-in">
            {/* Header do Dropdown */}
            <div className="relative overflow-hidden">
              {/* Background com gradiente e padrão */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800"></div>
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '32px 32px'
              }}></div>
              
              <div className="relative p-5">
                <button
                  onClick={() => setShowUserModal(false)}
                  className="absolute top-3 right-3 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition-all"
                >
                  <X size={16} />
                </button>
                
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg ring-2 ring-white/20">
                      <User size={28} className="text-primary-600" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-primary-700"></div>
                  </div>
                  <div className="text-white flex-1 min-w-0">
                    <h2 className="text-lg font-bold mb-1 truncate">{user?.nome_completo}</h2>
                    <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-0.5 w-fit">
                      <Shield size={12} />
                      <span className="text-xs font-medium">Admin</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Conteúdo do Dropdown */}
            <div className="p-4 space-y-2.5 max-h-[calc(100vh-16rem)] overflow-y-auto">
              {/* Email */}
              <div className="group flex items-center space-x-2.5 p-3 bg-gradient-to-r from-blue-50 to-blue-50/50 hover:from-blue-100 hover:to-blue-50 rounded-lg transition-all border border-blue-100">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="text-white" size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-blue-700 font-semibold uppercase tracking-wide">E-mail</p>
                  <p className="text-xs text-gray-900 font-medium truncate">{user?.email}</p>
                </div>
              </div>

              {/* Role */}
              <div className="group flex items-center space-x-2.5 p-3 bg-gradient-to-r from-purple-50 to-purple-50/50 hover:from-purple-100 hover:to-purple-50 rounded-lg transition-all border border-purple-100">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="text-white" size={14} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-purple-700 font-semibold uppercase tracking-wide">Função</p>
                  <p className="text-xs text-gray-900 font-medium capitalize">{user?.role || 'Administrador'}</p>
                </div>
              </div>

              {/* Data de Criação */}
              {user?.created_at && (
                <div className="group flex items-center space-x-2.5 p-3 bg-gradient-to-r from-green-50 to-green-50/50 hover:from-green-100 hover:to-green-50 rounded-lg transition-all border border-green-100">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="text-white" size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-green-700 font-semibold uppercase tracking-wide">Membro desde</p>
                    <p className="text-xs text-gray-900 font-medium">
                      {new Date(user.created_at).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              )}

              {/* Informações Adicionais */}
              {(user?.genero || user?.nivel_escolaridade || user?.area_interesse) && (
                <>
                  <div className="border-t border-gray-200 my-3 pt-3">
                    {user?.genero && (
                      <div className="flex items-center justify-between p-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors mb-1.5">
                        <span className="text-[10px] text-gray-600 font-medium uppercase">Gênero</span>
                        <span className="text-xs text-gray-900 font-semibold capitalize">{user.genero}</span>
                      </div>
                    )}

                    {user?.nivel_escolaridade && (
                      <div className="flex items-center justify-between p-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors mb-1.5">
                        <span className="text-[10px] text-gray-600 font-medium uppercase">Escolaridade</span>
                        <span className="text-xs text-gray-900 font-semibold">{user.nivel_escolaridade}</span>
                      </div>
                    )}

                    {user?.area_interesse && (
                      <div className="flex items-center justify-between p-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                        <span className="text-[10px] text-gray-600 font-medium uppercase">Área</span>
                        <span className="text-xs text-gray-900 font-semibold">{user.area_interesse}</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Footer do Dropdown */}
            <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowUserModal(false)
                    navigate('/admin/settings')
                  }}
                  className="flex-1 px-3 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition text-xs font-medium border border-gray-300 flex items-center justify-center gap-1.5"
                >
                  <Settings size={14} />
                  Config
                </button>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="flex-1 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-xs font-medium shadow-sm"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}

export default AdminHeader
