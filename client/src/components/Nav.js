import { useQuery } from "@apollo/client";
import React, {useState} from "react";
import {NavLink } from "react-router-dom";
import { QUERY_ME_TERAPEUTA, TERAPEUTA } from "../utils/queries";
import Auth from ".//../utils/auth";
import "../styles/navbar.css"


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
        <header className="header w-100 d-flex flex-column flex-sm-row justify-content-start justify-content-sm-between">
            <h1 className="header-title pt-2">{!terapeuta.nombre ? ("Plataforma Psi") : (`${terapeuta.nombre}`)}</h1>
           

            <nav>
            <ul className="nav d-flex flex-column flex-md-row justify-content-around">
                {/* <li className="nav-item">
                    <NavLink to="/" className={currentPage === 'Home' ? 'nav-link active' : 'nav-link'} onClick={() => { handlePageChange('Home'); }}>Home</NavLink>
                </li> */}
                { !Auth.loggedIn() ? ("") : ( 
                <li className="nav-item">
                    <NavLink to={`/terapeuta/${terapeuta._id}`}className={currentPage === 'MiPagina' ? 'nav-link active' : 'nav-link'}
                    onClick={() => { handlePageChange('MiPagina'); }}><span className="color-text">Mi Pagina</span></NavLink>
                </li>)}
                { Auth.loggedIn() ? (  
                <li className="nav-item">
                    <NavLink to={`/perfil`} className={currentPage === 'Perfil' ? 'nav-link active' : 'nav-link'}
                    onClick={() => { handlePageChange('Perfil');  }}><span className="color-text">Perfil</span></NavLink>
                </li>) : ("")}
                { Auth.loggedIn() ? (
                <li className="nav-item">
                    <NavLink to="/" className="nav-link active" onClick={() => Auth.logout()}><span className="color-text">Salir</span></NavLink>
                </li>):(
                <li className="nav-item">
                    <NavLink to="/" className="nav-link active"><span className="color-text">Entrar</span></NavLink>
                </li>
                )}
                
                </ul>
            </nav>
        </header>
    )
}

export default Nav;
