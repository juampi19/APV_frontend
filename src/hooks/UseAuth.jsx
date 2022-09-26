import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

//Context para poder extraer los datos
const UseAuth = () => {

    return useContext( AuthContext );
}

export default UseAuth;