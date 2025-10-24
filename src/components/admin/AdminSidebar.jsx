import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  MessageSquare,
  Shield,
  BarChart3,
  Settings,
  FileText,
  LogOut,
  X,
  AlertTriangle,
} from 'lucide-react'

const AdminSidebar = ({ onItemClick }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuthStore()
  const [showLogoutToast, setShowLogoutToast] = useState(false)

  const handleLogout = () => {
    setShowLogoutToast(true)
    
    // Aguardar 2 segundos para mostrar o toast
    setTimeout(() => {
      logout()
      navigate('/login')
    }, 2000)
  }

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { path: '/admin/members', icon: Users, label: 'Membros' },
    { path: '/admin/users', icon: Shield, label: 'Usuários' },
    { path: '/admin/articles', icon: BookOpen, label: 'Artigos' },
    { path: '/admin/programs', icon: Calendar, label: 'Programas' },
    { path: '/admin/contacts', icon: MessageSquare, label: 'Mensagens' },
    { path: '/admin/reports', icon: BarChart3, label: 'Relatórios' },
    { path: '/admin/logs', icon: Shield, label: 'Logs de Segurança' },
    { path: '/admin/settings', icon: Settings, label: 'Configurações' },
  ]

  return (
    <aside className="w-full h-full bg-white shadow-sm flex flex-col">
        <nav className="flex-1 p-4 overflow-y-auto">
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Menu Principal
          </p>
        </div>

        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = item.exact 
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path)

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={onItemClick}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 font-medium shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-primary-600' : 'text-gray-500'} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-8 p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
          <FileText className="text-primary-600 mb-2" size={24} />
          <h3 className="font-bold text-gray-900 text-sm mb-1">Documentação</h3>
          <p className="text-xs text-gray-600 mb-3">
            Acesse o guia completo do sistema
          </p>
          <button className="text-xs text-primary-600 font-medium hover:text-primary-700">
            Ver Documentação →
          </button>
        </div>
      </nav>

      {/* Footer com Logout */}
      <div className="border-t border-gray-200 p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all font-medium"
        >
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>

      {/* Toast de Logout - Usando Portal para renderizar no body */}
      {showLogoutToast && createPortal(
        <div className="fixed top-4 right-4 z-[9999] max-w-md animate-slide-in">
          <div className="rounded-xl shadow-2xl border-2 bg-blue-50 border-blue-400 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 text-blue-600">
                  <LogOut size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base mb-1 text-blue-900">
                    Logout realizado com sucesso!
                  </h3>
                  <p className="text-sm text-blue-800">
                    Até breve! Redirecionando...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </aside>
  )
}

export default AdminSidebar
