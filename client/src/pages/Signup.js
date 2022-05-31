import React, { useEffect, useState } from "react";
import { ADD_TERAPEUTA } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import Auth from "../utils/auth";
import { AREAS, MODELOS, SERVICIOS } from "../utils/queries";
import NewModelo from "../components/NewModelo";



const SignUp = () => {
    const [formState, setFormState] = useState({ email: '', password: ''});
    const [AddTerapeuta] = useMutation(ADD_TERAPEUTA);
    const [modelos, setModelos] = useState([])
    const [formModelos, setFormModelos] = useState([])
    const [addedModelos, setAddedModelos] = useState([])
    const [servicios, setServicios] = useState([])
    const [formServicios, setFormServicios] = useState([])
    const [addedServicios, setAddedServicios] = useState([])
    const [areas, setAreas] = useState([])
    const [formAreas, setFormAreas] = useState([])
    const [addedAreas, setAddedAreas] = useState([])
    const [showNewModelo, setShowNewModelo] = useState(false)

    const { loading: loadingModelos, data: dataModelos } = useQuery(MODELOS);
    const { loading: loadingServicios, data: dataServicios } = useQuery(SERVICIOS);
    const { loading: loadingAreas, data: dataAreas } = useQuery(AREAS);

    const listaModelos = dataModelos?.modelos || []
    // setModelos(listaModelos)
    const listaServicios = dataServicios?.servicios || []
    // setServicios(listaServicios)
    const listaAreas = dataAreas?.areas || []
    // setAreas(listaAreas)



    useEffect (() => {
        setModelos(dataModelos?.modelos||[])
        setServicios(listaServicios)
        setAreas(listaAreas)
    })


    const addModelos = (event, id, modelo) => {
      event.preventDefault()
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
    const handleCloseModelo = () => {
      setShowNewModelo(false);
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
          correo: formState.correo,
          cedula: formState.cedula,
          bio: formState.bio,
          modelos: formModelos,
          servicios: formServicios,
          areas: formAreas
        },
      });
      const token = mutationResponse.data.AddTerapeuta.token;
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
        <div>
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
                {addedModelos.map((modelo) =>{
                  return <span>{modelo} </span>
                })}
                { loadingModelos ? (<p>Loading</p>) : ( 
                  <div> {modelos.map((modelo) => {
                    return <button onClick={(event)=> addModelos(event, modelo._id, modelo.name)} key={modelo._id}>{modelo.name}</button>})}
                    <button onClick={deleteModelos}>Borrar</button>
                    <button onClick={añadirModelo}>Añadir</button>
                  </div>)}
                </div>
                <NewModelo show={showNewModelo} onHide={handleCloseModelo} ></NewModelo>
                <div>
                  <h4>Servicios: Haz click en el servicio para añadirlo a tu perfil.</h4>
                {addedServicios.map((servicio) =>{
                  return <span>{servicio} </span>
                })}
                { loadingServicios ? (<p>Loading</p>) : ( 
                  <div> {servicios.map((servicio) => {
                    return <button onClick={(event)=> addServicios(event, servicio._id, servicio.name)} key={servicio._id}>{servicio.name}</button>})}
                    <button onClick={deleteServicios}>Clear</button>
                  </div>)}
                </div>
                <div>
                  <h4>Áreas de atención: Haz click en el area para añadirla a tu perfil.</h4>
                {addedAreas.map((area) =>{
                  return <span>{area} </span>
                })}
                { loadingAreas ? (<p>Loading</p>) : ( 
                  <div> {areas.map((area) => {
                    return <button onClick={(event)=> addAreas(event, area._id, area.name)} key={area._id}>{area.name}</button>})}
                    <button onClick={deleteAreas}>Clear</button>
                  </div>)}
                </div>
                <button id='submit-button' type="submit" className="btn btn-secondary mt-2">Submit</button>
               
            </form>
        </div>
    )
}

export default SignUp;
