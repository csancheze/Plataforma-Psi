import React, {useEffect, useState } from "react";
import { ADD_AREA_TERAPEUTA, ADD_MODELO_TERAPEUTA, ADD_SERVICIO_TERAPEUTA, DELETE_AREA, UPDATE_DESCRIPTION, UPDATE_COST, DELETE_MODELO, DELETE_SERVICIO, UPDATE_TERAPEUTA } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import Auth from "../utils/auth";
import { AREAS, MODELOS, SERVICIOS } from "../utils/queries";
import NewModelo from "../components/NewModelo";
import NewServicio from "../components/NewServicio";
import NewArea from "../components/NewArea";
import { QUERY_ME_TERAPEUTA } from "../utils/queries";
import CalendarWidget from "../components/Calendar";
import "../styles/perfil.css"
import UseGoogleDrive from "../components/UseGoogleDrive"


const Perfil = () => {
        const [formState, setFormState] = useState({});
        const [textArea, setTextArea] = useState({})
        const [inputCost, setInputCost] = useState([])
        const [showGoogle, setShowGoogle] = useState(false)

        const [UpdateTerapeuta] = useMutation(UPDATE_TERAPEUTA);
        const [addAreaTerapeuta] = useMutation(ADD_AREA_TERAPEUTA);
        const [addModeloTerapeuta] = useMutation(ADD_MODELO_TERAPEUTA);
        const [addServicioTerapeuta] = useMutation(ADD_SERVICIO_TERAPEUTA);
        const [deleteModelo] = useMutation(DELETE_MODELO);
        const [deleteServicio] = useMutation(DELETE_SERVICIO);
        const [deleteArea] = useMutation(DELETE_AREA)
        const [UpdateDescription] = useMutation(UPDATE_DESCRIPTION)
        const [UpdateCost] = useMutation(UPDATE_COST)

        

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
        const [showCalendar, setShowCalendar] = useState("visually-hidden")

        const getGoogleImg = (url) => {
          let imageId = ""
          if (url.split("/")[5]) {
            imageId = url.split("/")[5]
          } else {
            imageId ="1wlUG_-fKtSmwCW04JAxgsm-LkFqsTZ6j"
          }

          return imageId
        }
    
        useEffect(()=>{
          setModelos(dataModelos?.modelos || [])
          setServicios(dataServicios?.servicios || [])
          setAreas(dataAreas?.areas || [])
        }, [dataModelos, dataServicios, dataAreas])
    
        const addModelo = async (event, name, description) => {
          event.preventDefault()
          if (terapeuta.modelos.some(e => e.name === name)) {
            return console.log("Modelo already in array")
          }
          try {
            const mutationResponse = await addModeloTerapeuta({
              variables: {
                name: name,
                description: description
              }
            })
            console.log(mutationResponse)
            refetchTerapeuta()
          } catch (e) {
            alert("No se pudo añadir el modelo")
            console.error(e)
          }
        }
    
        const addServicio = async(event, name) => {
          event.preventDefault()
          if (terapeuta.servicios.some(e => e.name === name)) {
            return console.log("Servicio already in array")
          }
          try {
            const mutationResponse = await addServicioTerapeuta({
              variables: {
                name: name
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

        const showGoogleButton = (event) => {
          event.preventDefault()
          setShowGoogle(true)
        }
    
        const handleCloseGoogle = (event) => {
          event.preventDefault()
          setShowGoogle(false);
        }
    
    
      
        const handleFormSubmit = async (event) => {
          event.preventDefault();
            try {
            const mutationResponse = await UpdateTerapeuta({
              variables: {
                nombre: formState.nombre,
                titulo: formState.titulo,
                correo: formState.correo,
                cedula: formState.cedula,
                foto: formState.foto,
                bio: formState.bio,
              },
            });
            console.log(mutationResponse)
            alert("Información actualizada")
            window.location.reload()
          } catch (e) {
            alert('No se pudo actualizar!')
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

        const handleChangeTextArea = (event) => {
          setTextArea(event.target.value);
          console.log(textArea)
        };

        const handleTextAreaSubmit = async (event, id) => {
          event.preventDefault();
          try {
            const mutationResponse = await UpdateDescription({
              variables: {
                modeloId: id,
                description: textArea
              },
            });
            console.log(mutationResponse)
            refetchTerapeuta()
            alert("Información actualizada")
          } catch (e) {
            alert('No se pudo actualizar!')
            console.error(e);
          };
        }

        const handleChangeInputCost = (event) => {
          setInputCost(event.target.value);
          console.log(inputCost)
        };

        
        const handleInputCostSubmit = async (event, id) => {
          event.preventDefault();
          try {
            const mutationResponse = await UpdateCost({
              variables: {
                servicioId: id,
                cost: inputCost
              },
            });
            console.log(mutationResponse)
            refetchTerapeuta()
            alert("Información actualizada")
          } catch (e) {
            alert('No se pudo actualizar!')
            console.error(e);
          };
        }


        const calendarShow = (event) => {
          event.preventDefault()
          setShowCalendar("")
        }

        const calendarHide = (event) => {
          event.preventDefault()
          setShowCalendar("visually-hidden")
        }

        if (Auth.loggedIn() === false) {
          window.location.replace("/")
        }
        
        if (loadingTerapeuta) {
            return (<p>Loading...</p>)
        }
        
    
        return (
            <main>
              <div className="show-calendar-container m-auto">
              { showCalendar === "visually-hidden" ? (
              <button className="show-calendar-button m-auto border rounded p-2 mt-2 mb-2" onClick={calendarShow}>Modificar horarios disponibles</button>) : (
                <button className="show-calendar-button-close m-auto border rounded p-2 mt-2" onClick={calendarHide}>Cerrar</button>
              )}
              </div>

              
               <CalendarWidget 
                show={showCalendar} 
                ></CalendarWidget>

                  <form  onSubmit={handleFormSubmit} className="border rounded-3 p-3">
                    <div className="row justify-content-center" >
                      <div className="m-2 column col-lg-3 col-12">  
                        <h3 className="img-card-title m-auto p-1">Foto de perfil</h3>
                        <img className =" profile-image img-thumbnail img-fluid m-auto" src={`https://drive.google.com/uc?export=view&id=${getGoogleImg(terapeuta.foto)}`} alt="Foto de perfil"></img>
                      </div>
                  
                    <div className="form-group m-auto p-2 col-lg-8 col-12">
                    <label htmlFor="exampleFormControlInput9">Link para <span className="tooltip3 p-0">foto 
                        <span className="tooltiptext">Para mejor resultado elige una imagen de 200 x 200 px.
                        </span>
                      </span> de perfil 
                        <button onClick={showGoogleButton} className="button-question">?

                        </button>
                        <UseGoogleDrive show={showGoogle} onHide={handleCloseGoogle}></UseGoogleDrive>
                    </label>
                      <input 
                      type="url" 
                      name='foto' 
                      required 
                      className="form-control mt-2" 
                      id="exampleFormControlInput9" 
                      defaultValue={terapeuta.foto}
                      onChange={handleChange} />
                      </div>
                    </div>
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
                    <div className="form-group mt-2">
                      <label htmlFor="exampleFormControlInput8">Título</label>
                      <input 
                      type="text" 
                      name="titulo" 
                      required 
                      className="form-control" 
                      id="exampleFormControlInpu8" 
                      defaultValue={terapeuta.titulo}
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
                    <div className="form-group">
                    <label htmlFor="exampleFormControlInput7">Cédula</label>
                    <input 
                    type="text" 
                    name='cedula' 
                    required 
                    className="form-control" 
                    id="exampleFormControlInput7" 
                    defaultValue={terapeuta.cedula}
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
                    <button id='submit-button' type="submit" className="btn-text btn-submit border rounded w-100">Actualizar</button>
                    </form>
                    <div className="div-container rounded mt-3 p-2 mb-2">
                      <h4 className="tooltip3">Modelos Terapéuticos
                        <span className="tooltiptext">Haz click en el modelo para añadirlo a tu perfil. Si no lo encuentras, agregalo con el boton de <strong>+</strong></span>
                      </h4>
                      <div className="button-container rounded mt-3 p-1"> {modelos.map((modelo) => {
                        return <button className="select-button p-2" onClick={(event)=> addModelo(event, modelo.name, modelo.description)} key={modelo._id}>{modelo.name}</button>})}
                        <button className="select-button p-2" onClick={añadirModelo}><strong>+</strong></button>
                      </div>
                       <div className="mt-2 border rounded d-flex flex-column">
                      {terapeuta.modelos.map((modelo) =>{
                      return <div className="w-100 border row m-auto">
                        <span className="selection-perfil col-11" key = {modelo._id}>{modelo.name} </span>
                        <button className="button-close rounded col-1" onClick={(event) => quitarModelo(event, modelo._id)}>X</button>
                        <textarea defaultValue={modelo.description} onChange={handleChangeTextArea}></textarea>
                        <button className="btn-submit border" onClick={(event) => handleTextAreaSubmit(event, modelo._id)}>Actualizar</button>
                        </div>})}
                      </div>
                    </div>
                    <NewModelo show={showNewModelo} onHide={handleCloseModelo} ></NewModelo>
                    <div className="div-container rounded mt-3 p-2 mb-2 ">
                      <h4 className="tooltip3">Servicios
                      <span className="tooltiptext">Haz click en el servicio para añadirlo a tu perfil. Si no lo encuentras, agregalo con el boton de <strong>+</strong></span>
                      </h4>
                      <div className="button-container rounded mt-3 p-1"> {servicios.map((servicio) => {
                        return <button className="select-button p-2" onClick={(event)=> addServicio(event, servicio.name)} key={servicio._id}>{servicio.name}</button>})}
                        <button  className="select-button p-2" onClick={añadirServicio}><strong>+</strong></button>
                      </div>         
                      <div className="mt-2 border rounded d-flex flex-column">
                      {terapeuta.servicios.map((servicio) =>{
                      return <div className="w-100  rounded border row m-auto"> 
                        <span className="selection-perfil col-11"  key = {servicio._id}>{servicio.name}</span> 
                         <button  className="button-close rounded col-1 " onClick={(event) => quitarServicio(event, servicio._id)}>X</button>
                         <div className="w-100 rounded  border row p-0 m-auto">
                          <label className= "selection-perfil rounded  small col-sm-2 text-end col-6">Costo:</label>
                          <input className="col-6 rounded border my-1 " onChange={handleChangeInputCost} defaultValue={servicio.costo}></input>
                          <button className="btn-submit border rounded my-1 col-sm-4 col-12" onClick={(event) => handleInputCostSubmit(event, servicio._id)}>Actualizar</button>
                         </div>
                       </div>})}   
                        </div>
                    <NewServicio show={showNewServicio} onHide={handleCloseservicio} ></NewServicio>
                    </div>
                    <div className="div-container rounded mt-3 p-2">
                    <h4 className="tooltip3">Áreas de atención
                    <span className="tooltiptext">Haz click en el área para añadirla a tu perfil. Si no lo encuentras, agregalo con el boton de <strong>+</strong></span>
                  </h4>
                  <div className="button-container  rounded mt-3 p-1">  {areas.map((area) => {
                        return <button className="select-button p-2" onClick={(event)=> addArea(event, area._id)} key={area._id}>{area.name}</button>})}
                        <button className="select-button rounded p-2" onClick={añadirArea}><strong>+</strong></button>
                      </div>                    
                      <div className="mt-2 border rounded p-2 m-2 row">
                      {terapeuta.areas.map((area) =>{
                      return <div className="border rounded col-12 col-sm-6 p-1 row m-auto">
                        <span className="selection-perfil rounded col-11" key = {area._id}>{area.name} </span>
                        <button className="button-close rounded col-1" onClick={(event) => quitarArea(event, area._id)}>X</button></div>})}
                        </div>


                    <NewArea show={showNewArea} onHide={handleCloseArea} ></NewArea>
                    </div>
                   
                   
                
            </main>
    )
};

export default Perfil