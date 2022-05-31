
import { Modal } from "react-bootstrap"
import { useMutation } from "@apollo/client";
import { ADD_MODELO } from "../utils/mutations";
import React, { useEffect, useState } from "react";



const NewModelo= ({show, onHide}) => {
    const [formState, setFormState] = useState({ name: '', description: ''});
    const  [AddModelo, {error}] = useMutation(ADD_MODELO)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
      };
    

    const newModelo = async (event) => {
        event.preventDefault()
        try {
            const addModelo = await AddModelo ({
                variables: {
                    name: formState.name,
                    description: formState.description
                }
            });
            if (addModelo) {
                alert("Modelo añadido")
            }
        } catch (e) {
            alert("Algo no funcionó")
            console.error(e, error)
        }
    }

    return (
        <Modal show= {show} onHide={onHide}>
            <form className="border rounded-3 p-3">
                <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Nombre del modelo</label>
                        <input 
                        type="name" 
                        name='name' 
                        required 
                        className="form-control" 
                        id="exampleFormControlInput1" 
                        placeholder="Terapia Racional Emotiva"
                        onChange={handleChange} />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="exampleFormControlInput2">Descripción del modelo</label>
                    <textarea
                    type="text" 
                    name="description" 
                    required 
                    className="form-control" 
                    id="exampleFormControlInput2" 
                    placeholder="Describe de manera general el modelo y la forma de trabajo."
                    onChange={handleChange} />
                </div>
                <button onClick={newModelo} className="btn btn-secondary mt-2">Añadir</button>
                <button id="close" onClick={onHide} className="btn btn-danger mt-2">Cerrar</button>
            </form>
        </Modal>
    )
}

export default NewModelo;
