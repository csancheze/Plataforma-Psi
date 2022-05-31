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
            <form className="border rounded-3 p-3">
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
                <button onClick={newArea} className="btn btn-secondary mt-2">Añadir</button>
                <button id="close" onClick={onHide} className="btn btn-danger mt-2">Cerrar</button>
            </form>
        </Modal>
    )
    
}

export default NewArea;
