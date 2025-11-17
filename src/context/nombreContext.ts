import type { Dispatch, SetStateAction } from "react";
import { createContext } from "react";

//1. Tipado del Valor del Contexto
export interface NombreContextType{
    nombre: string;
    setNombre: Dispatch<SetStateAction<string>>;
}

//2. Creación del Contexto con valor inicial de null
export const NombreContext = createContext<NombreContextType | null>(null);