import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import DashboardHeader from '../components/DashboardHeader'
import Sidebar from '../components/Sidebar'

const DashboardLayout = () => {
  const { user } = useAuthStore()

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
      
      {/* Container com padding-top para compensar o header fixo */}
      <div className="flex pt-16">
        {/* Sidebar Fixo */}
        <div className="fixed left-0 top-16 bottom-0 w-64 overflow-y-auto">
          <Sidebar />
        </div>
        
        {/* Conteúdo Principal com margin-left para compensar o sidebar */}
        <main className="flex-1 ml-64 p-6 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
