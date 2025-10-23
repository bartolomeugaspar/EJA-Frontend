import { Link } from 'react-router-dom'
import { ArrowRight, Users, BookOpen, Calendar, TrendingUp, Target, Lightbulb, Award, Rocket, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import image1 from '../assets/image1.jpeg'
import image2 from '../assets/image2.jpeg'
import image3 from '../assets/image3.jpeg'
import image4 from '../assets/image4.jpeg'

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: 'https://mulheres.ao/wp-content/uploads/2023/03/118987268_363676338395483_1818947604657949744_n-1024x682.jpeg',
      title: 'Empreendedorismo Jovem em Ação',
      subtitle: 'Capacitando Jovens Empreendedores Angolanos',
      description: 'Transforme sua ideia em um negócio de sucesso com nosso apoio',
      cta: 'Começar Agora',
      ctaLink: '/register'
    },
    {
      image: 'https://www.menosfios.com/wp-content/uploads/2022/03/50586558_10217909771481528_2270938660402626560_o.jpg',
      title: 'Palestras e Workshops',
      subtitle: 'Aprenda com os Melhores',
      description: 'Acesso a conteúdo exclusivo com especialistas do mercado',
      cta: 'Começar Agora',
      ctaLink: '/register'
    },
    {
      image: 'https://cdn.bndlyr.com/smdzvtzq6aukhdtc/_assets/samuel-kwabena-ansong-cs4icpewfjy-unsplash.jpg?fit=pad&w=1200&h=630&bg=ffffff',
      title: 'Mentoria Personalizada',
      subtitle: 'Acompanhamento Individual',
      description: 'Mentores experientes para guiar sua jornada empreendedora',
      cta: 'Começar Agora',
      ctaLink: '/register'
    },
    {
      image: 'https://fimdesemana.co.mz/wp-content/uploads/2025/03/Visita-ao-FIPAG-2-1024x683.webp',
      title: 'Comunidade Ativa',
      subtitle: 'Networking que Transforma',
      description: 'Conecte-se com outros empreendedores e crie parcerias',
      cta: 'Começar Agora',
      ctaLink: '/register'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div>
      {/* Hero Carousel */}
      <section className="relative h-[600px] md:h-[800px] overflow-hidden">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/50 to-transparent"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container-custom">
                <div className="max-w-2xl text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-3 text-gray-200 font-semibold">
                    {slide.subtitle}
                  </p>
                  <p className="text-lg mb-6 text-gray-300">
                    {slide.description}
                  </p>
                  <Link
                    to={slide.ctaLink}
                    className="inline-flex items-center px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-bold text-lg shadow-2xl hover:shadow-primary-500/50"
                  >
                    {slide.cta}
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition z-10"
        >
          <ChevronLeft className="text-white" size={28} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition z-10"
        >
          <ChevronRight className="text-white" size={28} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Stats Overlay */}
        <div className="absolute bottom-8 left-0 right-0 z-10">
          <div className="container-custom">
            <div className="grid grid-cols-3 gap-6 max-w-xl bg-white/10 backdrop-blur-md rounded-xl p-6">
              <div className="text-center text-white">
                <div className="text-3xl font-bold mb-1">500+</div>
                <div className="text-xs text-gray-200">Membros Ativos</div>
              </div>
              <div className="text-center text-white">
                <div className="text-3xl font-bold mb-1">50+</div>
                <div className="text-xs text-gray-200">Programas</div>
              </div>
              <div className="text-center text-white">
                <div className="text-3xl font-bold mb-1">95%</div>
                <div className="text-xs text-gray-200">Satisfação</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
              O Que Oferecemos
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Tudo Para o Seu Sucesso
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Oferecemos um ecossistema completo de apoio ao empreendedorismo jovem, 
              com recursos práticos e mentoria especializada para transformar sua visão em realidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: 'Palestras & Workshops',
                description: 'Eventos presenciais e online com especialistas renomados do mercado angolano e internacional',
                color: 'bg-blue-500',
                bgColor: 'bg-blue-50',
                borderColor: 'border-blue-200'
              },
              {
                icon: Users,
                title: 'Mentoria Personalizada',
                description: 'Acompanhamento individual com empreendedores experientes que já trilharam o caminho do sucesso',
                color: 'bg-orange-500',
                bgColor: 'bg-orange-50',
                borderColor: 'border-orange-200'
              },
              {
                icon: Rocket,
                title: 'Programas de Aceleração',
                description: 'Programas estruturados de 3 a 6 meses para desenvolver e validar seu modelo de negócio',
                color: 'bg-green-500',
                bgColor: 'bg-green-50',
                borderColor: 'border-green-200'
              },
              {
                icon: Award,
                title: 'Recursos Exclusivos',
                description: 'Biblioteca digital com templates, ferramentas, estudos de caso e materiais de apoio',
                color: 'bg-purple-500',
                bgColor: 'bg-purple-50',
                borderColor: 'border-purple-200'
              }
            ].map((service, index) => {
              const Icon = service.icon
              return (
                <div 
                  key={index} 
                  className={`bg-white rounded-2xl p-8 border-2 ${service.borderColor} hover:shadow-2xl hover:scale-105 transition-all duration-300 group`}
                >
                  <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{service.description}</p>
                </div>
              )
            })}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-16">
            <Link 
              to="/register" 
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition font-bold text-lg shadow-xl hover:shadow-2xl"
            >
              Começar Agora
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Objetivos Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Nossos Objetivos</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 mt-2">
              O Que Buscamos Alcançar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 border-2 border-primary-100 hover:border-primary-300 transition-all">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-4">
                <Target className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Capacitar Jovens</h3>
              <p className="text-gray-600">
                Capacitar jovens empreendedores angolanos para o sucesso nos negócios através de formação prática e teórica
              </p>
            </div>

            <div className="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-8 border-2 border-secondary-100 hover:border-secondary-300 transition-all">
              <div className="w-12 h-12 bg-secondary-600 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cultura Empreendedora</h3>
              <p className="text-gray-600">
                Fomentar a cultura empreendedora em Angola, inspirando mais jovens a seguirem o caminho do empreendedorismo
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border-2 border-green-100 hover:border-green-300 transition-all">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Desenvolvimento Econômico</h3>
              <p className="text-gray-600">
                Contribuir para o desenvolvimento econômico do país através do fortalecimento do ecossistema empreendedor
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Público-Alvo Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Para Quem</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 mt-2">
              Público-Alvo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary-600" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Jovens Empreendedores</h3>
              <p className="text-gray-600 text-sm">Jovens angolanos com espírito empreendedor que desejam iniciar ou expandir seus negócios</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-secondary-600" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Estudantes Universitários</h3>
              <p className="text-gray-600 text-sm">Estudantes que buscam complementar sua formação acadêmica com conhecimento prático em negócios</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="text-green-600" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Profissionais</h3>
              <p className="text-gray-600 text-sm">Profissionais que desejam fazer a transição de carreira e iniciar um negócio próprio</p>
            </div>
          </div>
        </div>
      </section>

      {/* Parceiros Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Parceiros</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 mt-2">
              Quem Nos Apoia
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trabalhamos com empresas e organizações que apoiam o empreendedorismo em Angola
            </p>
          </div>

          <div className="flex items-center justify-center gap-12 flex-wrap">
            <div className="bg-gray-50 rounded-xl p-8 hover:bg-gray-100 transition-all">
              <p className="text-2xl font-bold text-gray-900">Queta Boost</p>
              <p className="text-sm text-gray-600">Consultoria Estratégica</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 hover:bg-gray-100 transition-all">
              <p className="text-xl font-semibold text-gray-700">+ Outros Parceiros</p>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria de Momentos */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Galeria</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 mt-2">
              Momentos EJA
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Veja alguns momentos dos nossos eventos, workshops e programas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <img src={image1} alt="Evento EJA" className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl mb-2">Workshop de Empreendedorismo</h3>
                  <p className="text-gray-200 text-sm">Capacitação prática para jovens</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <img src={image2} alt="Mentoria EJA" className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl mb-2">Sessões de Mentoria</h3>
                  <p className="text-gray-200 text-sm">Acompanhamento personalizado</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <img src={image3} alt="Networking EJA" className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl mb-2">Eventos de Networking</h3>
                  <p className="text-gray-200 text-sm">Conexões que transformam</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Depoimentos</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 mt-2">
              Histórias de Sucesso
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conheça jovens empreendedores que transformaram suas vidas através do EJA
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Maria Santos',
                role: 'Fundadora, TechStart',
                text: 'A EJA me deu as ferramentas e o conhecimento necessários para transformar minha ideia em um negócio real. Hoje tenho uma startup de sucesso!',
                image: image1
              },
              {
                name: 'João Pedro',
                role: 'CEO, Digital Solutions',
                text: 'Os programas de mentoria são excepcionais. Aprendi mais em 3 meses do que em anos tentando sozinho. Recomendo fortemente!',
                image: image2
              },
              {
                name: 'Ana Costa',
                role: 'Empreendedora',
                text: 'A comunidade EJA é incrível! Fiz conexões valiosas que se tornaram parceiros de negócios. Mudou completamente minha trajetória.',
                image: image3
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic text-sm leading-relaxed">"{testimonial.text}"</p>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pronto Para Transformar Sua Ideia em Realidade?
            </h2>
            <p className="text-xl mb-10 text-primary-100">
              Junte-se a mais de 500 jovens empreendedores angolanos que já estão construindo o futuro. 
              Comece sua jornada hoje mesmo, é grátis!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn bg-white text-primary-600 hover:bg-gray-100 inline-flex items-center justify-center text-lg px-8 py-4">
                Criar Conta Gratuita
                <ArrowRight className="ml-2" size={24} />
              </Link>
              <Link to="/about" className="btn bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 inline-flex items-center justify-center text-lg px-8 py-4">
                Saber Mais
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>100% Gratuito</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>Sem Cartão de Crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>Acesso Imediato</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
