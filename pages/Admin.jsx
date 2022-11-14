import {Accordion, Button, Card, Col, Dropdown, Form, Row} from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import Layout from "../component/Layout";
import LayoutAdmin from "../component/LayoutAdmin";
import {useRouter} from "next/router";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import PopUpNouvelArticle from "../component/PopUpNouvelArticle";
import Modal from "react-bootstrap/Modal";
import {ImageList, ImageListItem} from "@mui/material"
import CancelIcon from '@mui/icons-material/Cancel';


export const getServerSideProps = async (context) =>{
    const accessTokken = context.req.cookies.AccessToken;
    let decoded;
    let profile;

    if (accessTokken === undefined) {
        decoded = null;
    } else {
        try{
            decoded = jwt_decode(accessTokken);
        }catch(error){
            decoded = null
        }
    }

    return {
        props: {
            decoded: decoded
        }
    };
}


export default function Administration(props) {

    const [data, setData] = useState();
    const [reload, setReaload] = useState(false);
    const [openPopUpNewArt, setOpenPopUpNewArt] = useState(false);
    const [openPopUpNewMembre, setOpenPopUpNewMembre] = useState(false);

    const [articles, setArticles] = useState([]);

    let tableauArticlesModifie = [];
    const router = useRouter()
    const {
        query: { page },
    } = router

    const [show, setShow] = useState(false);

    const [titre, setTitre] = useState();
    const [texte, setTexte] = useState();
    const [phrase, setPhrase] = useState();
    const [image, setImage] = useState();

    const [nom, setNom] = useState();
    const [prenom, setPrenom] = useState();
    const [telephone, setTelephone] = useState();
    const [email, setEmail] = useState();

    const [selectionSectionMembre, setSelectionSectionMembre] = useState();

    async function fileSelectedHandler(event){
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        setImage(base64);
    }

    async function changeImageArticles(id, event){
        const file = event.target.files[0];
        const base64 = await convertBase64(file);

        const idAlreadyExist =  tableauArticlesModifie?.findIndex((element)=>element.id === id);
        if(idAlreadyExist === -1){
            tableauArticlesModifie.push({id:id,image:base64})
        }else{
            tableauArticlesModifie[idAlreadyExist] = {...tableauArticlesModifie[idAlreadyExist],image:base64}
        }
    }
    function convertBase64(file){
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

        setOpenPopUpNewArt(false);
        setReaload(true)
    }

    async function addNewMembre() {
        await axios.post(`/api/data/addNouveauMembre`, {
            idMembre: uuidv4(),
            nom: nom,
            prenom: prenom,
            telephone: telephone,
            email: email,
        }).then((result) => result);

        setOpenPopUpNewMembre(false);
        setReaload(true)
    }

    async function addNewPhoto() {
        await axios.post(`/api/data/addNouvellePhoto`, {
            idPhoto:uuidv4(),
            lien:image
        }).then((result) => result);

        setReaload(true)
    }

    useEffect(()=>{
        async function loadData(){
            const listeArticles =  await axios.get(`/api/data/loadingArticles`).then((result) => result);

            setData(listeArticles.data.data)
        }

        async function loadPhotos(){
            const listePhotos =  await axios.get(`/api/data/loadingPhotos`).then((result) => result);

            setData(listePhotos.data.data)
        }

        async function loadMembres(){
            const listeMembres =  await axios.get(`/api/data/listeMembres`).then((result) => result);

            setData(listeMembres.data.data)
        }
        if(page === "articles"){
            loadData()
            setReaload(false)
        }else if(page === "photos"){
            loadPhotos()
        }else if(page === "membres"){
            if(selectionSectionMembre === "listeMembres"){
                loadMembres()
            }
        }

    },[page, reload === true,selectionSectionMembre])

    function changeTexteArticles (id,texte){
       const idAlreadyExist =  tableauArticlesModifie?.findIndex((element)=>element.id === id);
       if(idAlreadyExist === -1){
           tableauArticlesModifie.push({id:id,texte:texte})
       }else{
           tableauArticlesModifie[idAlreadyExist] = {...tableauArticlesModifie[idAlreadyExist],texte:texte}
       }
    }

    function changeTitreArticles (id,titre){
        const idAlreadyExist =  tableauArticlesModifie?.findIndex((element)=>element.id === id);
        if(idAlreadyExist === -1){
            tableauArticlesModifie.push({id:id,titre:titre})
        }else{
            tableauArticlesModifie[idAlreadyExist] =  {...tableauArticlesModifie[idAlreadyExist],titre:titre}
        }
    }

    async function validationArtciles() {
        if(tableauArticlesModifie.length !== 0){
            const listeArticles = await axios.post(`/api/data/modificationArticles`,{tableauArticlesModifie}).then((result) => result);
            tableauArticlesModifie = [];
        }
        setReaload(true)
    }

    async function suppressionArticles(id) {
        const listeArticles = await axios.post(`/api/data/supressionArticles`, {id}).then((result) => result);
        setReaload(true)
    }
    async function suppressionPhoto(id) {
        const photosDelete = await axios.post(`/api/data/supressionPhoto`, {id}).then((result) => result);
        setReaload(true)
    }
    async function nouvelArticle() {
        setOpenPopUpNewArt(true)
        setReaload(true)
    }
    async function nouveauMembre() {
        setOpenPopUpNewMembre(true)
        setReaload(true)
    }

    if(props.decoded !== null){
        if(page === "articles"){
            return (<LayoutAdmin>
                <div style={{display:"flex", flexDirection:"column", marginTop:"100px", marginBottom:"100px", alignItems:"center"}}>
                    <Button onClick={()=>nouvelArticle()}>Ajouter un article</Button>
                    <br/>
                    <Accordion defaultActiveKey="0" style={{width:"800px"}}>
                    {data !== undefined && data?.map((element, index)=> {
                        const id=element.idArticle;
                        return(
                            <Accordion.Item key={index} eventKey={id}>
                                <Accordion.Header><textarea onChange={(event)=> changeTitreArticles(id,event.target.value)} rows={1} style={{fontFamily:"Arial"}} cols={85}>{element.titre}</textarea></Accordion.Header>
                                <Accordion.Body>
                                    <div style={{display:"flex",flexDirection:"row"}}>
                                        <textarea onChange={(event)=> changeTexteArticles(id,event.target.value)} rows={10} cols={60}>{element.texte}</textarea>
                                        <img src={element.image} width={"200px"}/>
                                    </div>
                                    <input type="file" id="titre" onChange={(event) => {changeImageArticles(id,event)}}></input><br></br><br></br>
                                    <Button style={{marginRight:"10px"}} onClick={validationArtciles}>Valider Modifications</Button>
                                    <Button onClick={()=>suppressionArticles(id)}>Supprimer l'article</Button>
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    })}
                    </Accordion>
                    <>
                        <Modal
                            id={"popUpNEwArticle"}
                            show={openPopUpNewArt}
                            onHide={() => setOpenPopUpNewArt(false)}
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
                                                <Form.Control type="text" name="titre" placeholder="Titre"onChange={(event)=>setTitre(event.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="phrase" onChange={(event)=>setPhrase(event.target.value)} style={{width:"400px"}}>
                                                <Form.Control type="text" name="phrase"  placeholder="phrase" />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="texte">
                                                <Form.Control as="textarea" name="texte" placeholder={"texte"} style={{width:"400px"}} onChange={(event)=>setTexte(event.target.value)}  rows={10} cols={20}/>
                                            </Form.Group>
                                            <Form.Label>Image :<Form.Control type="file" id="titre" onChange={(event) => {fileSelectedHandler(event)}}></Form.Control></Form.Label>
                                        </div>
                                        <Button onClick={()=>{addNewArticle()}} >
                                            Valider
                                        </Button>
                                    </Form>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </>
                </div>
            </LayoutAdmin>)
        }else if (page === "membres"){
            return (<LayoutAdmin>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <br/>
                    <div style={{display:"flex",flexDirection:"row", alignItems:"center"}}>
                        <Button onClick={()=>nouveauMembre()}>Ajouter un membre</Button>
                        <Button onClick={()=>setSelectionSectionMembre("listeMembres")}>Afficher les membres</Button>
                        <Button onClick={()=>setSelectionSectionMembre("???")}>???</Button>
                    </div>
                    <br/>
                    {selectionSectionMembre === "listeMembres" ?
                        data?.map((membre, index)=>{
                            return(<Accordion key={index}>
                                <Accordion.Item>
                                    <Accordion.Header style={{fontFamily:"Arial"}}>{membre.nom} {membre.prenom}</Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            <p>Telephone: {membre.telephone}</p>
                                            <p>Email: {membre.email}</p>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>)
                        }): <></>}



                    <>
                        <Modal
                            id={"popUpNEwArticle"}
                            show={openPopUpNewMembre}
                            onHide={() => setOpenPopUpNewMembre(false)}
                            dialogClassName="modal-90w"
                            aria-labelledby="example-custom-modal-styling-title"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-custom-modal-styling-title" >
                                    <h3 style={{padding:"30px", color:"#a2415e"}}>Nouveau membre</h3>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div style={{display:"flex", flexDirection:"column", textAlign:"center"}}>
                                    <Form className="formulaireContact">
                                        <br/>
                                        <div style={{display:"flex",flexDirection:"column"}}>
                                            <Form.Group className="mb-3" controlId="nom" style={{width:"400px"}}>
                                                <Form.Control type="text" name="nom" placeholder="Nom"onChange={(event)=>setNom(event.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="prenom" onChange={(event)=>setPrenom(event.target.value)} style={{width:"400px"}}>
                                                <Form.Control type="text" name="prenom"  placeholder="Prenom" />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="telephone" onChange={(event)=>setTelephone(event.target.value)} style={{width:"400px"}}>
                                                <Form.Control type="text" name="telephone"  placeholder="Telephone" />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="email" onChange={(event)=>setEmail(event.target.value)} style={{width:"400px"}}>
                                                <Form.Control type="email" name="email"  placeholder="Email" />
                                            </Form.Group>
                                        </div>
                                        <Button onClick={()=>{addNewMembre()}} >
                                            Valider
                                        </Button>
                                    </Form>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </>
                </div>
            </LayoutAdmin>)
        }else if (page === "photos"){
            return (<LayoutAdmin>
                <br/>
                <Form.Control type="file" id="titre" style={{width:"400px"}} onChange={(event) => {fileSelectedHandler(event)}}></Form.Control>
                <a href={"https://compresspng.com/fr/"} style={{color:"black"}} target="_blank"> Lien site pour compresser image ICI</a><br/>
                <Button onClick={()=>{addNewPhoto()}}>Valider</Button>
                <ImageList style={{marginTop:"20px",justifyContent:"start"}} cols={3}>
                    {data?.map((photo, index)=>{
                        return(<div key={index} style={{padding:"40px"}}>
                            <Button style={{backgroundColor:"transparent", border:"none"}}><CancelIcon onClick={(event)=>{suppressionPhoto(photo.idPhoto)}} style={{color:"#a2415e"}}/></Button>
                            <ImageListItem key={index} style={{height:"200px",width:"200px"}}>
                                <img
                                    src={photo.lien}
                                    srcSet={photo.lien}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        </div>)
                    })}
                    </ImageList>
            </LayoutAdmin>)
        }else{
            return (<LayoutAdmin>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </LayoutAdmin>)
        }

    }else {
        return (
            <Layout>
                <Row style={{height:"1000px", display:"flex", justifyContent:"center", alignContent:"center"}}><Button href="/api/auth/login" style={{backgroundColor:"#3d1e7b",borderRadius:"30px", width:"200px", height:"150px"}}><p style={{marginTop:"50px"}}>Se connecter</p></Button></Row>
            </Layout>
        )
    }
}
