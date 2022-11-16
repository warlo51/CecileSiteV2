import Toast from 'react-bootstrap/Toast';

function InfoBulle(props:any) {

    return (
        <Toast style={{position:"fixed",top:"0"}}>
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">Modifications</strong>
            </Toast.Header>
            {props.validation === true ? <Toast.Body>Modifications validées</Toast.Body> : <Toast.Body>Erreur lors de la modification</Toast.Body>}
        </Toast>
    );
}

export default InfoBulle;
