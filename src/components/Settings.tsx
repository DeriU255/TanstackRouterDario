import { useStore } from '@tanstack/react-store'
import { appStore, toggleMenuFixed, setTheme } from '../store/appStore'
import { Settings as SettingsIcon, Lock, Unlock, Sun, Moon } from 'lucide-react'

function Settings() {
  const isMenuFixed = useStore(appStore, (state) => state.isMenuFixed)
  const theme = useStore(appStore, (state) => state.theme)

  return (
    <div className={`min-h-[calc(100vh-4.5rem)] ${
      theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-100 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <SettingsIcon size={32} className="text-cyan-500" />
            <h1 className="text-3xl font-bold">Configuraciones</h1>
          </div>

          {/* Settings Cards */}
          <div className="space-y-6">
            
            {/* Theme Settings */}
            <div className={`p-6 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-300'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? (
                    <Moon size={24} className="text-blue-400" />
                  ) : (
                    <Sun size={24} className="text-yellow-500" />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">Tema de la aplicación</h3>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Selecciona entre tema claro y oscuro
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTheme('light')}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      theme === 'light'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Claro
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      theme === 'dark'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Oscuro
                  </button>
                </div>
              </div>
            </div>

            {/* Menu Settings */}
            <div className={`p-6 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-300'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isMenuFixed ? (
                    <Lock size={24} className="text-green-500" />
                  ) : (
                    <Unlock size={24} className="text-orange-500" />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">Comportamiento del menú lateral</h3>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Configura si el menú permanece fijo o se oculta dinámicamente
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { if (isMenuFixed) toggleMenuFixed() }}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      !isMenuFixed
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Dinámico
                  </button>
                  <button
                    onClick={() => { if (!isMenuFixed) toggleMenuFixed() }}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      isMenuFixed
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Fijo
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings