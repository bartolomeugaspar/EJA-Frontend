import { useAuthStore } from '../../store/authStore'
import { Bell, Search, User, LogOut, Settings } from 'lucide-react'
import { useState } from 'react'

const AdminHeader = () => {
  const { user, logout } = useAuthStore()
  const [showUserMenu, setShowUserMenu] = useState(false)

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
          <button className="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
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
    </header>
  )
}

export default AdminHeader
