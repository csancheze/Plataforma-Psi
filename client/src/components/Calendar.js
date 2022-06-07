import React, { useEffect, useState } from "react";
import "../styles/calendar.css"
import { Container } from "react-bootstrap"
import { useMutation, useQuery} from "@apollo/client";
import { UPDATE_DIA, UPDATE_HORA } from "../utils/mutations";
import { QUERY_ME_HORARIOS } from "../utils/queries";

const CalendarWidget= ({show}) => {

    
    const {loading: loadingTerapeuta,  data: dataTerapeuta, refetch: refetchTerapeuta} = useQuery(QUERY_ME_HORARIOS)
    let semana =dataTerapeuta?.terapeutaHorarios.terapeuta.dias || []

    const [updateDia] = useMutation(UPDATE_DIA);
    const [updateHora] = useMutation(UPDATE_HORA)


    const buttonActive = (status) => {
        if (status === true) {
            return "btn-primary"
        } else {
            return "btn-light"
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

    if (loadingTerapeuta) {
        return <div>Loading...</div>
    }
    return (
        <div className={`d-flex flex-row calendar ${show}`} >
            {semana.map((dia) => {
              return <ul key={dia.name}><li><button className = {`btn ${buttonActive(dia.active)} calendar-button`} onClick={(event)=> activateDia(event, dia._id, dia.active)}>{dia.name}</button></li>
              {dia.horas.map((hora) => {
                  return <li key={dia.name +" "+ hora._id}><button onClick={(event)=> activateHora(event, hora._id, hora.active)} type="button" className = {`btn ${buttonActive(hora.active)} calendar-button`}>{hora.tiempo}</button></li>})}
              </ul>})
            }
            
        </div>
    )
}

export default CalendarWidget;



