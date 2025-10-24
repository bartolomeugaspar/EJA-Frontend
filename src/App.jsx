import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'

// Layouts
import MainLayout from './layouts/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'
import AdminLayout from './layouts/AdminLayout'

// Public Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Blog from './pages/Blog'
import Programs from './pages/Programs'
import About from './pages/About'
import Contact from './pages/Contact'

// User Dashboard
import Dashboard from './pages/Dashboard'
import Profile from './pages/dashboard/Profile'
import MyPrograms from './pages/dashboard/MyPrograms'
import SavedArticles from './pages/dashboard/SavedArticles'
import Documents from './pages/dashboard/Documents'
import Settings from './pages/dashboard/Settings'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminMembers from './pages/admin/AdminMembers'
import AdminArticles from './pages/admin/AdminArticles'
import ArticleForm from './pages/admin/ArticleForm'
import AdminPrograms from './pages/admin/AdminPrograms'
import ProgramForm from './pages/admin/ProgramForm'
import AdminContacts from './pages/admin/AdminContacts'
import AdminReports from './pages/admin/AdminReports'
import AdminLogs from './pages/admin/AdminLogs'
import AdminSettings from './pages/admin/AdminSettings'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="blog" element={<Blog />} />
        <Route path="programs" element={<Programs />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* User Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="programs" element={<MyPrograms />} />
        <Route path="articles" element={<SavedArticles />} />
        <Route path="documents" element={<Documents />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="members" element={<AdminMembers />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="articles" element={<AdminArticles />} />
        <Route path="articles/new" element={<ArticleForm />} />
        <Route path="articles/edit/:id" element={<ArticleForm />} />
        <Route path="programs" element={<AdminPrograms />} />
        <Route path="programs/new" element={<ProgramForm />} />
        <Route path="programs/edit/:id" element={<ProgramForm />} />
        <Route path="contacts" element={<AdminContacts />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="logs" element={<AdminLogs />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
