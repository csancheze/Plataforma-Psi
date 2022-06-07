import React, { useState } from 'react';
import "../styles/calendar.css"
import { useQuery} from "@apollo/client";
import { TERAPEUTA } from "../utils/queries";
import ModalCalendar from './ModalCalendar';


const CalendarPerfil= ({id}) => {
    const [show, setShow] = useState(false);
    const [hora, setHora] = useState({})
    const {loading,  data} = useQuery(TERAPEUTA, {
        variables: {id:id}
    })
    let semana =data?.terapeuta.dias || []
    let terapeuta = data?.terapeuta || []

    const handleClose = (event) => { 
        event.preventDefault()
        setShow(false);
    }
    const buttonActive = (status) => {
        if (status === true) {
            return "btn-primary"
        } else {
            return "btn-light"
        }
    }


    const sendMailHora = async(event, dia, hora) => {
        event.preventDefault();
        setShow(true)
        setHora(`${dia} a las ${hora} hrs`)
    }

    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <div className={`d-flex flex-row calendar`} >
                {semana.map((dia) => {
                return <ul key={dia.name}><li><button className = {`btn ${buttonActive(dia.active)} calendar-button`}>{dia.name}</button></li>
                {dia.horas.map((hora) => {
                    return <li key={dia.name +" "+ hora._id}><button onClick={(event)=> sendMailHora(event, dia.name, hora.tiempo)} type="button" className = {`btn ${buttonActive(hora.active)} calendar-button`}>{hora.tiempo}</button></li>})}
                </ul>})
                }
                
            </div>
            <ModalCalendar
                show={show}
                onHide={handleClose}
                correo ={terapeuta.correo}
                hora ={hora}
                nombre = {terapeuta.nombre}
            ></ModalCalendar>
        </div>
    )
}

export default CalendarPerfil;



