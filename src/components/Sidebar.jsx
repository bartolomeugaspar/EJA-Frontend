import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, Calendar, User, Settings, FileText } from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/dashboard/profile', icon: User, label: 'Perfil' },
    { path: '/dashboard/programs', icon: Calendar, label: 'Meus Programas' },
    { path: '/dashboard/articles', icon: BookOpen, label: 'Artigos Salvos' },
    { path: '/dashboard/documents', icon: FileText, label: 'Documentos' },
    { path: '/dashboard/settings', icon: Settings, label: 'Configurações' },
  ]

  return (
    <aside className="w-64 bg-white shadow-sm min-h-[calc(100vh-64px)]">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
