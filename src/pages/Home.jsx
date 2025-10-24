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
      image: 'https://incubadora.unizambeze.ac.mz/pluginfile.php/54/mod_folder/content/0/Incuba%C3%A7%C3%A3o.jpg',
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

  const testimonials = [
    {
      name: 'Maria Santos',
      role: 'Fundadora, TechStart',
      text: 'A EJA me deu as ferramentas e o conhecimento necessários para transformar minha ideia em um negócio real. Hoje tenho uma startup de sucesso!',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop'
    },
    {
      name: 'João Pedro',
      role: 'CEO, Digital Solutions',
      text: 'Os programas de mentoria são excepcionais. Aprendi mais em 3 meses do que em anos tentando sozinho. Recomendo fortemente!',
      image: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=400&h=400&fit=crop'
    },
    {
      name: 'Ana Costa',
      role: 'Empreendedora Social',
      text: 'A comunidade EJA é incrível! Fiz conexões valiosas que se tornaram parceiros de negócios. Mudou completamente minha trajetória.',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop'
    },
    {
      name: 'Carlos Mendes',
      role: 'Fundador, AgriTech Angola',
      text: 'Através do EJA consegui acesso a mentores que me ajudaram a escalar meu negócio. Hoje empregamos mais de 20 pessoas!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&sat=-100&bri=10'
    },
    {
      name: 'Beatriz Silva',
      role: 'CEO, Fashion Hub',
      text: 'O networking e os workshops práticos foram fundamentais para o crescimento da minha marca. Gratidão eterna ao EJA!',
      image: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=400&h=400&fit=crop'
    },
    {
      name: 'Miguel Fernandes',
      role: 'Fundador, EduTech Solutions',
      text: 'O EJA transformou minha visão de negócio. Com o apoio dos mentores, consegui validar minha ideia e lançar uma plataforma educacional que já impactou milhares de estudantes.',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop'
    },
    {
      name: 'Luciana Alves',
      role: 'Diretora, Green Energy Angola',
      text: 'Participar dos programas do EJA foi decisivo para estruturar meu negócio de energia renovável. Hoje somos referência no setor!',
      image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop'
    },
    {
      name: 'Pedro Nunes',
      role: 'CEO, FinTech Luanda',
      text: 'A formação prática que recebi no EJA foi essencial para entender o mercado financeiro angolano. Hoje nossa fintech processa milhões em transações mensais.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop'
    },
    {
      name: 'Sofia Rodrigues',
      role: 'Fundadora, Health Connect',
      text: 'O EJA me conectou com investidores e parceiros estratégicos. Nossa startup de saúde digital agora opera em 5 províncias de Angola!',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop'
    },
    {
      name: 'André Tavares',
      role: 'Diretor, Food Innovation',
      text: 'Graças ao EJA, transformei meu pequeno negócio de alimentos em uma empresa com distribuição nacional. O apoio foi fundamental em cada etapa!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
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
      <section className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
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
            <div className="absolute inset-0 flex items-center px-4">
              <div className="container-custom">
                <div className="max-w-2xl text-white">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-2 md:mb-3 text-gray-200 font-semibold">
                    {slide.subtitle}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg mb-4 md:mb-6 text-gray-300 hidden sm:block">
                    {slide.description}
                  </p>
                  <Link
                    to={slide.ctaLink}
                    className="inline-flex items-center px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition font-bold text-sm sm:text-base md:text-lg shadow-2xl hover:shadow-yellow-500/50"
                  >
                    {slide.cta}
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition z-10"
        >
          <ChevronLeft className="text-white" size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition z-10"
        >
          <ChevronRight className="text-white" size={20} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-20 sm:bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
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
        <div className="absolute bottom-4 md:bottom-8 left-0 right-0 z-10 px-4">
          <div className="container-custom">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 max-w-xl bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl p-3 sm:p-4 md:p-6">
              <div className="text-center text-white">
                <div className="text-lg sm:text-2xl md:text-3xl font-bold mb-0.5 md:mb-1">500+</div>
                <div className="text-[10px] sm:text-xs text-gray-200">Membros Ativos</div>
              </div>
              <div className="text-center text-white">
                <div className="text-lg sm:text-2xl md:text-3xl font-bold mb-0.5 md:mb-1">50+</div>
                <div className="text-[10px] sm:text-xs text-gray-200">Programas</div>
              </div>
              <div className="text-center text-white">
                <div className="text-lg sm:text-2xl md:text-3xl font-bold mb-0.5 md:mb-1">95%</div>
                <div className="text-[10px] sm:text-xs text-gray-200">Satisfação</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom px-4">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
              O Que Oferecemos
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
              Tudo Para o Seu Sucesso
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Oferecemos um ecossistema completo de apoio ao empreendedorismo jovem, 
              com recursos práticos e mentoria especializada para transformar sua visão em realidade
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
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
                color: 'bg-yellow-500',
                bgColor: 'bg-yellow-50',
                borderColor: 'border-yellow-200'
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
                  className={`bg-white rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow border-t-4 ${service.borderColor}`}
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${service.color} rounded-lg md:rounded-xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{service.description}</p>
                </div>
              )
            })}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-10 sm:mt-12 md:mt-16">
            <Link 
              to="/register" 
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-yellow-500 text-white rounded-lg sm:rounded-xl hover:bg-yellow-600 transition font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl"
            >
              Começar Agora
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Objetivos Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom px-4">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
              Nossa Missão
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
              O Que Buscamos Alcançar
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Trabalhamos com três pilares fundamentais para transformar o ecossistema empreendedor angolano
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-500">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Target className="text-white" size={22} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Capacitar Jovens</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Formação prática e teórica para jovens empreendedores angolanos alcançarem o sucesso nos negócios.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-t-4 border-yellow-500">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="text-white" size={22} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Cultura Empreendedora</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Fomentar a cultura empreendedora em Angola, inspirando jovens a criarem soluções inovadoras.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-t-4 border-green-500">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="text-white" size={22} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Desenvolvimento Econômico</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Contribuir para o desenvolvimento do país através do fortalecimento do ecossistema empreendedor.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-t-4 border-purple-500">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-white" size={22} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Networking</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Conectar jovens empreendedores criando uma rede colaborativa de apoio mútuo e parcerias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Público-Alvo Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container-custom px-4">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Para Quem</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 mt-2 px-4">
              Público-Alvo
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary-600" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Jovens Empreendedores</h3>
              <p className="text-gray-600 text-sm">Jovens angolanos com espírito empreendedor que desejam iniciar ou expandir seus negócios</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-yellow-600" size={28} />
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
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom px-4">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
              Parceiros
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
              Quem Nos Apoia
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Trabalhamos com empresas e organizações comprometidas com o desenvolvimento do empreendedorismo em Angola
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-7 md:gap-8 max-w-4xl mx-auto">
            {/* Queta Boost */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                <img 
                  src={image4} 
                  alt="Queta Boost" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Queta Boost</h3>
              <p className="text-primary-600 font-semibold mb-3">Consultoria Estratégica</p>
              <p className="text-sm text-gray-600">
                Apoio em estratégia e desenvolvimento de negócios
              </p>
            </div>

            {/* Parceiro 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Rocket className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Inovação Hub</h3>
              <p className="text-yellow-600 font-semibold mb-3">Aceleração de Startups</p>
              <p className="text-sm text-gray-600">
                Programas de aceleração e mentoria
              </p>
            </div>

            {/* Mais Parceiros */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border-2 border-dashed border-gray-300 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Users className="text-gray-400" size={28} />
              </div>
              <p className="text-xl font-bold text-gray-700 mb-2">+ Outros Parceiros</p>
              <p className="text-sm text-gray-600">
                Junte-se a nós nessa missão
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom px-4">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
              Depoimentos
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Histórias de Sucesso
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Conheça jovens empreendedores que transformaram suas vidas através do EJA
            </p>
          </div>

          {/* Carrossel Infinito Contínuo */}
          <div className="relative overflow-hidden">
            <div className="flex gap-4 md:gap-6" style={{ animation: 'scroll 10s linear infinite' }}>
              {/* Duplicamos os depoimentos para criar efeito infinito */}
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-4 md:p-5 flex flex-col min-w-[250px] md:min-w-[280px] flex-shrink-0"
                >
                  {/* Imagem */}
                  <div className="flex justify-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-24 h-24 rounded-full object-cover border-4 border-primary-100 shadow-md"
                    />
                  </div>
                  
                  {/* Estrelas */}
                  <div className="flex items-center justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  
                  {/* Texto */}
                  <p className="text-gray-600 text-sm italic mb-4 leading-relaxed text-center flex-grow">
                    "{testimonial.text}"
                  </p>
                  
                  {/* Nome e Cargo */}
                  <div className="text-center pt-4 border-t border-gray-100">
                    <p className="font-bold text-gray-900 mb-1">{testimonial.name}</p>
                    <p className="text-primary-600 font-semibold text-sm">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="container-custom relative z-10 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Pronto Para Transformar Sua Ideia em Realidade?
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 text-yellow-50">
              Junte-se a mais de 500 jovens empreendedores angolanos que já estão construindo o futuro. 
              Comece sua jornada hoje mesmo, é grátis!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/register" className="bg-white text-yellow-700 hover:bg-yellow-50 inline-flex items-center justify-center text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 font-bold shadow-2xl hover:shadow-xl transition-all rounded-xl">
                Criar Conta Gratuita
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link to="/about" className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-yellow-700 inline-flex items-center justify-center text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 font-semibold transition-all rounded-xl">
                Saber Mais
              </Link>
            </div>
            
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm">
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
