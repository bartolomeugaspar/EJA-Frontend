import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminHeader from '../components/admin/AdminHeader'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const AdminLayout = () => {
  const { isAuthenticated, user } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Verificar se está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Verificar se é admin
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Acesso Negado</h2>
          <p className="text-sm md:text-base text-gray-600 mb-6">
            Você não tem permissão para acessar o painel administrativo.
          </p>
          <a href="/dashboard" className="btn btn-primary">
            Voltar ao Dashboard
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Fixo */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <AdminHeader />
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
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 pt-[73px]"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Container com padding-top para compensar o header fixo */}
      <div className="flex pt-[73px]">
        {/* Sidebar - Responsivo */}
        <div className={`
          fixed left-0 top-[73px] bottom-0 w-64 overflow-y-auto z-40 transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <AdminSidebar onItemClick={() => setSidebarOpen(false)} />
        </div>
        
        {/* Conteúdo Principal - Responsivo */}
        <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8 min-h-screen w-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
