import { useNombre } from '@/context/useNombre';

function Hola() {
    //CONTEXTO COMPARTIDO
    const{nombre, setNombre} = useNombre();

    //ESTADO-CONTEXTO LOCAL AL COMPONENTE
    //const[prop, setProp] = useState<string>('Hola');

  return (
    <>
    <div className ="flex flex-col justify-center items-center min-h-[calc(100vh-4.5rem)] bg-gray-500">
      <main className="grow flex flex-col items-center justify-center">
      <h1 className='hola text-white'>Hola {nombre}, ¿quieres cambiar tu nombre?</h1>
      <input
        className='border border-grey-400 w-full px-3 py-1 rounded-full focus:outline-none focus:ring-1 text-white' 
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Escribe un nombre..."
        />
      </main>
    </div>
    </>
  )
}

export default Hola