import React, { useRef, useState } from 'react';
import {Modal } from "react-bootstrap";
import emailjs from '@emailjs/browser';



const ModalCalendar= ({show, onHide, correo, hora, nombre}) => {
    const [btnText, setBtnText] = useState('Solicitar cita.');
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_8vnmm7t', 'template_rrvi7oa', form.current, '_fyhTOODMjUPojOZC')
        .then((result) => {
            setBtnText('Solicitud realizada!')
            setTimeout(() => {
                setBtnText('Solicitar cita')
            }, 5000);
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        form.current.reset();
    };

    return (
        <Modal show= {show} onHide={onHide}>
        <form onSubmit={sendEmail} ref={form} className="border rounded-3 p-3 contact-form">
        <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Terapeuta</label>
            <input type="text" name='to_name' required className="form-control email" id="exampleFormControlInput1" defaultValue={nombre} readOnly />
        </div>    
        <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Correo del terapeuta:</label>
            <input type="email" name='to_email' required className="form-control email" id="exampleFormControlInput1" defaultValue={correo} readOnly/>
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Mi Correo</label>
            <input type="email" name='reply_to' required className="form-control email" id="exampleFormControlInput1" placeholder="ej. nombre@ejemplo.com" />
        </div>
        <div className="form-group mt-2">
            <label htmlFor="exampleFormControlInput1">Mi Nombre</label>
            <input type="name" name="from_name" required className="form-control" id="exampleFormControlInput1" placeholder="ej. John Doe" />
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Dia y hora de la cita:</label>
            <input type="text" name='date' required className="form-control email" id="exampleFormControlInput1" defaultValue={hora} readOnly />
        </div>
        <div className="form-group mt-2">
            <label htmlFor="exampleFormControlTextarea1">Motivo de consulta</label>
            <textarea className="form-control" required name="message" id="exampleFormControlTextarea1" rows="5" placeholder='ej. Tengo problemas de estrés y está afectando mi relación de pareja.'></textarea>
        </div>
        <button type="submit" className="btn btn-secondary" id='submit-button'>{btnText}</button> <button className='btn btn-danger' onClick={onHide}>Cerrar</button>
        </form>

        </Modal>
    )
}

export default ModalCalendar;
