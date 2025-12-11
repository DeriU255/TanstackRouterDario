import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { login } from '../api/authService'
import { setIsAuthenticated, setUser } from '../store/appStore'

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: (credentials: { u: string; p: string }) => login(credentials.u, credentials.p),
    onSuccess: (data) => {
      // Guardar en localStorage
      localStorage.setItem('authToken', data.token)
      localStorage.setItem('user', JSON.stringify({ username: data.username, roles: data.roles }))
      
      // Actualizar store
      setIsAuthenticated(true)
      setUser({ username: data.username, roles: data.roles })
      
      navigate({ to: '/' })
    },
    onError: (error) => {
      alert('Error: ' + error.message)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({ u: username, p: password })
  }

  return (
    <div className="p-4 max-w-md mx-auto mt-10 border rounded shadow bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {mutation.isPending ? 'Autenticando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}
