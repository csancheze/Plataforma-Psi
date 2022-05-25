import React from "react";
import { Link } from "react-router-dom";

const Home = () => {

    return(
        <main className="container">
            <h2 className ="display-2"> Accede</h2>

            <h2 className = "text-center m-auto"> o </h2>
            <Link
            to= "/signup"
            >
            <h3> Crea tu pagina de Terapeuta </h3>
            </Link>
        </main>
    )
};

export default Home