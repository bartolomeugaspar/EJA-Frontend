import { useAuthStore } from '../store/authStore'
import { Bell, User, LogOut } from 'lucide-react'

const DashboardHeader = () => {
  const { user, logout } = useAuthStore()

  return (
    <header className="bg-white shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-600">Bem-vindo de volta, {user?.nome_completo?.split(' ')[0]}!</p>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-primary-600 transition relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">{user?.nome_completo}</p>
              <p className="text-xs text-gray-600">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-2 text-gray-600 hover:text-red-600 transition"
            title="Sair"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
