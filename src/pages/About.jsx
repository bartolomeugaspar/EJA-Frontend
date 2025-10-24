import { Target, Lightbulb, Users, Award, Rocket, Heart } from 'lucide-react'

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Sobre a EJA</h1>
            <p className="text-2xl text-yellow-50">
              Empreendedorismo Jovem Angolano
            </p>
          </div>
        </div>
      </section>

      {/* Missão e Visão */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              A <strong>Empreendedorismo Jovem Angolano (EJA)</strong> é uma plataforma dedicada ao desenvolvimento 
              de jovens empreendedores em Angola. Fundada com o propósito de criar um ecossistema vibrante de 
              inovação e empreendedorismo, trabalhamos para capacitar a próxima geração de líderes empresariais angolanos.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-yellow-50 rounded-2xl p-8 border-l-4 border-yellow-500">
                <div className="flex items-center mb-4">
                  <Target className="text-yellow-600 mr-3" size={32} />
                  <h2 className="text-2xl font-bold text-gray-900">Nossa Missão</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Fornecer recursos, conhecimento e conexões para ajudar jovens angolanos a 
                  transformarem suas ideias em negócios de sucesso, contribuindo para o desenvolvimento 
                  econômico e social do país.
                </p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-8 border-l-4 border-blue-500">
                <div className="flex items-center mb-4">
                  <Lightbulb className="text-blue-600 mr-3" size={32} />
                  <h2 className="text-2xl font-bold text-gray-900">Nossa Visão</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Ser a principal plataforma de empreendedorismo jovem em Angola, reconhecida pela 
                  excelência em capacitação, mentoria e pelo impacto positivo na economia nacional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O Que Fazemos */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">O Que Fazemos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos um ecossistema completo de apoio ao empreendedorismo jovem
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <Users className="text-yellow-600 mb-4" size={40} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Capacitação</h3>
              <p className="text-gray-600">
                Workshops, palestras e programas de formação com especialistas do mercado angolano e internacional.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <Rocket className="text-yellow-600 mb-4" size={40} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Aceleração</h3>
              <p className="text-gray-600">
                Programas estruturados para validar e escalar ideias de negócio em setores estratégicos.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <Heart className="text-yellow-600 mb-4" size={40} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mentoria</h3>
              <p className="text-gray-600">
                Acompanhamento personalizado com empreendedores experientes que já trilharam o caminho do sucesso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-yellow-100">Membros Ativos</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-yellow-100">Programas Realizados</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100+</div>
              <div className="text-yellow-100">Empresas Criadas</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">95%</div>
              <div className="text-yellow-100">Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Junte-se a Nós */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Junte-se a Nós</h2>
            <p className="text-xl text-gray-600 mb-8">
              Faça parte da maior comunidade de jovens empreendedores de Angola. 
              Transforme suas ideias em realidade com o apoio do EJA.
            </p>
            <a 
              href="/register" 
              className="inline-flex items-center px-8 py-4 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition font-bold text-lg shadow-xl"
            >
              Criar Conta Gratuita
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
