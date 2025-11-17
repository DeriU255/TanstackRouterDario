import { Store } from '@tanstack/react-store'

//Tipos de modo claro y oscuro
export type Theme = 'dark' | 'light'

interface AppState {
  isMenuFixed: boolean
  theme: Theme
  tasks: string[]
}

//Store en su estado inicial
export const appStore = new Store<AppState>({
  isMenuFixed: false,
  theme: 'dark',
  tasks: ['Tarea inicial 1', 'Tarea inicial 2'],
})

//Funciones "setter" exportables para modificar el estado de forma inmutable

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
    // Copiamos el estado actual para mantener la inmutabilidad
    ...state,
    // Sobrescribimos la propiedad 'tasks' con un nuevo array
    // que contiene todas las tareas anteriores más la nueva.
    tasks: [...state.tasks, task],
  }))
}

/**
 * Elimina una tarea de la lista por su índice.
 * @param index El índice de la tarea a eliminar.
 */
export const removeTask = (index: number) => {
  appStore.setState((state) => ({
    ...state,
    // Creamos un nuevo array filtrando la tarea que no queremos
    tasks: state.tasks.filter((_, i) => i !== index),
  }))
}

/**
 * Elimina todas las tareas de la lista.
 */
export const clearTasks = () => {
  appStore.setState((state) => ({
    ...state,
    tasks: [],
  }))
}
