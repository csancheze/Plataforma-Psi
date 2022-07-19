import React, { useState } from 'react';
import {Modal } from "react-bootstrap";
import { UPDATE_PX_HORA } from '../utils/mutations';
import { useMutation } from "@apollo/client";





const ModalPaciente= ({show, onHide, hora, nombre}) => {
    const [formState, setFormState] = useState({ paciente: ''});
    const  [UpdatePxHora, {error}] = useMutation(UPDATE_PX_HORA)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
      };
    

    const  updatePx = async (event) => {
        event.preventDefault()
        try {
            const paciente = await UpdatePxHora ({
                variables: {
                    horaId: hora,
                    paciente: formState.paciente
                }
            });
            if (paciente) {
                alert("Paciente actualizado")
                window.location.reload()
            }
        } catch (e) {
            alert("Algo no funcionó")
            console.error(e, error)
        }
    }

    const  borrarPx = async (event) => {
        event.preventDefault()
        try {
            const paciente = await UpdatePxHora ({
                variables: {
                    horaId: hora,
                    paciente: ""
                }
            });
            if (paciente) {
                alert("Paciente actualizado")
                window.location.reload()
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
            <label htmlFor="exampleFormControlInput1">Paciente</label>
            <input 
            type="text"
            onChange={handleChange} 
            name='paciente' 
            required 
            className="form-control"
            id="exampleFormControlInput1" 
            defaultValue={nombre} />
        </div>    
        <button onClick={updatePx} className="show-calendar-button w-50 m-0 border rounded mt-2">Actualizar</button>
        <button onClick={borrarPx} className="show-calendar-button-close w-50 m-0 border rounded mt-2">Borrar</button>
        <button id="close" onClick={onHide} className="show-calendar-button-close border rounded mt-2">Cerrar</button>
        </form>

        </Modal>
    )
}

export default ModalPaciente;
