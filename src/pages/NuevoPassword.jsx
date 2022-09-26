import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {

  const [ password, setPassword ] = useState('');
  const [ alerta, setAlerta ] = useState( {} );
  /*Comprobamos que el token sea valido para mostrar el formulario*/
  const [ tokenValido, setTokenValido ] = useState( false );
  const [ passwordModificado, setPasswordModificado ] = useState( false );

  //Extraemos el token de la url
  const params = useParams();
  const { token } = params;


  //Comprobamos el token de la url
  useEffect( () => {
    const comprobarToken = async () => {

      try {
        //Comprobamos que el token sea el correcto
        await clienteAxios( `/veterinarios/olvide-password/${ token }` );
        setTokenValido( true );

        setAlerta( {
          msg: 'Ingresa tu nuevo Password',
          error: false
        } );

      } catch (error) {
        //Mandamos el mensaje de error
        setAlerta( {
          msg: 'Hubo un error con el enlace',
          error: true,
        } );
      }

    }
    comprobarToken();
  }, [] );

  //Funcion para mandar la petición post al backend
  const handleSubmit = async ( e ) => {
    e.preventDefault();

    //Validamos el largo del password
    if( password.length < 6 ) {
      setAlerta( {
        msg: 'El Password debe ser mínimo de 6 caracteres',
        error: true
      } );

      return
    }

    try {

      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post( url, { password } );

      console.log( data );

      setAlerta( {
        msg: data.msg
      } );

      setPasswordModificado( true );

      
    } catch (error) {

      setAlerta({
        msg: error.response.data.msg,
        error: true
      });

    }

  }

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl">Reestablece tu Password y no pierdas acceso a  <span className="text-black"> tus Pacientes</span> </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg py-5 px-10 rounded-xl bg-white'>

      { msg && <Alerta 
            alerta={ alerta }
      /> }

      
      { tokenValido && (

        <>
          <form action=""
          onSubmit={handleSubmit}>

          <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Nuevo Password</label>

              <input type="Tu Nuevo password" placeholder="Tu Password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={ password }
              onChange={ e => setPassword( e.target.value ) }/>
          </div>

          <input type="submit" value="Guardar Password" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 lg:w-auto" />

          </form> 

          
        </>
      ) }
        { passwordModificado && <Link
          className='block text-center my-5 text-gray-500 font-bold' 
          to="/">Iniciar Sesión</Link> }

      </div>

    </>
  )
}

export default NuevoPassword