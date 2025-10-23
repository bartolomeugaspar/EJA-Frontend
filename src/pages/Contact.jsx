import { Mail, Phone, MapPin } from 'lucide-react'

const Contact = () => {
  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Contato</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Entre em Contato</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Mail className="text-primary-600 mt-1" size={20} />
              <div>
                <p className="font-medium">E-mail</p>
                <p className="text-gray-600">contato@eja.ao</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="text-primary-600 mt-1" size={20} />
              <div>
                <p className="font-medium">Telefone</p>
                <p className="text-gray-600">+244 923 456 789</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="text-primary-600 mt-1" size={20} />
              <div>
                <p className="font-medium">Endereço</p>
                <p className="text-gray-600">Luanda, Angola</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Envie uma Mensagem</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input type="text" className="input" placeholder="Seu nome" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input type="email" className="input" placeholder="seu@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
              <textarea className="input" rows="4" placeholder="Sua mensagem"></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
