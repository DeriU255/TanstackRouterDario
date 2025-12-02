import type { PexelsResponse } from '../api/imagenesPexel';

export interface ImagenApp {
  id: number;
  url: string;
  fotografo: string;
  descripcion: string;
}

export const imagenesAdapter = (data: PexelsResponse): ImagenApp[] => {
  return data.photos.map((photo) => ({
    id: photo.id,
    url: photo.src.medium,
    fotografo: photo.photographer,
    descripcion: photo.alt || 'Sin descripción', //Pexels a veces devuelve un alt vacío
  }));
};
