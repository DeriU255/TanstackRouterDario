import type { ImagenApp } from '../adapters/imagenesAdapter';

interface Props {
  imagen: ImagenApp;
}

export default function TarjetaImagen({ imagen }: Props) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col h-full">
      <div className="h-48 overflow-hidden">
        <img 
          src={imagen.url} 
          alt={imagen.descripcion} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex flex-col grow">
        <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide mb-1">
          Fotógrafo
        </p>
        <p className="font-bold text-lg text-gray-900 dark:text-white truncate mb-2">
          {imagen.fotografo}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2" title={imagen.descripcion}>
          {imagen.descripcion}
        </p>
      </div>
    </div>
  );
}
