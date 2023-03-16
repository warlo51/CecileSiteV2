import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function PopUp(props: any) {
    const [show, setShow] = useState(false);

    useEffect(()=>{
        setShow(props.show)
    },[])
    return (
        <>
            <Button className={"buttonWorkbook"} onClick={() => setShow(true)}>
                JE VEUX MON WORKBOOK OFFERT!
            </Button>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title" >
                            <h3 style={{padding:"30px", color:"#a2415e"}}>Téléchargez votre CADEAU !</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{display:"flex", flexDirection:"column", textAlign:"center"}}>
                        <img src={"/Boiteaoutil.png"}/>
                        <h3 style={{color:"#a2415e"}}>& retrouvez votre équilibre santé en seulement 3 étapes !</h3>
                        <p style={{textAlign:"center"}}>
                            <span>J'adore faire des cadeaux !</span><br/>
                            <span>Je vous offre ce workbook gratui afin de vous aider à vous connaitre davantage et à enclencher dès maintenant,
                            en tuote autonomie, des actions simples pour votre mieux-etre</span>
                        </p>
                        <div style={{textAlign:"center"}}>
                            <Button style={{backgroundColor:"#a2415e", width:"200px", border:"none"}}><a href="https://yogavedasante.systeme.io/b8a6e197" target="_blank" download="EBooK_gratuit">JE LE VEUX !</a></Button>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
