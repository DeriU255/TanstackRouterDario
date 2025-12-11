import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getEquipos, createEquipo } from '../api/heroesService'
import type { Equipo } from '../api/heroesService'
import { useState } from 'react'

export const Route = createFileRoute('/equipos')({
  component: Equipos,
})

function Equipos() {
  const queryClient = useQueryClient()
  const { data: equipos, isLoading, error } = useQuery({
    queryKey: ['equipos'],
    queryFn: getEquipos,
  })

  const [newEquipo, setNewEquipo] = useState<Partial<Equipo>>({ nombre: '', ciudad: '' })

  const mutation = useMutation({
    mutationFn: createEquipo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipos'] })
      setNewEquipo({ nombre: '', ciudad: '' })
    },
    onError: (err) => {
      alert('Error al crear equipo: ' + err)
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(newEquipo)
  }

  if (isLoading) return <div className="p-4">Cargando equipos...</div>
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Equipos</h1>

      {/* Formulario */}
      <div className="mb-8 p-4 border rounded shadow-sm bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-2">Nuevo Equipo</h2>
        <form onSubmit={handleSubmit} className="flex gap-4 items-end flex-wrap">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              value={newEquipo.nombre}
              onChange={(e) => setNewEquipo({ ...newEquipo, nombre: e.target.value })}
              className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Ciudad</label>
            <input
              type="text"
              value={newEquipo.ciudad}
              onChange={(e) => setNewEquipo({ ...newEquipo, ciudad: e.target.value })}
              className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {mutation.isPending ? 'Guardando...' : 'Crear'}
          </button>
        </form>
      </div>

      {/* Listado */}
      <div className="grid grid-cols-1 gap-6">
        {equipos?.map((equipo) => (
          <div key={equipo.idEquipo} className="border p-4 rounded shadow bg-white dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-xl">{equipo.nombre}</h3>
                <p className="text-gray-600 dark:text-gray-300">{equipo.ciudad}</p>
              </div>
            </div>
            
            {/* Miniaturas de héroes */}
            <div>
              <h4 className="font-semibold text-sm mb-2 text-gray-500">Miembros:</h4>
              <div className="flex flex-wrap gap-2">
                {equipo.heroes && equipo.heroes.length > 0 ? (
                  equipo.heroes.map(h => (
                    <div key={h.idHeroe} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {h.nombre}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 italic">Sin miembros asignados</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
