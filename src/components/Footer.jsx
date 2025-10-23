import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sobre */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">EJA</h3>
            <p className="text-sm mb-4">
              Empreendedorismo Jovem Angolano - Desenvolvendo a próxima geração de
              empreendedores em Angola.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary-400 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-primary-400 transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary-400 transition">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary-400 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-primary-400 transition">
                  Programas
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-400 transition">
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>

          {/* Programas */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Programas</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary-400 transition">
                  Workshops
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition">
                  Cursos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition">
                  Mentoria
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition">
                  Eventos
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Luanda, Angola</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} className="flex-shrink-0" />
                <span>+244 923 456 789</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="flex-shrink-0" />
                <span>contato@eja.ao</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} EJA - Empreendedorismo Jovem Angolano. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
