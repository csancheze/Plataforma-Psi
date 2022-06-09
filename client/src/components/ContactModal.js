import React, { useRef, useState } from 'react';
import {Modal } from "react-bootstrap";
import emailjs from '@emailjs/browser';



const ContactModal= ({show, onHide, correo, nombre}) => {
    const [btnText, setBtnText] = useState('Enviar');
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_8vnmm7t', 'template_0tr1mwu', form.current, '_fyhTOODMjUPojOZC')
        .then((result) => {
            setBtnText('Mensaje Enviado')
            setTimeout(() => {
                setBtnText('Enviar')
            }, 5000);
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        form.current.reset();
    };

    return (
        <Modal show= {show} onHide={onHide}>
        <form onSubmit={sendEmail} ref={form} className="border rounded-3 p-3 w-100">
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
        <div className="form-group mt-2">
            <label htmlFor="exampleFormControlTextarea1">Mensaje</label>
            <textarea className="form-control" required name="message" id="exampleFormControlTextarea1" rows="5" placeholder='ej. Me gustaria que me dieras más información sobre tus servicios.'></textarea>
        </div>
        <div className="d-flex">
        <button type="submit" className="show-calendar-button border rounded m-2" id='submit-button'>{btnText}</button> <button className="show-calendar-button-close border rounded m-2" onClick={onHide}>Cerrar</button>
        </div>
        </form>

        </Modal>
    )
}

export default ContactModal;
