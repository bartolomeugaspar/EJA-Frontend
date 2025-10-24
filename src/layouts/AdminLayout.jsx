import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminHeader from '../components/admin/AdminHeader'

const AdminLayout = () => {
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
