import { useQuery } from '@tanstack/react-query';
import { fetchPexelsImages } from '../api/imagenesPexel';
import { imagenesAdapter } from '../adapters/imagenesAdapter';

export const useImages = () => {
  const query = useQuery({
    queryKey: ['imagenes', 'tigers'], //Clave para  que se identifique esta consulta
    queryFn: async () => {
      //Datos crudos de la API
      const data = await fetchPexelsImages('Tigers');
      //Formateo para la app
      return imagenesAdapter(data);
    },
    staleTime: 1000 * 60 * 5, //Considero frescos por 5 minutos los datos
  });

  return query;
};
