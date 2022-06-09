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
            <form className="border rounded-3 p-3 w-100">
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
                <div className="d-flex">
                <button onClick={newServicio} className="show-calendar-button border rounded m-2">Añadir</button>
                <button id="close" onClick={onHide} className="show-calendar-button-close border rounded m-2">Cerrar</button>
                </div>
            </form>
        </Modal>
    )
    
}

export default NewServicio;
