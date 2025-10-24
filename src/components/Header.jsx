import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useState } from 'react'
import logo from '../assets/image3.jpeg'

const Header = () => {
  const { isAuthenticated, user, logout } = useAuthStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={logo} 
              alt="EJA Logo" 
              className="h-12 w-12 object-cover rounded-lg"
            />
            <span className="font-bold text-2xl bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent hidden sm:block">
              EJA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-yellow-600 transition font-medium">
              Início
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-yellow-600 transition font-medium">
              Blog
            </Link>
            <Link to="/programs" className="text-gray-700 hover:text-yellow-600 transition font-medium">
              Programas
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-yellow-600 transition font-medium">
              Sobre
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-yellow-600 transition font-medium">
              Contato
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="bg-yellow-500 text-white px-6 py-2.5 rounded-lg hover:bg-yellow-600 transition font-semibold shadow-md hover:shadow-lg">
                Entrar
              </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-primary-600 transition"
              >
                Início
              </Link>
              <Link
                to="/blog"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-primary-600 transition"
              >
                Blog
              </Link>
              <Link
                to="/programs"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-primary-600 transition"
              >
                Programas
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-primary-600 transition"
              >
                Sobre
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-primary-600 transition"
              >
                Contato
              </Link>

              <div className="pt-4 border-t">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition mb-4"
                    >
                      <User size={20} />
                      <span>{user?.nome_completo}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition"
                    >
                      <LogOut size={20} />
                      <span>Sair</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-yellow-500 text-white px-6 py-2.5 rounded-lg hover:bg-yellow-600 transition font-semibold shadow-md hover:shadow-lg w-full text-center"
                  >
                    Entrar
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
