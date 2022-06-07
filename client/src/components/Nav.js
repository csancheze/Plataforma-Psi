import { useQuery } from "@apollo/client";
import React, {useState} from "react";
import {NavLink } from "react-router-dom";
import { QUERY_ME_TERAPEUTA, TERAPEUTA } from "../utils/queries";
import Auth from ".//../utils/auth";


const Nav = () => {
    const [currentPage, setCurrentPage] = useState('Home');
    const handlePageChange = (page) => setCurrentPage(page);
    const url = window.location.href.split("/")
    const terapeutaId = url.pop()
    let check = false
    if (terapeutaId.length === 24) {
        check = true
    }
    

    const { loading, data} = useQuery(
        check ? TERAPEUTA : QUERY_ME_TERAPEUTA, {
            variables: {id: terapeutaId},
        }
    );

    const terapeuta = data?.terapeuta || data?.me.terapeuta || {}


    if (loading) {
        return <div>Loading...</div>
    }
    
    return (
        <header className="w-100 d-flex justify-content-between">
            {!terapeuta.nombre ? (<h1>Plataforma Psi</h1>) : ( <h1>{terapeuta.nombre}</h1>) }
           

            <nav>
            <ul className="nav justify-content-end">
                {/* <li className="nav-item">
                    <NavLink to="/" className={currentPage === 'Home' ? 'nav-link active' : 'nav-link'} onClick={() => { handlePageChange('Home'); }}>Home</NavLink>
                </li> */}
                { !Auth.loggedIn() ? ("") : ( 
                <li className="nav-item">
                    <NavLink to={`/terapeuta/${terapeuta._id}`}className={currentPage === 'MiPagina' ? 'nav-link active' : 'nav-link'}
                    onClick={() => { handlePageChange('MiPagina'); }}>Mi Pagina</NavLink>
                </li>)}
                { Auth.loggedIn() ? (  
                <li className="nav-item">
                    <NavLink to={`/perfil`} className={currentPage === 'Perfil' ? 'nav-link active' : 'nav-link'}
                    onClick={() => { handlePageChange('Perfil');  }}>Perfil</NavLink>
                </li>) : ("")}
                { Auth.loggedIn() ? (
                <li className="nav-item">
                    <NavLink to="/" className="nav-link active" onClick={() => Auth.logout()}>Salir</NavLink>
                </li>):(
                <li className="nav-item">
                    <NavLink to="/" className="nav-link active">Entra</NavLink>
                </li>
                )}
                
                </ul>
            </nav>
        </header>
    )
}

export default Nav;
