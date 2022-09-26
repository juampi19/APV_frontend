import { Outlet, useNavigate} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UseAuth from "../hooks/UseAuth";


const RutaProtegida = () => {

  const navigate = useNavigate();

    const { auth, cargando } = UseAuth();
    if( cargando ) return 'Cargando...';

  return (

    <>
        <Header />
        { auth._id ? (
          <main className="container mx-auto mt-10">
            <Outlet />
          </main>
        ) : navigate('/') }
        <Footer />
    </>

    
  )
}

export default RutaProtegida