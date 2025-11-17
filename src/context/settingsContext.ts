import { createContext } from 'react'

export type MenuType = 'fixed' | 'dynamic'

export interface SettingsState {
  menuType: MenuType
}

export interface SettingsContextValue extends SettingsState {
  setMenuType: (menuType: MenuType) => void
  toggleMenuType: () => void
}

export const defaultSettings: SettingsState = {
  menuType: 'dynamic'
}

export const SettingsContext = createContext<SettingsContextValue | undefined>(undefined)