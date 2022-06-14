import React, {useState } from "react";
import { ADD_TERAPEUTA } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import Auth from "../utils/auth";
import { AREAS, MODELOS, SERVICIOS } from "../utils/queries";
import NewModelo from "../components/NewModelo";
import NewServicio from "../components/NewServicio";
import NewArea from "../components/NewArea";
import "../styles/signup.css"
import UseGoogleDrive from "../components/UseGoogleDrive"


const SignUp = () => {
    const [formState, setFormState] = useState({ email: '', password: ''});
    const [AddTerapeuta] = useMutation(ADD_TERAPEUTA);
    const [addedModelos, setAddedModelos] = useState([])
    const [addedDescription, setAddedDescription] = useState([])
    const [addedServicios, setAddedServicios] = useState([])
    const [formAreas, setFormAreas] = useState([])
    const [addedAreas, setAddedAreas] = useState([])
    const [showNewModelo, setShowNewModelo] = useState(false)
    const [showNewServicio, setShowNewServicio] = useState(false)
    const [showNewArea, setShowNewArea] = useState(false)
    const [showGoogle, setShowGoogle] = useState(false)

    let { data: dataModelos, refetch: refetchModelos } = useQuery(MODELOS);
    let { data: dataServicios , refetch: refetchServicios} = useQuery(SERVICIOS);
    let { data: dataAreas, refetch: refetchAreas} = useQuery(AREAS);
    const modelos = dataModelos?.modelos || []
    const servicios = dataServicios?.servicios || []
    const areas = dataAreas?.areas || []


    const addModelos = (event, modelo, description) => {
      event.preventDefault()
      if (addedModelos.includes(modelo)) {
        return console.log("already in array")
      }
      setAddedModelos([...addedModelos, modelo])
      setAddedDescription([...addedDescription, description])
      console.log(addedDescription)
    }

    const deleteModelos = (event) => {
      event.preventDefault()
      setAddedDescription([])
      setAddedModelos([])
    }

    const addServicios = (event, servicio) => {
      event.preventDefault()
      if (addedServicios.includes(servicio)) {
        return console.log("already in array")
      }
      setAddedServicios([...addedServicios, servicio])
    }

    const deleteServicios = (event) => {
      event.preventDefault()
      setAddedServicios([])
    }

    const addAreas = (event, id, area) => {
      event.preventDefault()
      if (formAreas.includes(id)) {
        return console.log("already in array")
      }
      setFormAreas([...formAreas, id])
      setAddedAreas([...addedAreas, area])
    }

    const deleteAreas = (event) => {
      event.preventDefault()
      setFormAreas([])
      setAddedAreas([])
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
        const mutationResponse = await AddTerapeuta({
          variables: {
            email: formState.email,
            password: formState.password,
            username: formState.username,
            role: "Terapeuta",
            nombre: formState.nombre,
            titulo: formState.titulo,
            correo: formState.correo,
            cedula: formState.cedula,
            foto: formState.foto,
            bio: formState.bio,
            modelosName: addedModelos,
            modelosDescription: addedDescription,
            serviciosName: addedServicios,
            areas: formAreas
          },
        });
          console.log(mutationResponse)
          const token = mutationResponse.data.addTerapeuta.token;
          Auth.login(token);
      } catch (e) {
        alert('Algo salió mal!')
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
    
    

    return (
        <main className="pt-4">
              <form  onSubmit={handleFormSubmit} className="border rounded-3 p-3">
                <div className="form-group signup-form">
                    <label htmlFor="exampleFormControlInput1">Correo electrónico de cuenta</label>
                    <input 
                    type="email" 
                    name='email' 
                    required 
                    className="form-control" 
                    id="exampleFormControlInput1" 
                    placeholder="nombre@ejemplo.com"
                    onChange={handleChange} />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="exampleFormControlInput2">Nombre de Usuario</label>
                    <input 
                    type="username" 
                    name="username" 
                    required 
                    className="form-control" 
                    id="exampleFormControlInput2" 
                    placeholder="Usuario" 
                    onChange={handleChange}/>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="exampleFormControlInput3">Contraseña</label>
                    <input 
                    type="password" 
                    name="password" 
                    required 
                    className="form-control" 
                    id="exampleFormControlInput3" 
                    placeholder="Contraseña"
                    onChange={handleChange} />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="exampleFormControlInput4">Nombre para mostrar</label>
                    <input 
                    type="text" 
                    name="nombre" 
                    required 
                    className="form-control" 
                    id="exampleFormControlInput4" 
                    placeholder="Psic. Nombre Apellido"
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
                    placeholder="Psicoterapeuta Cognitivo Conductual ó Maestro en Terapia Humanista"
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
                    placeholder="nombre@ejemplo.com"
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
                    placeholder="1234678"
                    onChange={handleChange} />
                </div>
                <div className="form-group">
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
                    placeholder="https://drive.google.com/file/d/12345/view?usp=sharing"
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
                    placeholder="Describe de manera general quién eres y tu forma de trabajo."
                    onChange={handleChange} />
                </div>
                <div className="div-container w-100 rounded mt-3 p-2">
                  <h4 className="tooltip3">Modelos Terapéuticos
                    <span className="tooltiptext">Haz click en el modelo para añadirlo a tu perfil. Si no lo encuentras, agregalo con el boton de <strong>+</strong></span>
                  </h4>
                 
                  <div className="button-container rounded mt-3 p-1"> 
                  {modelos.map((modelo) => {
                    return <button className="select-button p-2" onClick={(event)=> addModelos(event, modelo.name, modelo.description)} key={modelo._id}>{modelo.name}</button>})}
                    <button className="select-button p-2" onClick={añadirModelo}><strong>+</strong></button>
                  </div>
                  <div className="d-flex column justify-content-between w-100">
                  <div className="mt-2 border selection-container d-flex">
                    {addedModelos.map((modelo) =>{
                       return <span className="selection" key = {modelo}> {modelo} </span>
                     })}
                  </div>
                  { addedModelos.length > 0 ? (<button className=" mt-2 borrar" onClick={deleteModelos}>Borrar</button>) : ("")}
                  </div>
                </div>                
                <NewModelo show={showNewModelo} onHide={handleCloseModelo} ></NewModelo>
                
                <div className="div-container w-100 rounded mt-3 p-2">
                  <h4 className="tooltip3">Servicios
                    <span className="tooltiptext">Haz click en el servicio para añadirlo a tu perfil. Si no lo encuentras, agregalo con el boton de <strong>+</strong></span></h4>
                  <div className="button-container rounded mt-3 p-1"> 
                  {servicios.map((servicio) => {
                    return <button className="select-button p-2" onClick={(event)=> addServicios(event, servicio.name)} key={servicio._id}>{servicio.name} </button>})}
                    <button className="select-button p-2" onClick={añadirServicio}><strong>+</strong></button>
                  </div>
                  <div className="d-flex column justify-content-between w-100">
                  <div className="mt-2 border selection-container d-flex">              
                  {addedServicios.map((servicio) =>{
                  return <span  className="selection" key={servicio}>{servicio} </span>
                })}
                </div>
                { addedServicios.length > 0 ? (<button className=" mt-2 borrar" onClick={deleteServicios}>Borrar</button>) : ("")}
                </div>      
                <NewServicio show={showNewServicio} onHide={handleCloseservicio} ></NewServicio>
                </div>

                <div className="div-container w-100 rounded mt-3 p-2">
                  <h4 className="tooltip3">Áreas de atención
                    <span className="tooltiptext">Haz click en el área para añadirla a tu perfil. Si no lo encuentras, agregalo con el boton de <strong>+</strong></span>
                  </h4>
                   <div className="button-container rounded mt-3 p-1"> 
                     {areas.map((area) => {
                    return <button  className="select-button p-2" onClick={(event)=> addAreas(event, area._id, area.name)} key={area._id}>{area.name}</button>})}
                    <button  className="select-button p-2" onClick={añadirArea}><strong>+</strong></button>
                  </div>
                  <div className="d-flex column justify-content-between w-100">
                  <div className="mt-2 border selection-container d-flex">       
                  {addedAreas.map((area) =>{
                  return <span className="selection" key={area}>{area} </span>
                })}
                  </div>
                { addedAreas.length > 0 ? (<button className=" mt-2 borrar" onClick={deleteAreas}>Borrar</button>) : ("")}
                </div>    
                <NewArea show={showNewArea} onHide={handleCloseArea} ></NewArea>
                </div>
                <button id='submit-button' type="submit" className=" btn-text btn-submit border rounded w-100 ">Crear</button>
               
            </form>
        </main>
    )
}

export default SignUp;
