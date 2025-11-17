import { useContext } from 'react'
import { SettingsContext } from './settingsContext'
import type { SettingsContextValue } from './settingsContext'

export const useSettings = (): SettingsContextValue => {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}