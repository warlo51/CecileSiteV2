import * as React from "react";
import Button from "@mui/material/Button";
import {FloatingLabel, Form} from "react-bootstrap";
import emailjs from '@emailjs/browser';
import {useRef, useState} from "react";
import {getRefTarget} from "@restart/ui/useClickOutside";
import InfoBulle from "./Toast";

export default function FormulaireContact() {

const [message,setMessage] = useState();
const [nom,setNom] = useState();
const [prenom,setPrenom] = useState();
const [email,setEmail] = useState();
const [infoBulle, setInfoBulle] = useState(<></>)

    const sendEmail = (e:any) => {
        e.preventDefault();

        emailjs.sendForm('service_nd3yrnh', 'template_7iue6tf', e.target, 'ou3dfBGfGf6Vh5h23')
            .then((result) => {
                setInfoBulle(<InfoBulle validation={true}/>)
                setTimeout(() => {
                    setInfoBulle(<></>)
                },2000)
            }, (error) => {
                setInfoBulle(<InfoBulle validation={false}/>)
                setTimeout(() => {
                    setInfoBulle(<></>)
                },2000)
            });
    };
    return (
        <><Form className="formulaireContact" onSubmit={sendEmail}>
            <h1 >Formulaire de contact</h1>
            <br/>
            <div style={{display:"flex",flexDirection:"column", alignItems:"center"}}>
                <Form.Group className="mb-3" controlId="to_name" style={{width:"300px"}}>
                    <Form.Control type="text" name="to_name" placeholder="Nom"onChange={(event:any)=>setNom(event.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="from_name" style={{width:"300px"}}>
                    <Form.Control type="text" name="from_name" placeholder="Prenom" onChange={(event:any)=>setPrenom(event.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email" onChange={(event:any)=>setEmail(event.target.value)} style={{width:"300px"}}>
                    <Form.Control type="email" name="email"  placeholder="Email" />
                </Form.Group>
            </div>
            <Form.Group className="mb-3" controlId="message">
                <Form.Label>Votre message :</Form.Label>
                <Form.Control as="textarea" name="message"  onChange={(event:any)=>setMessage(event.target.value)} rows={7} />
            </Form.Group>
            <input style={{backgroundColor:"#a2415e",color:"white",border:"none",borderRadius:"10px"}} type="submit" value="Envoyer" />
        </Form>
            {infoBulle}
        </>
    );
}
