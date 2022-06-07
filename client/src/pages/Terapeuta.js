import React from 'react';
import { useParams } from 'react-router-dom';
import { TERAPEUTA } from '../utils/queries';
import { useQuery } from '@apollo/client';
import CalendarPerfil from "../components/CalendarPerfil"


const Terapeuta = () => {
    const {terapeutaId} = useParams()
    const {loading, data} = useQuery(TERAPEUTA, {
            variables: {id: terapeutaId}
        }
    );
    const terapeuta = data?.terapeuta || {}
    const imagelink = terapeuta?.foto || ""
    const imageId = imagelink.split("/")[5]

    const styles = {
        imgbox: {
            width: "200px",
            height: "200px"
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <main>
            <h1 className='visually-hidden'>Psicólogo Psicóloga Psicoterapeuta Terapia Psicológica</h1>
            <div className='container d-flex'>
                <div style={styles.imgbox}> 
                <img className ="img-thumbnail img-fluid" src={`https://drive.google.com/uc?export=view&id=${imageId}`} alt="Foto de perfil"></img>
                </div>
                <div>
                    <h2>{terapeuta.titulo}</h2>
                    <h4>Cédula Profesional: {terapeuta.cedula}</h4>
                    <h3>Modelo Terapeutico: {terapeuta.modelos.map((modelo)=>{
                        return <span key={modelo._id}> {modelo.name} </span>
                    })}</h3>
                    
                    <p>{terapeuta.bio}</p>

                </div>
            </div>
            <div className='container d-flex'>
                    <div><h3>Servicios</h3>
                    <ul>
                        {terapeuta.servicios.map ((servicio) =>{
                            return <li key={servicio._id}>{servicio.name}</li>
                        })}
                    </ul>
                    </div>
                    <div><h3>Áreas de atención:</h3>
                        <ul>
                            {terapeuta.areas.map((area)=>{
                                return <li key={area._id}>{area.name}</li>
                            })}
                        </ul>
                    </div>
            </div>
            <CalendarPerfil 
                id={terapeuta._id} 
                ></CalendarPerfil>
        </main>
    )
}

export default Terapeuta;
