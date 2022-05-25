import React from 'react';
import { useParams } from 'react-router-dom';


const Terapeuta = () => {
    const {terapeutaId} = useParams
    return (
        <div>
            Hola soy un terapeuta
        </div>
    )
}

export default Terapeuta;
