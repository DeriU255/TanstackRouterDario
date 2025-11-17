import Adios from '@/components/Adios'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/adios')({
    component: RouteComponent,
})

function RouteComponent(){
    return <Adios />
}