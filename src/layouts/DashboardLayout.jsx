import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import DashboardHeader from '../components/DashboardHeader'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const DashboardLayout = () => {
  const { user } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Se for admin, redirecionar para /admin
  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Fixo */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <DashboardHeader />
      </div>
      
      {/* Botão Menu Mobile */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-700 transition-all"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay Mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 pt-16"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Container com padding-top para compensar o header fixo */}
      <div className="flex pt-16">
        {/* Sidebar - Responsivo */}
        <div className={`
          fixed left-0 top-16 bottom-0 w-64 overflow-y-auto z-40 transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <Sidebar onItemClick={() => setSidebarOpen(false)} />
        </div>
        
        {/* Conteúdo Principal - Responsivo */}
        <main className="flex-1 lg:ml-64 p-4 md:p-6 min-h-screen w-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
