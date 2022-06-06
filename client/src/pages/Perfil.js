import React, {useEffect, useState } from "react";
import { ADD_AREA_TERAPEUTA, ADD_MODELO_TERAPEUTA, ADD_SERVICIO_TERAPEUTA, DELETE_AREA, DELETE_MODELO, DELETE_SERVICIO, UPDATE_TERAPEUTA } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import Auth from "../utils/auth";
import { AREAS, MODELOS, SERVICIOS } from "../utils/queries";
import NewModelo from "../components/NewModelo";
import NewServicio from "../components/NewServicio";
import NewArea from "../components/NewArea";
import { QUERY_ME_TERAPEUTA } from "../utils/queries";

const Perfil = () => {
        const [formState, setFormState] = useState({});

        const [UpdateTerapeuta] = useMutation(UPDATE_TERAPEUTA);
        const [addAreaTerapeuta] = useMutation(ADD_AREA_TERAPEUTA);
        const [addModeloTerapeuta] = useMutation(ADD_MODELO_TERAPEUTA);
        const [addServicioTerapeuta] = useMutation(ADD_SERVICIO_TERAPEUTA);
        const [deleteModelo] = useMutation(DELETE_MODELO);
        const [deleteServicio] = useMutation(DELETE_SERVICIO);
        const [deleteArea] = useMutation(DELETE_AREA)

        const {loading: loadingTerapeuta,  data: dataTerapeuta, refetch: refetchTerapeuta} = useQuery(QUERY_ME_TERAPEUTA)
           let terapeuta =dataTerapeuta?.me.terapeuta || []

        let { data: dataModelos, refetch: refetchModelos } = useQuery(MODELOS);
        let { data: dataServicios , refetch: refetchServicios} = useQuery(SERVICIOS);
        let { data: dataAreas, refetch: refetchAreas} = useQuery(AREAS);

        let [modelos, setModelos] = useState(dataModelos?.modelos || [])
        let [servicios, setServicios ]= useState(dataServicios?.servicios || [])
        let [areas, setAreas] = useState(dataAreas?.areas || [])
            
        const [showNewModelo, setShowNewModelo] = useState(false)
        const [showNewServicio, setShowNewServicio] = useState(false)
        const [showNewArea, setShowNewArea] = useState(false)
    
        useEffect(()=>{
          setModelos(dataModelos?.modelos || [])
          setServicios(dataServicios?.servicios || [])
          setAreas(dataAreas?.areas || [])
        }, [dataModelos, dataServicios, dataAreas])
    
        const addModelo = async (event, id) => {
          event.preventDefault()
          if (terapeuta.modelos.some(e => e._id === id)) {
            return console.log("Modelo already in array")
          }
          try {
            const mutationResponse = await addModeloTerapeuta({
              variables: {
                modeloId: id
              }
            })
            console.log(mutationResponse)
            refetchTerapeuta()
          } catch (e) {
            alert("No se pudo añadir el modelo")
            console.error(e)
          }
        }
    
        const addServicio = async(event, id) => {
          event.preventDefault()
          if (terapeuta.servicios.some(e => e._id === id)) {
            return console.log("Servicio already in array")
          }
          try {
            const mutationResponse = await addServicioTerapeuta({
              variables: {
                servicioId: id
              }
            })
            console.log(mutationResponse)
            alert("Servicio añadido")
            refetchTerapeuta()
          } catch (e) {
            alert("No se pudo añadir el servicio")
            console.error(e)
          }
        }
      
        const addArea = async (event, id) => {
          event.preventDefault()
          if (terapeuta.areas.some(e => e._id === id)) {
            return console.log("Area already in array")
          }        try {
            const mutationResponse = await addAreaTerapeuta({
              variables: {
                areaId: id
              }
            })
            console.log(mutationResponse)
            alert("Area añadida")
            refetchTerapeuta()
          } catch (e) {
            alert("No se pudo añadir el area")
            console.error(e)
          }
        }
      
        const quitarModelo = async (event, id) => {
          event.preventDefault()
          try{
            const mutationResponse = await deleteModelo({
              variables: {
                modeloId: id
              }
            })
            console.log(mutationResponse)
            refetchTerapeuta()
          } catch (e) {
            alert("No se pudo borrar el modelo")
            console.error(e)
          }
        }

        const quitarServicio = async (event, id) => {
          event.preventDefault()
          try{
            const mutationResponse = await deleteServicio({
              variables: {
                servicioId: id
              }
            })
            console.log(mutationResponse)
            alert("Servicio borrado")
            refetchTerapeuta()
          } catch (e) {
            alert("No se pudo borrar el servicio")
            console.error(e)
          }
        }
    

    
        const quitarArea = async (event, id) => {
          event.preventDefault()
          try{
            const mutationResponse = await deleteArea({
              variables: {
                areaId: id
              }
            })
            console.log(mutationResponse)
            alert("Área borrada")
            refetchTerapeuta()
          } catch (e) {
            alert("No se pudo borrar el área")
            console.error(e)
          }
        }
    
        const añadirModelo = (event) => {
          event.preventDefault()
          setShowNewModelo(true)
        }
        const handleCloseModelo = (event) => {
          event.preventDefault()
          refetchModelos()
          setShowNewModelo(false);
        }
    
        const añadirServicio = (event) => {
          event.preventDefault()
          setShowNewServicio(true)
        }
        const handleCloseservicio = (event) => {
          event.preventDefault()
          refetchServicios()
          setShowNewServicio(false);
        }
    
        const añadirArea = (event) => {
          event.preventDefault()
          setShowNewArea(true)
        }
        const handleCloseArea = (event) => {
          event.preventDefault()
          refetchAreas()
          setShowNewArea(false);
        }
    
      
        const handleFormSubmit = async (event) => {
          event.preventDefault();
            try {
            const mutationResponse = await UpdateTerapeuta({
              variables: {
                nombre: formState.nombre,
                correo: formState.correo,
                cedula: formState.cedula,
                bio: formState.bio,
              },
            });
            console.log(mutationResponse)
            alert("Información actualizada")
            window.location.reload()
          } catch (e) {
            alert('Failed to sign up!')
            console.error(e);
          };
        }
    
        const handleChange = (event) => {
          const { name, value } = event.target;
          setFormState({
            ...formState,
            [name]: value,
          });
        };

        if (Auth.loggedIn() == false) {
          window.location.replace("/")
        }
        
        if (loadingTerapeuta) {
            return (<p>Loading...</p>)
        }
        
    
        return (
            <main>
                  <form  onSubmit={handleFormSubmit} className="border rounded-3 p-3">
                    <div className="form-group mt-2">
                        <label htmlFor="exampleFormControlInput4">Nombre para mostrar</label>
                        <input 
                        type="text" 
                        name="nombre" 
                        required 
                        className="form-control" 
                        id="exampleFormControlInput4" 
                        defaultValue={terapeuta.nombre}
                        onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput5">Correo electrónico de contacto</label>
                        <input 
                        type="email" 
                        name='correo' 
                        required 
                        className="form-control" 
                        id="exampleFormControlInput5" 
                        defaultValue = {terapeuta.correo}
                        onChange={handleChange} />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="exampleFormControlInput6">Sobre ti</label>
                        <textarea
                        type="text" 
                        name="bio" 
                        required 
                        className="form-control" 
                        id="exampleFormControlInput6" 
                        defaultValue={terapeuta.bio}
                        onChange={handleChange} />
                    </div> 
                    <button id='submit-button' type="submit" className="btn btn-secondary mt-2">Actualizar</button>
                    <div>
                      <h4>Modelos Terapéuticos: Haz click en el modelo para añadirlo a tu perfil.</h4>

                    
                      {terapeuta.modelos.map((modelo) =>{
                      return <div>
                        <span key = {modelo._id}>{modelo.name} </span>
                        <button onClick={(event) => quitarModelo(event, modelo._id)}>x</button>
                        </div>})}
                    
                    
                      <div> {modelos.map((modelo) => {
                        return <button onClick={(event)=> addModelo(event, modelo._id)} key={modelo._id}>{modelo.name}</button>})}
                        <button onClick={añadirModelo}>Añadir</button>
                      </div>
                    </div>
                    <NewModelo show={showNewModelo} onHide={handleCloseModelo} ></NewModelo>
                    <div>
                      <h4>Servicios: Haz click en el servicio para añadirlo a tu perfil.</h4>
         
                  
                      {terapeuta.servicios.map((servicio) =>{
                      return <div> 
                        <span key = {servicio._id}>{servicio.name}</span>
                        <button onClick={(event) => quitarServicio(event, servicio._id)}>x</button></div>})}
                      
                      <div> {servicios.map((servicio) => {
                        return <button onClick={(event)=> addServicio(event, servicio._id)} key={servicio._id}>{servicio.name}</button>})}
                        <button onClick={añadirServicio}>Añadir</button>
                      </div>
                    <NewServicio show={showNewServicio} onHide={handleCloseservicio} ></NewServicio>
                    </div>
                    <div>
                    <h4>Áreas de atención: Haz click en el área para añadirla a tu perfil.</h4>
                    
                    
                      {terapeuta.areas.map((area) =>{
                      return <div>
                        <span key = {area._id}>{area.name} </span>
                        <button onClick={(event) => quitarArea(event, area._id)}>x</button></div>})}

                      <div> {areas.map((area) => {
                        return <button onClick={(event)=> addArea(event, area._id)} key={area._id}>{area.name}</button>})}
                        <button onClick={añadirArea}>Añadir</button>
                      </div>
                    <NewArea show={showNewArea} onHide={handleCloseArea} ></NewArea>
                    </div>
                   
                   
                </form>
            </main>
    )
};

export default Perfil