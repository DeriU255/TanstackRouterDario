import client from "./axiosClient";

// --- Interfaces ---

export interface Heroe {
  idHeroe: number;
  nombre: string;
  base: string;
  descripcion?: string;
}

export interface HeroeResumen {
  idHeroe: number;
  nombre: string;
}

export interface Equipo {
  idEquipo: number;
  nombre: string;
  ciudad: string;
  heroes: HeroeResumen[];
}

// --- Héroes ---

export async function getHeroes() {
  const response = await client.get<Heroe[]>("/heroes");
  return response as unknown as Heroe[];
}

export async function createHeroe(heroe: Partial<Heroe>) {
  const response = await client.post<Heroe>("/heroes", heroe);
  return response as unknown as Heroe;
}

// --- Equipos ---

export async function getEquipos() {
  const response = await client.get<Equipo[]>("/equipos");
  return response as unknown as Equipo[];
}

export async function createEquipo(equipo: Partial<Equipo>) {
  const response = await client.post<Equipo>("/equipos", equipo);
  return response as unknown as Equipo;
}
