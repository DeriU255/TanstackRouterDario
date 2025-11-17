import { useContext } from 'react';
import { NombreContext, type NombreContextType } from './nombreContext';
export function useNombre(): NombreContextType {
    const context = useContext(NombreContext);
    if (!context) {
        // Lanza un error si no se usa dentro del Provider
        throw new Error('useNombre debe usarse dentro de un UserProvider');
    }
    // Ahora context es definitivamente de tipo NombreContextType
    return context;
}