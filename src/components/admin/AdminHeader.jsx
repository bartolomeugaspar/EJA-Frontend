import { useAuthStore } from '../../store/authStore'
import { useNotificationStore } from '../../store/notificationStore'
import { Bell, Search, User, LogOut, Settings } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminHeader = () => {
  const { user, logout } = useAuthStore()
  const { unreadCount, fetchUnreadCount } = useNotificationStore()
  const [showUserMenu, setShowUserMenu] = useState(false)
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
          <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">EJA</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Painel Administrativo</h1>
            <p className="text-xs text-gray-600">Sistema de Gestão EJA</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Pesquisar usuários, artigos, programas..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
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
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
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
    </header>
  )
}

export default AdminHeader
