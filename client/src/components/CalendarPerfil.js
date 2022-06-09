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
        setShow(false);
    }

    const buttonActive = (status) => {
        if (status === true) {
            return "is-active"
        } else {
            return "not-active"
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
        <div className={`w-100 d-flex flex-column mt-2`}>
            <button className="button-instructions text-center border rounded p-2" onClick={closeInstructions}>Instrucciones</button>
                <div className={`mt-2 instructions ${showInstructions}`}>      
                    
                    <h2 className="titulo text-center">Cómo agendar una cita</h2>
                    <ol>
                        <li className='instruccions-li'>Los dias y las horas disponibles se indican de este <span className="hora is-active rounded p-1">color</span>.</li>
                        <li className='instruccions-li'>Haz click sobre la hora. Se abrirá una ventana donde podrás poner tu nombre, correo de contacto y motivo de consulta.</li>
                        <li className='instruccions-li'>Haz click en <span className='show-calendar-button border rounded p-1'>Solicitar</span> para enviar tu solicitud, el terapeuta se pondrá en contacto contigo en la brevedad.</li>
                        <li className='instruccions-li'>Si no encuentras un horario disponible que te acomode, enviale al terapeuta una solicitud haciendo click en la <span className=' rounded border p-1'>Hora</span> que mejor te acomode. El terapeuta se pondrá en contacto contigo si le es posible abrir el horario.</li>
                    </ol>
                </div>
            

            <div className={`d-flex calendar justify-content-between rounded border p-2`} >
                {semana.map((dia) => {
                return <ul className= "d-flex flex-column p-0 calendar-column" key={dia.name}><li className='p-1'><button className = {`dia ${buttonActive(dia.active)} rounded calendar-button`}>{dia.name}</button></li>
                {dia.horas.map((hora) => {
                    return <li className="calendar-li p-1"s key={dia.name +" "+ hora._id}><button onClick={(event)=> sendMailHora(event, dia.name, hora.tiempo)} type="button"  className = {` ${buttonActive(hora.active)} rounded border hora calendar-button`}>{hora.tiempo}</button></li>})}
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



