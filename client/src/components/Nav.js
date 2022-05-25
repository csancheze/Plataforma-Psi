import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { QUERY_ME_TERAPEUTA, TERAPEUTA } from "../utils/queries";

const Nav = () => {
    const { terapeutaId } = useParams();

    const {loading, data} = useQuery(
        terapeutaId ? TERAPEUTA : QUERY_ME_TERAPEUTA, {
            variables: {_id: terapeutaId}
        }
    );

    const nombre = data?.me || data?.terapeuta || {};

    if (loading) {
        return <div>Loading...</div>
    }


    return (
        <header className="w-100 d-flex justify-content-between">
            {( nombre.nombre? (
                <h1>Psic. {nombre.nombre} </h1>
            ) : (
                <h1>Plataforma-Psi</h1>
            ) )}
            <nav>
                Holi
            </nav>
        </header>
    )
}

export default Nav;
