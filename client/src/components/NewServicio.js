import { Modal } from "react-bootstrap"
import { useMutation } from "@apollo/client";
import { ADD_SERVICIO} from "../utils/mutations";
import React, { useEffect, useState } from "react";

const NewServicio = ({show, onHide}) => {
    const [formState, setFormState] = useState({ name: ''});
    const  [AddServicio, {error}] = useMutation(ADD_SERVICIO)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
      };
    

    const newServicio = async (event) => {
        event.preventDefault()
        try {
            const addSERVICIO = await AddServicio ({
                variables: {
                    name: formState.name
                }
            });
            if (addSERVICIO) {
                alert("Servicio añadido")
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
                        <label htmlFor="exampleFormControlInput1">Nombre del Servicio</label>
                        <input 
                        type="name" 
                        name='name' 
                        required 
                        className="form-control" 
                        id="exampleFormControlInput1" 
                        placeholder="Terapia Individual En Linea"
                        onChange={handleChange} />
                </div>
                <button onClick={newServicio} className="btn btn-secondary mt-2">Añadir</button>
                <button id="close" onClick={onHide} className="btn btn-danger mt-2">Cerrar</button>
            </form>
        </Modal>
    )
    
}

export default NewServicio;
