import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { LOGIN_TERAPEUTA } from "../utils/mutations";
import { useMutation } from '@apollo/client';


const Home = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_TERAPEUTA)

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
          const { data } = await login({
            variables: { ...formState },
          });
    
          Auth.login(data.login.token);
        } catch (e) {
          console.error(e);
        }
        setFormState({
          email: '',
          password: '',
        });
      };

    return(
        <main className="container">
            <h2 className ="display-2"> Entra</h2>
                <form onSubmit={handleFormSubmit}>
                    <input
                    className="form-input"
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    />
                    <input
                    className="form-input"
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                    />
                    <button
                    className="btn btn-block btn-primary"
                    style={{ cursor: 'pointer' }}
                    type="submit"
                    >
                    Submit
                    </button>
                </form>
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