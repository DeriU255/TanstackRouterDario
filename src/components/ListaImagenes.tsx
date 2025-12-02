import { useImages } from '../hooks/useImages';
import TarjetaImagen from './TarjetaImagen';
import { Loader2, AlertCircle } from 'lucide-react';
import { useStore } from '@tanstack/react-store';
import { appStore } from '../store/appStore';

export default function ListaImagenes() {
  const { data: imagenes, isLoading, isError, error } = useImages();

  const theme = useStore(appStore, (state) => state.theme);

  //Estado de Carga
  if (isLoading) {
    return (
      <div className={`flex flex-col justify-center items-center min-h-[calc(100vh-4.5rem)] ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
      }`}>
        <Loader2 className="animate-spin text-cyan-500 mb-4" size={48} />
        <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Cargando tigres...</p>
      </div>
    );
  }

  //Estado de Error
  if (isError) {
    return (
      <div className={`flex flex-col justify-center items-center min-h-[calc(100vh-4.5rem)] ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
      }`}>
        <div className="text-red-500 flex flex-col items-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <AlertCircle size={48} className="mb-4" />
          <h3 className="text-xl font-bold mb-2">Error al cargar imágenes</h3>
          <p>{error?.message || 'Ocurrió un error inesperado'}</p>
        </div>
      </div>
    );
  }

  //Éxito
  return (
    <div className={`min-h-[calc(100vh-4.5rem)] ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className={`text-3xl font-bold mb-8 text-center ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Galería de Tigres (Pexels API)
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {imagenes?.map((img) => (
            <TarjetaImagen key={img.id} imagen={img} />
          ))}
        </div>
      </div>
    </div>
  );
}
