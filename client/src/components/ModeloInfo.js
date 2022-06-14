
import { Modal } from "react-bootstrap"


const ModeloInfo= ({show, onHide, description}) => {

    const styles = {
        listItem: {
            fontSize: "large",
        }
    }

    return (
        <Modal show= {show} onHide={onHide}>
            <div className="div-container rounded w-100">
            <p className="modal-text">{description}</p>
            <button className="btn-submit w-100 border rounded" onClick={onHide}>Cerrar</button>
            </div>
        </Modal>
    )
}

export default ModeloInfo;
