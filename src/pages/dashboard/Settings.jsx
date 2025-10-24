import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { Lock, Bell, Shield, Eye, EyeOff, Save } from 'lucide-react'

const Settings = () => {
  const { user, logout } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    newsletter: true
  })
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEmail: false,
    showPhone: false
  })

  const handlePasswordChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value
    })
  }

  const handleNotificationChange = (e) => {
    setNotifications({
      ...notifications,
      [e.target.name]: e.target.checked
    })
  }

  const handlePrivacyChange = (e) => {
    setPrivacy({
      ...privacy,
      [e.target.name]: e.target.checked
    })
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwords.new !== passwords.confirm) {
      alert('As senhas não coincidem!')
      return
    }
    console.log('Alterando senha...')
    alert('Senha alterada com sucesso!')
    setPasswords({ current: '', new: '', confirm: '' })
  }

  const handleNotificationSubmit = (e) => {
    e.preventDefault()
    console.log('Salvando preferências de notificação:', notifications)
    alert('Preferências salvas com sucesso!')
  }

  const handlePrivacySubmit = (e) => {
    e.preventDefault()
    console.log('Salvando configurações de privacidade:', privacy)
    alert('Configurações salvas com sucesso!')
  }

  const handleDeleteAccount = () => {
    if (confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      if (confirm('Digite "EXCLUIR" para confirmar')) {
        console.log('Excluindo conta...')
        logout()
      }
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-2">Gerencie suas preferências e segurança</p>
      </div>

      {/* Alterar Senha */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <Lock className="text-red-600" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Alterar Senha</h2>
            <p className="text-sm text-gray-600">Mantenha sua conta segura</p>
          </div>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha Atual
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="current"
                value={passwords.current}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nova Senha
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="new"
              value={passwords.new}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar Nova Senha
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirm"
              value={passwords.confirm}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Save size={18} />
            Alterar Senha
          </button>
        </form>
      </div>

      {/* Notificações */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Bell className="text-green-600" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Notificações</h2>
            <p className="text-sm text-gray-600">Configure como deseja receber notificações</p>
          </div>
        </div>

        <form onSubmit={handleNotificationSubmit} className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Notificações por E-mail</p>
              <p className="text-sm text-gray-600">Receba atualizações por e-mail</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="email"
                checked={notifications.email}
                onChange={handleNotificationChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Notificações por SMS</p>
              <p className="text-sm text-gray-600">Receba alertas importantes por SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="sms"
                checked={notifications.sms}
                onChange={handleNotificationChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Notificações Push</p>
              <p className="text-sm text-gray-600">Receba notificações no navegador</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="push"
                checked={notifications.push}
                onChange={handleNotificationChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Newsletter</p>
              <p className="text-sm text-gray-600">Receba novidades e dicas semanais</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="newsletter"
                checked={notifications.newsletter}
                onChange={handleNotificationChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <Save size={18} />
            Salvar Preferências
          </button>
        </form>
      </div>

      {/* Privacidade */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Shield className="text-purple-600" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Privacidade</h2>
            <p className="text-sm text-gray-600">Controle quem pode ver suas informações</p>
          </div>
        </div>

        <form onSubmit={handlePrivacySubmit} className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Perfil Público</p>
              <p className="text-sm text-gray-600">Permitir que outros membros vejam seu perfil</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="profilePublic"
                checked={privacy.profilePublic}
                onChange={handlePrivacyChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Mostrar E-mail</p>
              <p className="text-sm text-gray-600">Exibir seu e-mail no perfil público</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="showEmail"
                checked={privacy.showEmail}
                onChange={handlePrivacyChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Mostrar Telefone</p>
              <p className="text-sm text-gray-600">Exibir seu telefone no perfil público</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="showPhone"
                checked={privacy.showPhone}
                onChange={handlePrivacyChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            <Save size={18} />
            Salvar Configurações
          </button>
        </form>
      </div>

      {/* Zona de Perigo */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-red-900 mb-2">Zona de Perigo</h2>
        <p className="text-sm text-red-700 mb-4">
          Ações irreversíveis que afetam permanentemente sua conta
        </p>
        <button
          onClick={handleDeleteAccount}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
        >
          Excluir Conta
        </button>
      </div>
    </div>
  )
}

export default Settings
