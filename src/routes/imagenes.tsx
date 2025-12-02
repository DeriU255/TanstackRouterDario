import { createFileRoute } from '@tanstack/react-router'
import ListaImagenes from '@/components/ListaImagenes'

export const Route = createFileRoute('/imagenes')({
  component: ListaImagenes,
})
