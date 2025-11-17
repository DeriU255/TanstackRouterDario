import { useNombre } from '@/context/useNombre';

function Adios() {
    //CONTEXTO COMPARTIDO
    const{nombre} = useNombre();

    //ESTADO-CONTEXTO LOCAL AL COMPONENTE
    //const[prop, setProp] = useState<string>('Hola');

  return (
    <>
    <div className ="flex flex-col justify-center items-center min-h-[calc(100vh-4.5rem)] bg-gray-500">
      <main className="grow flex flex-col items-center justify-center">
      <h1 className='hola text-white'>Adiós {nombre}.</h1>
      </main>
    </div>
    </>
  )
}

export default Adios