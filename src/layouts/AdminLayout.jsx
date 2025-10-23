import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminHeader from '../components/admin/AdminHeader'

const AdminLayout = () => {
  const { user, isAuthenticated } = useAuthStore()

  // Verificar se é admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
