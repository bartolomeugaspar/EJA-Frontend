import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminHeader from '../components/admin/AdminHeader'

const AdminLayout = () => {
  const { isAuthenticated, user } = useAuthStore()

  // Verificar se está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Verificar se é admin
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Acesso Negado</h2>
          <p className="text-gray-600 mb-6">
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
      
      {/* Container com padding-top para compensar o header fixo */}
      <div className="flex pt-[73px]">
        {/* Sidebar Fixo */}
        <div className="fixed left-0 top-[73px] bottom-0 w-64 overflow-y-auto">
          <AdminSidebar />
        </div>
        
        {/* Conteúdo Principal com margin-left para compensar o sidebar */}
        <main className="flex-1 ml-64 p-8 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
