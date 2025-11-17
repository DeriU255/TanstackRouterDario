import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Home, Menu, Network, X, Settings } from 'lucide-react'
import { useStore } from '@tanstack/react-store'
import { appStore } from '../store/appStore'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const isMenuFixed = useStore(appStore, (state) => state.isMenuFixed)
  const theme = useStore(appStore, (state) => state.theme)

  const isMenuVisible = isMenuFixed || isOpen

  if (isMenuFixed) {
    return (
      <>
        {/* Menú Lateral Fijo */}
        <aside
          className={`
            fixed top-0 left-0 h-full w-80 shadow-2xl flex flex-col
            ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900 border-r'}
          `}
        >
          <div className={`flex items-center justify-between p-4 border-b ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
          }`}>
            <h2 className="text-xl font-bold">Navegación</h2>
          </div>
          <NavContent />
        </aside>

        {/* Header para la versión de menú fijo */}
        <header className={`p-4 flex items-center shadow-lg ${
          theme === 'dark' 
            ? 'bg-gray-800 text-white' 
            : 'bg-white text-gray-900 border-b'
        }`}>
          <h1 className="ml-4 text-xl font-semibold">
            <Link to="/">
              <img
                src={theme === 'dark' ? "/tanstack-word-logo-white.svg" : "/tanstack-word-logo-black.svg"}
                alt="TanStack Logo"
                className="h-10"
                onError={(e) => { e.currentTarget.src = "/tanstack-word-logo-white.svg"; }}
              />
            </Link>
          </h1>
        </header>
      </>
    )
  }

  // Renderizado para menú dinámico (no fijo)
  return (
    <>
      <header className={`p-4 flex items-center shadow-lg ${
        theme === 'dark' 
          ? 'bg-gray-800 text-white' 
          : 'bg-white text-gray-900 border-b'
      }`}>
        <button
          onClick={() => setIsOpen(true)}
          className={`p-2 rounded-lg transition-colors ${
            theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="ml-4 text-xl font-semibold">
          <Link to="/">
            <img
              src={theme === 'dark' ? "/tanstack-word-logo-white.svg" : "/tanstack-word-logo-black.svg"}
              alt="TanStack Logo"
              className="h-10"
              onError={(e) => { e.currentTarget.src = "/tanstack-word-logo-white.svg"; }}
            />
          </Link>
        </h1>
      </header>

      {/* Overlay para cerrar el menú */}
      {isMenuVisible && !isMenuFixed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-50
          w-80 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col
          ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900 border-r'}
          ${isMenuVisible ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className={`flex items-center justify-between p-4 border-b ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
        }`}>
          <h2 className="text-xl font-bold">Navegación</h2>
          <button
            onClick={() => setIsOpen(false)}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
            }`}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <NavContent closeMenu={() => setIsOpen(false)} />
      </aside>
    </>
  )
}

// Componente para el contenido de la navegación
const NavContent = ({ closeMenu }: { closeMenu?: () => void }) => {
  const theme = useStore(appStore, (state) => state.theme)
  const isMenuFixed = useStore(appStore, (state) => state.isMenuFixed)

  const handleClick = () => {
    if (!isMenuFixed && closeMenu) {
      closeMenu()
    }
  }

  return (
    <nav className="flex-1 p-4 overflow-y-auto">
      <Link
        to="/"
        onClick={handleClick}
        className={`flex items-center gap-3 p-3 rounded-lg transition-colors mb-2 ${
          theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
        }`}
        activeProps={{ className: 'bg-cyan-600 hover:bg-cyan-700' }}
      >
        <Home size={20} />
        <span className="font-medium">Home</span>
      </Link>

      <Link
        to="/demo/tanstack-query"
        onClick={handleClick}
        className={`flex items-center gap-3 p-3 rounded-lg transition-colors mb-2 ${
          theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
        }`}
        activeProps={{ className: 'bg-cyan-600 hover:bg-cyan-700' }}
      >
        <Network size={20} />
        <span className="font-medium">TanStack Query</span>
      </Link>

      <Link
        to="/hello"
        onClick={handleClick}
        className={`flex items-center gap-3 p-3 rounded-lg transition-colors mb-2 ${
          theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
        }`}
        activeProps={{ className: 'bg-cyan-600 hover:bg-cyan-700' }}
      >
        <Network size={20} />
        <span className="font-medium">Hello!</span>
      </Link>

      <Link
        to="/hola"
        onClick={handleClick}
        className={`flex items-center gap-3 p-3 rounded-lg transition-colors mb-2 ${
          theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
        }`}
        activeProps={{ className: 'bg-cyan-600 hover:bg-cyan-700' }}
      >
        <Network size={20} />
        <span className="font-medium">Hola</span>
      </Link>

      <Link
        to="/adios"
        onClick={handleClick}
        className={`flex items-center gap-3 p-3 rounded-lg transition-colors mb-2 ${
          theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
        }`}
        activeProps={{ className: 'bg-cyan-600 hover:bg-cyan-700' }}
      >
        <Network size={20} />
        <span className="font-medium">Adiós</span>
      </Link>

      <Link
        to="/settings"
        onClick={handleClick}
        className={`flex items-center gap-3 p-3 rounded-lg transition-colors mb-2 ${
          theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
        }`}
        activeProps={{ className: 'bg-cyan-600 hover:bg-cyan-700' }}
      >
        <Settings size={20} />
        <span className="font-medium">Settings</span>
      </Link>
    </nav>
  )
}
