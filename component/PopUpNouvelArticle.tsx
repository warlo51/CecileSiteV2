import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

export default function PopUpNouvelArticle(props: any) {
    const [show, setShow] = useState(false);

    const [titre, setTitre] = useState();
    const [texte, setTexte] = useState();
    const [phrase, setPhrase] = useState();
    const [image, setImage] = useState<any>();

    async function fileSelectedHandler(event: any){
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        setImage(base64);
    }

    function convertBase64(file: any){
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        });
    }

    async function addNewArticle() {
        await axios.post(`/api/data/addNouvelArticle`, {
            idArticle: uuidv4(),
            texte: texte,
            createAt: new Date(),
            titre: titre,
            image: image,
            phrase: phrase
        }).then((result) => result);

        setShow(false);
    }
    useEffect(()=>{
        setShow(props.show)
    },[])
    return (
        <>
            <Modal
                id={"popUpNEwArticle"}
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title" >
                            <h3 style={{padding:"30px", color:"#a2415e"}}>Nouvel article</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{display:"flex", flexDirection:"column", textAlign:"center"}}>
                        <Form className="formulaireContact">
                            <br/>
                            <div style={{display:"flex",flexDirection:"column"}}>
                                <Form.Group className="mb-3" controlId="titre" style={{width:"400px"}}>
                                    <Form.Control type="text" name="titre" placeholder="Titre"onChange={(event:any)=>setTitre(event.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="phrase" onChange={(event:any)=>setPhrase(event.target.value)} style={{width:"400px"}}>
                                    <Form.Control type="text" name="phrase"  placeholder="phrase" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="texte">
                                    <Form.Control as="textarea" name="texte" placeholder={"texte"} style={{width:"400px"}} onChange={(event:any)=>setTexte(event.target.value)}  rows={10} cols={20}/>
                                </Form.Group>
                                <Form.Label>Image :<Form.Control type="file" id="titre" onChange={(event) => {fileSelectedHandler(event)}}></Form.Control></Form.Label>
                            </div>
                            <Button onClick={()=>addNewArticle()} >
                                Valider
                            </Button>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
