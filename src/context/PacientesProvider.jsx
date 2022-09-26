import { createContext, useState, useEffect } from 'react';
import UseAuth from '../hooks/UseAuth';
import clienteAxios from '../config/axios';

//Creando el contex para poder agregar pacientes
const PacientesContext = createContext();

export const PacientesProvider = ( { children } ) => {
    const [ pacientes, setPacientes ] = useState([]);
    const [ paciente, setPaciente ] = useState({});

    const { auth } = UseAuth();

    useEffect( () => {
        const obtenerPacientes = async () => {

            try {
                //Primero obtenemos el token
                const token = localStorage.getItem( 'token' );
                if( !token ) return;

                //Creamos el config
                const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios( '/pacientes', config );

                setPacientes( data );

            } catch (error) {
                console.log( error );
            }

        }
        obtenerPacientes();
    },[ auth ] );

    //Funcion para guardar los pacientes en la bd
    const guardarPaciente = async ( paciente ) => {

        //Obtenemos el token del ls
        const token = localStorage.getItem( 'token' );
        
        //Creamos el config
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        //Comprobamos si se esta mandando un id para editar
        if( paciente.id ){

            try {
                
                const { data } = await clienteAxios.put( `/pacientes/${paciente.id}`, paciente, config );
                
                //Si encuentra el id editamos, si no lo dejamos como estaba
                const pacientesActualizados = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState );

                setPacientes( pacientesActualizados );
            } catch (error) {
                console.log( error );
            }
        }else {
            
            try {
                
                const { data } = await clienteAxios.post( '/pacientes', paciente, config );
    
                const { __v, ...pacienteAlmacenado } = data;
                
                //Agregamos el paciente al state
                setPacientes( [ pacienteAlmacenado, ...pacientes ] );
    
            } catch (error) {
                console.log( error );
            }
        }
        
    }

    //Funcion para editar
    const setEdicion = ( paciente ) => {
        setPaciente( paciente );
    }

    //eliminar paciente
    const setEliminar = async ( id ) => {
        const confirmar = confirm( '¿Deseas Eliminar al Paciente ?' );

        if( confirmar ) {
            try {
                //Obtenemos el token del ls
                const token = localStorage.getItem( 'token' );
        
                //Creamos el config
                const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.delete( `/pacientes/${id}`, config );

                const pacientesActualizados = pacientes.filter( pacienteState => pacienteState._id !== id );

                setPacientes( pacientesActualizados )
                    
            } catch (error) {
                console.log( error );
            }
        }
    }

    return(
        <PacientesContext.Provider
        value={{
            pacientes,
            guardarPaciente,
            setEdicion,
            paciente,
            setEliminar
        }}
        >
            {children}
        </PacientesContext.Provider>
    );

}



export default PacientesContext;