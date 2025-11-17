import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { useStore } from '@tanstack/react-store'
import { appStore } from '../store/appStore'

import Header from '../components/Header'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

function RootComponent() {
  const theme = useStore(appStore, (state) => state.theme)
  const isMenuFixed = useStore(appStore, (state) => state.isMenuFixed)

  return (
    <div className={theme}>
      <div className={`${isMenuFixed ? 'ml-80' : ''} transition-all duration-300`}>
        <Header />
        <main>
          <Outlet />
        </main>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
      </div>
    </div>
  )
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
})
