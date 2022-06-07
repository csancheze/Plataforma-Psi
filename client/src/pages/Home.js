import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { LOGIN_TERAPEUTA } from "../utils/mutations";
import { useMutation } from '@apollo/client';
import "../styles/home.css"

const Home = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login] = useMutation(LOGIN_TERAPEUTA)

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
          const { data } = await login({
            variables: { ...formState },
          });
    
          Auth.login(data.login.token);
        } catch (e) {
          console.error(e);
          alert("Credenciales equivocadas. Intentalo de nuevo.")
        }
        setFormState({
          email: '',
          password: '',
        });
      };

    return(
        <main >
          <div className="container pt-5">
            <h2 className="display-5 text-center titulo"> Entra a tu perfil </h2>
                <form className="border rounded-3 p-3" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label>Correo: </label>
                    <input
                    className="form-control"
                    placeholder="nombre@correo.com"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Contraseña: </label>
                    <input
                    className="form-control"
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                    />
                  </div>
                <div className="form-group">
                    <button
                    className="btn-text btn-submit border rounded w-100 "
                    style={{ cursor: 'pointer' }}
                    type="submit"
                    >
                    Ingresar
                    </button>
                </div>
                </form>
            <h2 className = "text-center m-auto crea my-4"> ó </h2>
            <Link className="crea"
            to= "/signup"
            >
            <h3 className="crea text-center border rounded "> Crea tu pagina de Terapeuta </h3>
            </Link>
            </div>
        </main>
    )
};

export default Home