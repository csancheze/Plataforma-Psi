import { Modal } from "react-bootstrap"
import { useMutation } from "@apollo/client";
import { ADD_AREA} from "../utils/mutations";
import React, { useEffect, useState } from "react";

const NewArea = ({show, onHide}) => {
    const [formState, setFormState] = useState({ name: ''});
    const  [AddArea, {error}] = useMutation(ADD_AREA)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
      };
    

    const newArea = async (event) => {
        event.preventDefault()
        try {
            const addAREA = await AddArea ({
                variables: {
                    name: formState.name
                }
            });
            if (addAREA) {
                alert("Area añadida")
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
                        <label htmlFor="exampleFormControlInput1">Nombre del Área</label>
                        <input 
                        type="name" 
                        name='name' 
                        required 
                        className="form-control" 
                        id="exampleFormControlInput1" 
                        placeholder="Violencia de Pareja"
                        onChange={handleChange} />
                </div>
                <div className="d-flex">
                <button onClick={newArea} className="show-calendar-button border rounded m-2">Añadir</button>
                <button id="close" onClick={onHide} className="show-calendar-button-close border rounded m-2">Cerrar</button>
                </div>
            </form>
        </Modal>
    )
    
}

export default NewArea;
