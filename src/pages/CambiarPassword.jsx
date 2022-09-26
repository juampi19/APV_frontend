import { useState, useEffect } from 'react';
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta";
import UseAuth from '../hooks/UseAuth';

const CambiarPassword = () => {

    const { guardarPassword } = UseAuth();

    const [ alerta, setAlerta ] = useState({});
    const [password, setPassword] = useState({});

    const handleSubmit = async ( e ) => {
        e.preventDefault();


        if( Object.values( password ).some( campo => campo ==='' ) ) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });

            return;
        }

        if( password.pwd_nuevo.length < 6 ) {
            setAlerta({
                msg: 'El Password debe tener minimo 6 caracteres',
                error: true
            });

            return;
        }

        const respuesta = await guardarPassword( password );

        setAlerta( respuesta );
    }

    const { msg } = alerta;
    return (
        <>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} 
            <span className="text-indigo-600 font-bold">Password aquí</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w1/2 bg-white shadow rounded-lg p-5">
                    { msg && <Alerta alerta={alerta}/> }
                    <form action=""
                    onSubmit={handleSubmit}
                    >
                        <div className="my-3">
                            <label htmlFor="pwd_actual" className="uppercase font-bold text-gray-600">Password Actual</label>
                            <input
                            id="pwd_actual" 
                            type="password"
                            placeholder='Escribe tu password actual'
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="pwd_actual"
                            onChange={ e => setPassword({
                                ...password,
                                [e.target.name]: e.target.value
                            }) }
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="pwd_nuevo" className="uppercase font-bold text-gray-600">Nuevo Password</label>
                            <input
                            id="pwd_nuevo" 
                            type="password"
                            placeholder='Escribe tu nuevo password'
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="pwd_nuevo"
                            onChange={ e => setPassword({
                                ...password,
                                [e.target.name]: e.target.value
                            }) }
                            
                            />
                        </div>

                        


                        <input 
                        type="submit" 
                        value="Actualizar Password"
                        className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:cursor-pointer hover:bg-indigo-800" 
                        />
                    </form>

                </div>
            </div>
        </>
    )
}

export default CambiarPassword