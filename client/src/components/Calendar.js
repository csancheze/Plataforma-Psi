import React, { useEffect, useState } from "react";
import "../styles/calendar.css"
import { useMutation, useQuery} from "@apollo/client";
import { UPDATE_DIA, UPDATE_HORA } from "../utils/mutations";
import { QUERY_ME_HORARIOS } from "../utils/queries";
import ModalPaciente from "./ModalPaciente";

const CalendarWidget= ({show}) => {

    const [horaId, setHora] = useState({})
    const [showPx, setShowPx] = useState(false)
    const [nombrePaciente, setNombrePaciente] = useState({})
    
    const {loading: loadingTerapeuta,  data: dataTerapeuta, refetch: refetchTerapeuta} = useQuery(QUERY_ME_HORARIOS)
    let semana =dataTerapeuta?.terapeutaHorarios.terapeuta.dias || []

    const [updateDia] = useMutation(UPDATE_DIA);
    const [updateHora] = useMutation(UPDATE_HORA)

    const [showInstructions, setShowInstructions] = useState("visually-hidden")

    const closeInstructions = (event) => {
        event.preventDefault()
        if (showInstructions == "visually-hidden") {
            setShowInstructions("")  
        } else {
        setShowInstructions("visually-hidden")
        }
    }

    const handleClose = (event) => { 
        event.preventDefault()
        setShowPx(false);
    }


    const buttonActive = (status) => {
        if (status === true) {
            return "is-active"
        } else {
            return "not-active"
        }
    }

    const activateDia = async(event, id, status) => {
        event.preventDefault();
        try {
            const mutationResponse = await updateDia({
                variables: {
                    diaId: id,
                    active: status
                }
            });
            console.log(mutationResponse)
            refetchTerapeuta()
            }catch (e){
            console.error(e)
        }
    }

    const activateHora = async(event, id, status) => {
        event.preventDefault();
        try {
            const mutationResponse = await updateHora({
                variables: {
                    horaId: id,
                    active: status
                }
            });
            console.log(mutationResponse)
            refetchTerapeuta()
        }catch (e){
            console.error(e)
        }
    }

    const updatePaciente = async(event, id, paciente) => {
        event.preventDefault();
        setHora(id)
        if (paciente) {
            setNombrePaciente(paciente)
        } else {
            setNombrePaciente("Nombre del paciente")
        }
        setShowPx(true)
    }

    if (loadingTerapeuta) {
        return <div>Loading...</div>
    }
    return (
        <div className={`w-100 d-flex ${show}  flex-column mt-2`}>
              <button className="button-instructions text-center border rounded p-2" onClick={closeInstructions}>Instrucciones</button>
        
        <div className={`instructions ${showInstructions}`}>      
          
          <h2 className="titulo text-center">Cómo usar el horario</h2>
          <ol>
              <li>Haz click sobre el dia para activar o desactivar.</li>
              <li>El día está activado cuando el fondo aparecer de <span className="dia is-active rounded p-1">color</span>. Si el día está desactivado, así aparecerá en tu página.</li>
              <li>Haz click sobre la hora para activar o desactivar.</li>
              <li>La hora está activada cuando el fondo aparecer de <span className="hora is-active rounded p-1">color</span>. Si la hora está desactivada, así aparecerá en tu página.</li>
              <li>Haz clic sobre el ✐ para actualizar o borrar paciente en este horario.</li>
              <li>Los horarios con <strong>*</strong> indican que hay un paciente asignado.</li>
          </ol>
          </div>

     
            <div className={`d-flex calendar justify-content-between rounded border p-2`} >
          

                {semana.map((dia) => {
                return <ul className= "d-flex flex-column p-1 calendar-column" key={dia.name}><li className="calendar-li mb-2"><button className = {`dia ${buttonActive(dia.active)} rounded calendar-button`} onClick={(event)=> activateDia(event, dia._id, dia.active)}>{dia.name}</button></li>
                {dia.horas.map((hora) => {
                    return <li className={`row w-100 mb-1 mx-auto calendar-li ${buttonActive(hora.active)} rounded border`}  key={dia.name +" "+ hora._id}>
                        <button  onClick={(event)=> activateHora(event, hora._id, hora.active)} type="button" className = {`col-7 col-lg-8 hora ${hora.paciente ? ("tooltip4") : ("")} button-${buttonActive(hora.active)}`}>
                                {hora.tiempo} 
                                {hora.paciente ? (<strong>*<span className="tooltiptext">Px: {hora.paciente}</span></strong>) : ("")}
                        </button>
                        <button  className= "calendar-name col-5 col-lg-4" onClick={(event)=> updatePaciente(event, hora._id, hora.paciente)}>
                                <span> ✐</span>
                        </button>
                            </li>})}
                </ul>})
                }
                
            </div>
            <ModalPaciente
                show={showPx}
                onHide={handleClose}
                hora ={horaId}
                nombre = {nombrePaciente}
            ></ModalPaciente>
        </div>
    )
}

export default CalendarWidget;



