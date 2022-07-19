import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { TERAPEUTA } from '../utils/queries';
import { useQuery } from '@apollo/client';
import CalendarPerfil from "../components/CalendarPerfil"
import "../styles/terapeuta.css"
import ContactModal from '../components/ContactModal';
import ModeloInfo from '../components/ModeloInfo';


const Terapeuta = () => {
    const {terapeutaId} = useParams()
    const [show, setShow] = useState(false);
    const [showInfo, setShowInfo] = useState(false)
    const [description, setDescription] = useState({})
    const {loading, data} = useQuery(TERAPEUTA, {
            variables: {id: terapeutaId}
        }
    );
    
    const terapeuta = data?.terapeuta || {}

    useEffect(() => {
        document.title = terapeuta?.nombre || {};
      }, [data]);


    const getGoogleImg = (url) => {
        let imageId = ""
        if (url.split("/")[5]) {
          imageId = url.split("/")[5]
        } else {
          imageId ="1wlUG_-fKtSmwCW04JAxgsm-LkFqsTZ6j"
        }

        return imageId
      }
  

    const openContactForm = (event) => {
        event.preventDefault()
        setShow(true)
    }

    const handleClose = (event) => { 
        event.preventDefault()
        setShow(false);
    }

    const showModeloInfo = (event, description) => {
        event.preventDefault();
        setDescription(description)
        setShowInfo(true)
    }
    const onHideModeloInfo = (event) => {
        event.preventDefault()
        setShowInfo(false)
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <main className='p-2'>
            <h1 className='visually-hidden'>Psicólogo Psicóloga Psicoterapeuta Terapia Psicológica</h1>
            <div className='perfil-container d-flex flex-column'>
                <div className=' terapeuta-box d-flex flex-column flex-sm-row m-2'>
                    <div> 
                    <img className ="profile-image img-thumbnail img-fluid" src={`https://drive.google.com/uc?export=view&id=${getGoogleImg(terapeuta.foto)}`} alt="Foto de perfil"></img>
                    </div>
                    <div className='m-2'>
                        <h2 className='mb-3'>{terapeuta.titulo}</h2>
                        <h4>Cédula Profesional: <span className='bio-box p-1'>{terapeuta.cedula}</span></h4>
                        <h3>Modelos Terapeuticos: </h3>
                        <ul>
                        {terapeuta.modelos.map((modelo)=>{
                            return <div><li className='w-100' key={modelo._id}> <h4 className='servicios' >{modelo.name}<span className='questionmark' onClick={(e) => showModeloInfo(e, modelo.description)}>*</span></h4></li>
                            <div className='d-flex'>
                            <ModeloInfo show={showInfo} onHide={onHideModeloInfo} description={description}></ModeloInfo>
                            </div>
                            </div>
                        })}
                        </ul>
                       
                    </div>
                </div>
                <div className='bio-box m-2'>
                    <h3 className='titulo text-center'>Sobre el servicio que brindo</h3>
                <p >{terapeuta.bio}</p>
                 </div>
            </div>
            <div className='info-box d-flex flex-column flex-sm-row justify-content-around m-auto'>
                    <div className='terapeuta-box w-100 rounded border'><h3>Servicios</h3>
                    <ul className='d-flex flex-column p-0 m-auto'>
                        {terapeuta.servicios.map ((servicio) =>{
                            return <li className='row mx-0 mb-2 p-0 border rounded w-100 justify-content-between ' key={servicio._id}><h4 className='col-9 py-2 servicio'>☑ {servicio.name}</h4><span className='col-3 text-end py-2'>{servicio.costo}</span></li>
                        })}
                    </ul>
                    </div>
                    <div className='terapeuta-box w-100 rounded border'><h3>Áreas de atención</h3>
                        <ul className='row mx-0 p-0 w-100 justify-content-between'>
                            {terapeuta.areas.map((area)=>{
                                return <li className='col-12 col-sm-6 py-1 servicio' key={area._id}><h4 className='servicios small'>☑ {area.name}</h4></li>
                            })}
                        </ul>
                    </div>
            </div>
            <div className='w-100' id="Calendario">

                </div>
            

            <CalendarPerfil 
                id={terapeuta._id} 
                ></CalendarPerfil>

        <div className=" contact-box fixed-bottom d-flex w-100">
                <a href="#Calendario" className="agendar-cita text-center rounded m-2">Agendar cita</a>
                <button onClick={openContactForm} className="contactar border rounded m-2">Contactar</button>
                </div>

            <ContactModal
                show={show}
                onHide={handleClose}
                correo ={terapeuta.correo}
                nombre = {terapeuta.nombre}
            ></ContactModal>
        </main>
    )
}

export default Terapeuta;
