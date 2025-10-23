import { Outlet } from 'react-router-dom'
import DashboardHeader from '../components/DashboardHeader'
import Sidebar from '../components/Sidebar'

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
