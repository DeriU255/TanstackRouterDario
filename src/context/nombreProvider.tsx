import React, { useState, type ReactNode } from 'react';
import { NombreContext, type NombreContextType } from './nombreContext';
interface NombreProviderProps {
    children: ReactNode; // Tipo para los componentes hijos
}
export function NombreProvider({ children }: NombreProviderProps): React.JSX.Element {
    const [nombre, setNombre] = useState<string>('Invitado');
    const contextValue: NombreContextType = {
        nombre,
        setNombre,
    };
    return (
        // Suministra el estado y la función de actualización
        <NombreContext value={contextValue}>
            {children}
        </NombreContext>
    );
}