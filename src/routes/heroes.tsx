import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getHeroes, createHeroe, getEquipos } from '../api/heroesService'
import type { CreateHeroeRequest } from '../api/heroesService'
import { useState } from 'react'

export const Route = createFileRoute('/heroes')({
  component: Heroes,
})

function Heroes() {
  const queryClient = useQueryClient()
  
  // 1. Query para obtener los héroes (GET)
  const { data: heroes, isLoading: isLoadingHeroes, error: errorHeroes } = useQuery({
    queryKey: ['heroes'],
    queryFn: async () => {
      const data = await getHeroes()
      console.log('Héroes recibidos:', data)
      return data
    },
  })

  // 2. Query para obtener los equipos (GET)
  const { data: equipos, isLoading: isLoadingEquipos } = useQuery({
    queryKey: ['equipos'],
    queryFn: getEquipos,
  })

  // Estado para el formulario de nuevo héroe
  const [newHeroe, setNewHeroe] = useState<{ nombre: string; base: string; idEquipo: string }>({ 
    nombre: '', 
    base: '',
    idEquipo: ''
  })

  // 3. Mutación para crear héroe (POST)
  const mutation = useMutation({
    mutationFn: (data: { nombre: string; base: string; idEquipo: string }) => {
      const payload: CreateHeroeRequest = {
        nombre: data.nombre,
        base: data.base,
        miEquipo: {
          idEquipo: parseInt(data.idEquipo)
        }
      }
      return createHeroe(payload)
    },
    onSuccess: () => {
      // Invalidamos la query 'heroes' para que se recargue la lista automáticamente
      queryClient.invalidateQueries({ queryKey: ['heroes'] })
      // Limpiamos el formulario
      setNewHeroe({ nombre: '', base: '', idEquipo: '' })
    },
    onError: (err) => {
      alert('Error al crear héroe: ' + err)
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newHeroe.idEquipo) {
      alert('Debes seleccionar un equipo')
      return
    }
    mutation.mutate(newHeroe)
  }

  if (isLoadingHeroes) return <div className="p-4">Cargando héroes...</div>
  if (errorHeroes) return <div className="p-4 text-red-500">Error: {errorHeroes.message}</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Héroes</h1>

      {/* Formulario de creación */}
      <div className="mb-8 p-4 border rounded shadow-sm bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-2">Nuevo Héroe</h2>
        <form onSubmit={handleSubmit} className="flex gap-4 items-end flex-wrap">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              value={newHeroe.nombre}
              onChange={(e) => setNewHeroe({ ...newHeroe, nombre: e.target.value })}
              className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Base</label>
            <input
              type="text"
              value={newHeroe.base}
              onChange={(e) => setNewHeroe({ ...newHeroe, base: e.target.value })}
              className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Equipo</label>
            <select
              value={newHeroe.idEquipo}
              onChange={(e) => setNewHeroe({ ...newHeroe, idEquipo: e.target.value })}
              className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 min-w-[200px]"
              required
            >
              <option value="">Selecciona un equipo</option>
              {equipos?.map((equipo) => (
                <option key={equipo.idEquipo} value={equipo.idEquipo}>
                  {equipo.nombre} ({equipo.ciudad})
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={mutation.isPending || isLoadingEquipos}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {mutation.isPending ? 'Guardando...' : 'Crear'}
          </button>
        </form>
      </div>

      {/* Listado de Héroes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {heroes?.map((heroe) => (
          <div key={heroe.idHeroe} className="border p-4 rounded shadow hover:shadow-md transition-shadow bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center text-center">
            <img 
              src={`https://robohash.org/${encodeURIComponent(heroe.nombre)}?size=150x150`} 
              alt={heroe.nombre}
              className="w-32 h-32 mb-4 rounded-full bg-gray-100 dark:bg-gray-700 p-2"
            />
            <h3 className="font-bold text-lg">{heroe.nombre}</h3>
            <p className="text-gray-600 dark:text-gray-300">Base: {heroe.base}</p>
            {heroe.descripcion && <p className="text-sm mt-2">{heroe.descripcion}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
