import { useState, useCallback, useEffect } from 'react'
import type { ReactNode } from 'react'
import { SettingsContext, defaultSettings } from './settingsContext'
import type { SettingsState, MenuType } from './settingsContext'

interface SettingsProviderProps {
  children: ReactNode
}

const STORAGE_KEY = 'app-settings'

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useState<SettingsState>(() => {
    try {
      const savedSettings = localStorage.getItem(STORAGE_KEY)
      if (savedSettings) {
        return { ...defaultSettings, ...JSON.parse(savedSettings) }
      }
    } catch (error) {
      console.error('Error loading settings from localStorage:', error)
    }
    return defaultSettings
  })

  // Guardar configuraciones en localStorage cuando cambien
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch (error) {
      console.error('Error saving settings to localStorage:', error)
    }
  }, [settings])

  const setMenuType = useCallback((menuType: MenuType) => {
    setSettings(prev => ({ ...prev, menuType }))
  }, [])

  const toggleMenuType = useCallback(() => {
    setSettings(prev => ({ 
      ...prev, 
      menuType: prev.menuType === 'fixed' ? 'dynamic' : 'fixed' 
    }))
  }, [])

  const contextValue = {
    ...settings,
    setMenuType,
    toggleMenuType,
  }

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  )
}