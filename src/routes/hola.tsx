import Hola from '@/components/Hola'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hola')({
    component: RouteComponent,
})

function RouteComponent(){
    return <Hola/>
}