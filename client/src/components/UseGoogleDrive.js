
import { Modal } from "react-bootstrap"


const UseGoogleDrive= ({show, onHide}) => {

    const styles = {
        listItem: {
            fontSize: "large",
        }
    }

    return (
        <Modal show= {show} onHide={onHide}>
            <ol>
                <h1>Cómo usar Google Drive para agregar imágenes </h1>
                <li style={styles.listItem} className="w-100">Añade la imagen a Google Drive. Haz click en este <a href="https://support.google.com/drive/answer/2424368?hl=es" target="_blank" rel="noreferrer">link</a> si tienes dificultad.
                    En Android, sigue este <a href="https://support.google.com/drive/answer/2424368?hl=es" target="_blank" rel="noreferrer">link.</a>
                </li>
                <li style={styles.listItem}className="w-100">Una vez que se haya terminado de cargar, obten el link para compartir de manera pública. Puedes hacerlo haciendo click derecho o seleccionado el archivo y eligiendo la opción compartir.
                    Sigue este <a href="https://support.google.com/drive/answer/2494822?hl=es" target="_blank" rel="noreferrer">link</a> si tienes dificultad.
                    En Android, sigue este  <a href="https://support.google.com/drive/answer/2424368?hl=es"target="_blank" rel="noreferrer">link</a> para más información de cómo compartir de manera pública.
                </li>
                <li style={styles.listItem}className="w-100">Asegurate que cualquier persona que tenga el vinculo pueda usarlo.</li>
                <li style={styles.listItem} className="w-100">Pega el link en el espacio tal y cómo se guardó en el portapapeles.</li>
            </ol>
            <button className="btn-submit" onClick={onHide}>Cerrar</button>

        </Modal>
    )
}

export default UseGoogleDrive;
