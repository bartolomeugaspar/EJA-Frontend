import { Link } from 'react-router-dom'
import { ArrowRight, Users, BookOpen, Calendar, TrendingUp } from 'lucide-react'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transforme Sua Ideia em Realidade
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Junte-se à maior plataforma de empreendedorismo jovem em Angola.
              Aprenda, conecte-se e cresça com a EJA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="btn bg-white text-primary-600 hover:bg-gray-100">
                Começar Agora
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link to="/programs" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                Ver Programas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <Users size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Membros Ativos</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <Calendar size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50+</h3>
              <p className="text-gray-600">Programas Realizados</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <BookOpen size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">100+</h3>
              <p className="text-gray-600">Artigos Publicados</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">80%</h3>
              <p className="text-gray-600">Taxa de Sucesso</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por Que Escolher a EJA?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Oferecemos uma plataforma completa para o desenvolvimento de jovens empreendedores
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card hover:shadow-lg transition">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Conteúdo de Qualidade</h3>
              <p className="text-gray-600">
                Acesso a artigos, tutoriais e recursos criados por especialistas em empreendedorismo
              </p>
            </div>

            <div className="card hover:shadow-lg transition">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
                <Calendar size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Programas Exclusivos</h3>
              <p className="text-gray-600">
                Workshops, cursos e eventos focados no desenvolvimento de habilidades empreendedoras
              </p>
            </div>

            <div className="card hover:shadow-lg transition">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Comunidade Ativa</h3>
              <p className="text-gray-600">
                Conecte-se com outros empreendedores, mentores e investidores
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto Para Começar Sua Jornada?
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Junte-se a centenas de jovens empreendedores que já estão transformando suas ideias em negócios de sucesso
          </p>
          <Link to="/register" className="btn bg-white text-primary-600 hover:bg-gray-100 inline-flex items-center">
            Criar Conta Gratuita
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
