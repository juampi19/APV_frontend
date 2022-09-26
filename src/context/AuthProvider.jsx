import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/axios';

//Creamos el contex
const AuthContext = createContext();

//Componente padre
const AuthProvider = ( { children } ) => {
    
    const [ cargando, setCargando ] = useState(true);
    //UseState del Auth
    const [ auth, setAuth ] = useState({});

    //Revisamos si el usuario esta autenticado
    useEffect( () => {

        //Revisamos el token
        const autenticarUsuario = async() => {
            const token = localStorage.getItem('token');
            
            //Cuando no existe un token
            if( !token ) {
                setCargando(false)
                return;
            };
            
            /**Mandamos el token al header con bearer
             * 1-Creamos una configuración
             * 2-Mandamos la peticion a la url
             */
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                
                const { data } = await clienteAxios( 'veterinarios/perfil',config );

                setAuth( data );

            } catch (error) {
                console.log( error );
                setAuth({});
            }

            setCargando( false );
        }

        autenticarUsuario();

    }, [] );

    const cerrarSesion = () => {
        //Primero eliminamos el token
        localStorage.removeItem( 'token' );

        //Regresamos setauth a un objeto vacio
        setAuth({});
    }

    const actualizarPerfil = async ( datos ) => {
        const token = localStorage.getItem('token');
            if( !token ) {
                setCargando(false)
                return;
            };            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const url = `/veterinarios/perfil/${datos._id}`;

                const { data } = await clienteAxios.put( url, datos, config );
                
                return {
                    msg: 'Almacenado Correctamente'
                }
            } catch (error) {
                return {
                    msg: error.response.data.msg,
                    error: true,
                }
            }
    }

    const guardarPassword = async ( datos ) => {
        const token = localStorage.getItem('token');
            if( !token ) {
                setCargando(false)
                return;
            };            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

        try {
            const url = '/veterinarios/actualizar-password';

            const { data } = await clienteAxios.put( url, datos, config  );

            return {
                msg: data.msg
            };
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true,
            }
        }    
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >

            { children }        

        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;