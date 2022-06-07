import React, {useState } from "react";
import { ADD_TERAPEUTA } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import Auth from "../utils/auth";
import { AREAS, MODELOS, SERVICIOS } from "../utils/queries";
import NewModelo from "../components/NewModelo";
import NewServicio from "../components/NewServicio";
import NewArea from "../components/NewArea";


const SignUp = () => {
    const [formState, setFormState] = useState({ email: '', password: ''});
    const [AddTerapeuta] = useMutation(ADD_TERAPEUTA);
    const [formModelos, setFormModelos] = useState([])
    const [addedModelos, setAddedModelos] = useState([])
    const [formServicios, setFormServicios] = useState([])
    const [addedServicios, setAddedServicios] = useState([])
    const [formAreas, setFormAreas] = useState([])
    const [addedAreas, setAddedAreas] = useState([])
    const [showNewModelo, setShowNewModelo] = useState(false)
    const [showNewServicio, setShowNewServicio] = useState(false)
    const [showNewArea, setShowNewArea] = useState(false)

    let { data: dataModelos, refetch: refetchModelos } = useQuery(MODELOS);
    let { data: dataServicios , refetch: refetchServicios} = useQuery(SERVICIOS);
    let { data: dataAreas, refetch: refetchAreas} = useQuery(AREAS);
    const modelos = dataModelos?.modelos || []
    const servicios = dataServicios?.servicios || []
    const areas = dataAreas?.areas || []


    const addModelos = (event, id, modelo) => {
      event.preventDefault()
      if (formModelos.includes(id)) {
        return console.log("already in array")
      }
      setFormModelos([...formModelos, id])
      setAddedModelos([...addedModelos, modelo])
    }

    const deleteModelos = (event) => {
      event.preventDefault()
      setFormModelos([])
      setAddedModelos([])
    }

    const addServicios = (event, id, servicio) => {
      event.preventDefault()
      if (formServicios.includes(id)) {
        return console.log("already in array")
      }
      setFormServicios([...formServicios, id])
      setAddedServicios([...addedServicios, servicio])
    }

    const deleteServicios = (event) => {
      event.preventDefault()
      setFormServicios([])
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
            modelos: formModelos,
            servicios: formServicios,
            areas: formAreas
          },
        });
        console.log(mutationResponse)
        const token = mutationResponse.data.addTerapeuta.token;
        Auth.login(token);
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
    
    

    return (
        <main>
              <form  onSubmit={handleFormSubmit} className="border rounded-3 p-3">
                <div className="form-group">
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
                    <label htmlFor="exampleFormControlInput9">Link para foto de perfil</label>
                    <input 
                    type="url" 
                    name='photo' 
                    required 
                    className="form-control" 
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
                <div>
                  <h4>Modelos Terapéuticos: Haz click en el modelo para añadirlo a tu perfil.</h4>
                  <div> {modelos.map((modelo) => {
                    return <button onClick={(event)=> addModelos(event, modelo._id, modelo.name)} key={modelo._id}>{modelo.name}</button>})}
                    <button onClick={añadirModelo}>Añadir</button>
                  </div>
                </div>                
                {addedModelos.map((modelo) =>{
                  return <span key = {modelo}>{modelo} </span>
                })}
                { addedModelos.length > 0 ? (<button onClick={deleteModelos}>Borrar</button>) : ("")}
            

                <NewModelo show={showNewModelo} onHide={handleCloseModelo} ></NewModelo>
                <div>
                  <h4>Servicios: Haz click en el servicio para añadirlo a tu perfil.</h4>
                  <div> {servicios.map((servicio) => {
                    return <button onClick={(event)=> addServicios(event, servicio._id, servicio.name)} key={servicio._id}>{servicio.name}</button>})}
                    <button onClick={añadirServicio}>Añadir</button>
                  </div>                
                  {addedServicios.map((servicio) =>{
                  return <span key={servicio}>{servicio} </span>
                })}
                { addedServicios.length > 0 ? (<button onClick={deleteServicios}>Borrar</button>) : ("")}
               

                <NewServicio show={showNewServicio} onHide={handleCloseservicio} ></NewServicio>
                </div>
                <div>
                  <h4>Áreas de atención: Haz click en el area para añadirla a tu perfil.</h4>
                   <div> {areas.map((area) => {
                    return <button onClick={(event)=> addAreas(event, area._id, area.name)} key={area._id}>{area.name}</button>})}
                    
                    <button onClick={añadirArea}>Añadir</button>
                  </div>               
                  {addedAreas.map((area) =>{
                  return <span key={area}>{area} </span>
                })}
                { addedAreas.length > 0 ? (<button onClick={deleteAreas}>Borrar</button>) : ("")}
                
               

                <NewArea show={showNewArea} onHide={handleCloseArea} ></NewArea>
                </div>
                <button id='submit-button' type="submit" className="btn btn-secondary mt-2">Submit</button>
               
            </form>
        </main>
    )
}

export default SignUp;
