import { Link, useLocation } from 'react-router-dom'
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
} from 'lucide-react'

const AdminSidebar = () => {
  const location = useLocation()

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { path: '/admin/users', icon: Users, label: 'Usuários' },
    { path: '/admin/articles', icon: BookOpen, label: 'Artigos' },
    { path: '/admin/programs', icon: Calendar, label: 'Programas' },
    { path: '/admin/contacts', icon: MessageSquare, label: 'Mensagens' },
    { path: '/admin/reports', icon: BarChart3, label: 'Relatórios' },
    { path: '/admin/logs', icon: Shield, label: 'Logs de Segurança' },
    { path: '/admin/settings', icon: Settings, label: 'Configurações' },
  ]

  return (
    <aside className="w-64 bg-white shadow-sm min-h-[calc(100vh-73px)] sticky top-[73px]">
      <nav className="p-4">
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
    </aside>
  )
}

export default AdminSidebar
