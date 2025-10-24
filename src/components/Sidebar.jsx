import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, Calendar, User, Settings, FileText } from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard', exact: true },
    { path: '/dashboard/profile', icon: User, label: 'Perfil' },
    { path: '/dashboard/programs', icon: Calendar, label: 'Meus Programas' },
    { path: '/dashboard/articles', icon: BookOpen, label: 'Artigos Salvos' },
    { path: '/dashboard/documents', icon: FileText, label: 'Documentos' },
    { path: '/dashboard/settings', icon: Settings, label: 'Configurações' },
  ]

  return (
    <aside className="w-full h-full bg-white shadow-sm">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = item.exact 
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path)

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => console.log('Navegando para:', item.path)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-yellow-50 text-yellow-700 font-medium shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-yellow-600' : 'text-gray-500'} />
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
