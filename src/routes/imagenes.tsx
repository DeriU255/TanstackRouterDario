import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/imagenes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/imagenes"!</div>
}
