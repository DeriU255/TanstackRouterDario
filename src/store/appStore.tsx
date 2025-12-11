import { Store } from '@tanstack/react-store'

//Tipos de modo claro y oscuro
export type Theme = 'dark' | 'light'

interface AppState {
  isMenuFixed: boolean
  theme: Theme
  tasks: string[]
  isAuthenticated: boolean
  user: { username: string; roles: string[] } | null
}

//Store en su estado inicial
export const appStore = new Store<AppState>({
  isMenuFixed: false,
  theme: 'dark',
  tasks: ['Tarea inicial 1', 'Tarea inicial 2'],
  isAuthenticated: !!localStorage.getItem('authToken'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
})

//Funciones "setter" exportables para modificar el estado de forma inmutable

export const setIsAuthenticated = (isAuthenticated: boolean) => {
  appStore.setState((state) => ({
    ...state,
    isAuthenticated,
  }))
}

export const setUser = (user: { username: string; roles: string[] } | null) => {
  appStore.setState((state) => ({
    ...state,
    user,
  }))
}

//Cambia el estado del menú entre fijo y dinámico.
export const toggleMenuFixed = () => {
  appStore.setState((state) => ({
    ...state,
    isMenuFixed: !state.isMenuFixed,
  }))
}

/**
 * Establece un tema específico ('dark' o 'light').
 * @param theme El tema a establecer.
 */
export const setTheme = (theme: Theme) => {
  appStore.setState((state) => ({
    ...state,
    theme: theme,
  }))
}


//Alterna entre el tema 'dark' y 'light'.
export const toggleTheme = () => {
  appStore.setState((state) => ({
    ...state,
    theme: state.theme === 'dark' ? 'light' : 'dark',
  }))
}

/**
 * Agrega una nueva tarea a la lista.
 * @param task La nueva tarea a agregar.
 */
export const addTask = (task: string) => {
  appStore.setState((state) => ({
    //Copio el estado actual para mantener la inmutabilidad
    ...state,
    //Sobrescribo la propiedad 'tasks' con un nuevo array
    //que contiene todas las tareas anteriores más la nueva.
    tasks: [...state.tasks, task],
  }))
}
