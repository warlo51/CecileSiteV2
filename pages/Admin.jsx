import {Accordion, Button, Card, Col, Dropdown, Form, Row, Table} from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import Layout from "../component/Layout";
import LayoutAdmin from "../component/LayoutAdmin";
import {useRouter} from "next/router";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Modal from "react-bootstrap/Modal";
import {Container, ImageList, ImageListItem, Paper} from "@mui/material"
import CancelIcon from '@mui/icons-material/Cancel';
import InfoBulle from "../component/Toast";
import {isAfter, isBefore, format} from "date-fns";


export const getServerSideProps = async (context) =>{
    const accessTokken = context.req.cookies.AccessToken;
    let decoded;
    let profile;

    const auth0searchUser = await fetch(
        `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/userinfo`,
        {
            method: "get",
            headers: {
                Authorization: `Bearer ${accessTokken}`,
            },
        }
    ).then((data) => data.json());

    if (accessTokken === undefined) {
        decoded = null;
    } else {
        try{
            decoded = auth0searchUser.email;
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
    const [infoBulle, setInfoBulle] = useState(<></>);
    const [reload, setReaload] = useState(false);
    const [openPopUpNewArt, setOpenPopUpNewArt] = useState(false);
    const [openPopUpNewProd, setOpenPopUpNewProd] = useState(false);
    const [openPopUpNewMembre, setOpenPopUpNewMembre] = useState(false);
    const [categorie, setCategorie] = useState("yogatherapie");

    const [articles, setArticles] = useState([]);

    let tableauArticlesModifie = [];
    const router = useRouter()
    const {
        query: { page },
    } = router

    const [show, setShow] = useState(false);

    const [titre, setTitre] = useState();
    const [texte, setTexte] = useState();
    const [dateBefore, setDateBefore] = useState();
    const [dateAfter, setDateAfter] = useState();
    const [phrase, setPhrase] = useState();
    const [image, setImage] = useState();
    const [codePrix, setCodePrice] = useState();
    const [prix, setPrix] = useState();
    const [membreSelected, setMembreSelected] = useState();
    const [addFichierMore, setAddFichierMore] = useState([]);
    const [arrayOfPhotoToDelete, setArrayOfPhotoToDelete] = useState([]);
    const [photoSelected, setPhotoSelected] = useState(false);

    const [nom, setNom] = useState();
    const [nouvelleDate, setNouvelleDate] = useState(new Date());
    const [prenom, setPrenom] = useState();
    const [telephone, setTelephone] = useState();
    const [email, setEmail] = useState();
    const [fichier, setFichier] = useState();
    const [arrayOfFichier, setArrayOfFichier] = useState([]);

    const [selectionSectionMembre, setSelectionSectionMembre] = useState();

    if(props.decoded === "cecile.fabie@gmail.com"){
    async function fileSelectedHandler(event){
        setImage(event.target.value);
    }
    async function fileSelectedHandlefichier(event){
        setFichier(event.target.value);
    }

    async function fileSelectedMembre(event){
        setFichier(event.target.value);
    }

    async function fileAddIntoArrayOfFile(event, index){
        arrayOfFichier[index] = {...arrayOfFichier[index],lien:event.target.value}
    }
    async function fileAddIntoArrayOfFileCategorie(event, index){
        arrayOfFichier[index] = {...arrayOfFichier[index],categorie:event.target.value}
    }
    async function fileAddIntoArrayOfFileDate(event, index){
        arrayOfFichier[index] = {...arrayOfFichier[index],date:event.target.value}
    }

    async function fileAddIntoArrayOfFileTitre(titre, index){
        arrayOfFichier[index] = {...arrayOfFichier[index],titre:titre}
    }

    async function validationFichierMembre(id){
        const reponse = await axios.post(`/api/data/addNouveauFichierMembre`, {
            idMembre: id,
            fichier: arrayOfFichier
        }).then((result) => result);
        if(reponse.data.data === "Ok"){
            setReaload(true)
        }
    }

    async function validationDate(id){
        const reponse = await axios.post(`/api/data/modificationMembreNewDate`, {
            idMembre: id,
            date: nouvelleDate,
            categorie: categorie
        }).then((result) => result);
        if(reponse.data.data === "Ok"){
            setReaload(true)
        }
    }
    async function changeImageArticles(id, event){

        const idAlreadyExist =  tableauArticlesModifie?.findIndex((element)=>element.id === id);
        if(idAlreadyExist === -1){
            tableauArticlesModifie.push({id:id,image:event.target.value})
        }else{
            tableauArticlesModifie[idAlreadyExist] = {...tableauArticlesModifie[idAlreadyExist],image:event.target.value}
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

    async function addNewProduit() {
        const ajout = await axios.post(`/api/data/addNouveauProduit`, {
            priceCode: codePrix,
            image:image,
            prix:prix,
            titre:titre,
            categorie:categorie,
            fichier:fichier
        }).then((result) => result);

        if(ajout.data.data === "Ok"){
            setOpenPopUpNewProd(false)
            setInfoBulle(<InfoBulle validation={true}/>)
            setTimeout(()=>{
                setInfoBulle(<></>)
                setReaload(true)
            },3000)
        }else{
            setInfoBulle(<InfoBulle validation={false}/>)
            setTimeout(()=>{
                setInfoBulle(<></>)
            },3000)
        }
        setReaload(true)
    }

    useEffect(()=>{
        async function loadData(){
            const listeArticles =  await axios.get(`/api/data/loadingArticles`).then((result) => result);

            setData(listeArticles.data.Items)
        }

        async function loadPhotos(){
            const listePhotos =  await axios.get(`/api/data/loadingPhotos`).then((result) => result);

            setData(listePhotos.data.Items)
        }

        async function loadMembres(){
            const listeMembres =  await axios.get(`/api/data/listeMembres`).then((result) => result);

            setData(listeMembres.data.Items)
        }
        async function loadProduits(){
            const listeProduits =  await axios.get(`/api/data/loadingProduits`).then((result) => result);

            setData(listeProduits.data.Items)
        }
        if(page === "articles"){
            loadData()
            setReaload(false)
        }else if(page === "photos"){
            loadPhotos()
            setReaload(false)
        }else if(page === "produits"){
            loadProduits()
            setReaload(false)
        }else if(page === "membres"){
            if(selectionSectionMembre === "listeMembres"){
                loadMembres()
                setReaload(false)
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
    function changePhraseArticles (id,phrase){
        const idAlreadyExist =  tableauArticlesModifie?.findIndex((element)=>element.id === id);
        if(idAlreadyExist === -1){
            tableauArticlesModifie.push({id:id,phrase:phrase})
        }else{
            tableauArticlesModifie[idAlreadyExist] = {...tableauArticlesModifie[idAlreadyExist],phrase:phrase}
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

            if(listeArticles.data.data === "Ok"){
                setInfoBulle(<InfoBulle validation={true}/>)
                setTimeout(()=>{
                    setInfoBulle(<></>)
                },3000)
            }else{
                setInfoBulle(<InfoBulle validation={false}/>)
                setTimeout(()=>{
                    setInfoBulle(<></>)
                },3000)
            }
        }
        setReaload(true)
    }


    async function validationMembre(id) {
        const listeMembre = await axios.post(`/api/data/modificationMembre`,{email: email, telephone:telephone, nom:nom,prenom:prenom, id:id}).then((result) => result);
        if(listeMembre.data.data === "Ok"){
            setInfoBulle(<InfoBulle validation={true}/>)
            setTimeout(()=>{
                setInfoBulle(<></>)
            },3000)
        }else{
            setInfoBulle(<InfoBulle validation={false}/>)
            setTimeout(()=>{
                setInfoBulle(<></>)
            },3000)
        }
        setReaload(true)
    }

    async function validationProduits() {
        if(tableauArticlesModifie.length !== 0){
            const listeArticles = await axios.post(`/api/data/modificationProduits`,{tableauArticlesModifie}).then((result) => result);
            if(listeArticles.data.data === "Ok"){
                setInfoBulle(<InfoBulle validation={true}/>)
                setTimeout(()=>{
                    setInfoBulle(<></>)
                },3000)
            }else{
                setInfoBulle(<InfoBulle validation={false}/>)
                setTimeout(()=>{
                    setInfoBulle(<></>)
                },3000)
            }
            tableauArticlesModifie = [];
        }
        setReaload(true)
    }

    async function suppressionArticles(id) {
        const listeArticles = await axios.post(`/api/data/supressionArticles`, {id}).then((result) => result);
        if(listeArticles.data.data === "Ok"){
            setInfoBulle(<InfoBulle validation={true}/>)
            setTimeout(()=>{
                setInfoBulle(<></>)
            },3000)
        }else{
            setInfoBulle(<InfoBulle validation={false}/>)
            setTimeout(()=>{
                setInfoBulle(<></>)
            },3000)
        }
        setReaload(true)
    }

    async function suppressionFichier(id, titre) {
        const listeFichier = await axios.post(`/api/data/supressionFichier`, {id, titre}).then((result) => result);
        if(listeFichier.data.data === "Ok"){
            setInfoBulle(<InfoBulle validation={true}/>)
            setTimeout(()=>{
                setInfoBulle(<></>)
            },3000)
        }else{
            setInfoBulle(<InfoBulle validation={false}/>)
            setTimeout(()=>{
                setInfoBulle(<></>)
            },3000)
        }
        setReaload(true)
    }

    async function suppressionMembre(id) {
        const listeMembre = await axios.post(`/api/data/supressionMembre`, {id}).then((result) => result);
        if(listeMembre.data.data === "Ok"){
            setInfoBulle(<InfoBulle validation={true}/>)
            setTimeout(()=>{
                setInfoBulle(<></>)
            },3000)
        }else{
            setInfoBulle(<InfoBulle validation={false}/>)
            setTimeout(()=>{
                setInfoBulle(<></>)
            },3000)
        }
        setReaload(true)
    }
    async function suppressionProduits(id) {
        const listeArticles = await axios.post(`/api/data/supressionProduits`, {id}).then((result) => result);
        if(listeArticles.data.data === "Ok"){
            setInfoBulle(<InfoBulle validation={true}/>)
            setTimeout(()=>{
                setInfoBulle(<></>)
            },3000)
        }else{
            setInfoBulle(<InfoBulle validation={false}/>)
            setTimeout(()=>{
                setInfoBulle(<></>)
            },3000)
        }
        setReaload(true)
    }
    async function suppressionPhoto() {
        const photosDelete = await axios.post(`/api/data/supressionPhoto`, {arrayOfPhotoToDelete}).then((result) => result);
        if(photosDelete.data.data === "Ok"){
            setInfoBulle(<InfoBulle validation={true}/>)
            setTimeout(()=>{
                setInfoBulle(<></>)
                setReaload(true)
            },3000)
        }else{
            setInfoBulle(<InfoBulle validation={false}/>)
            setTimeout(()=>{
                setInfoBulle(<></>)
                setReaload(false)
            },3000)
        }

    }

    async function nouvelArticle() {
        setOpenPopUpNewArt(true)
        setReaload(true)
    }
    async function nouveauMembre() {
        setOpenPopUpNewMembre(true)
    }
    async function nouveauProduit() {
        setOpenPopUpNewProd(true)
        setReaload(true)
    }

    if(props.decoded !== null){
        if(page === "articles"){
            return (<LayoutAdmin>
                <div style={{display:"flex", flexDirection:"column", marginTop:"100px", marginBottom:"100px", alignItems:"center"}}>
                    <Button style={{backgroundColor:"#a2415e", borderRadius:"40px"}} onClick={()=>nouvelArticle()}>Ajouter un article</Button>
                    <br/>
                    <Accordion defaultActiveKey="0" style={{width:"800px"}}>
                    {data !== undefined && data?.map((element, index)=> {
                        const id=element.idArticle;
                        return(
                            <Accordion.Item key={index} eventKey={id}>
                                <Accordion.Header><textarea onChange={(event)=> changeTitreArticles(id,event.target.value)} rows={1} style={{fontFamily:"Arial"}} cols={85}>{element.titre}</textarea></Accordion.Header>
                                <Accordion.Body>
                                    <textarea onChange={(event)=> changePhraseArticles(id,event.target.value)} rows={2} cols={60}>{element.phrase}</textarea>
                                    <div style={{display:"flex",flexDirection:"row"}}>
                                        <textarea onChange={(event)=> changeTexteArticles(id,event.target.value)} rows={10} cols={60}>{element.texte}</textarea>
                                        <img src={element.image} width={"200px"}/>
                                    </div>
                                    <label>image :</label><input type="texte" id="titre" placeholder={element.image} onChange={(event) => {changeImageArticles(id,event)}}></input><br></br><br></br>
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
                                            <Form.Label>Image :<Form.Control type="texte" id="titre" onChange={(event) => {fileSelectedHandler(event)}}></Form.Control></Form.Label>
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
                {infoBulle}
            </LayoutAdmin>)
        }else if(page === "produits"){
            return (<LayoutAdmin>
                <div style={{display:"flex", flexDirection:"column", marginTop:"100px", marginBottom:"100px", alignItems:"center"}}>
                    <Button style={{backgroundColor:"#a2415e", borderRadius:"40px"}} onClick={()=>nouveauProduit()}>Ajouter un produit</Button>
                    <br/>
                    <Accordion defaultActiveKey="0" style={{width:"800px"}}>
                        {data !== undefined && data?.map((element, index)=> {
                            const id=element.idProduits;
                            return(
                                <Accordion.Item key={index} eventKey={id}>
                                    <Accordion.Header>
                                        <p>{element.titre}</p>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div style={{display:"flex",flexDirection:"column"}}>
                                            <textarea onChange={(event)=> changeTitreArticles(id,event.target.value)} rows={1} style={{fontFamily:"Arial"}} cols={85}>{element.titre}</textarea>
                                            <br/>
                                            <textarea onChange={(event)=> changeTexteArticles(id,event.target.value)} rows={10} cols={60}>{element.texte}</textarea>
                                            <br/>
                                            <img src={element.image} width={"200px"}/>
                                        </div>
                                        <label>Image :</label><input placeholder={element.image} type="texte" id="titre" onChange={(event) => {changeImageArticles(id,event)}}></input><br></br><br></br>
                                        <Button style={{marginRight:"10px"}} onClick={validationProduits}>Valider Modifications</Button>
                                        <Button onClick={()=>suppressionProduits(id)}>Supprimer le produit</Button>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )
                        })}
                    </Accordion>
                    <>
                        <Modal
                            id={"popUpNEwArticle"}
                            show={openPopUpNewProd}
                            onHide={() => setOpenPopUpNewProd(false)}
                            dialogClassName="modal-90w"
                            aria-labelledby="example-custom-modal-styling-title"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-custom-modal-styling-title" >
                                    <h3 style={{padding:"30px", color:"#a2415e"}}>Nouveau produit</h3>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div style={{display:"flex", flexDirection:"column", textAlign:"center"}}>
                                    <Form className="formulaireContact">
                                        <br/>
                                        <div style={{display:"flex",flexDirection:"column"}}>
                                            <Form.Group className="mb-3" controlId="categorie" style={{width:"400px"}}>
                                                <Form.Select type="text" name="categorie" placeholder="Categorie"onChange={(event)=>setCategorie(event.target.value)}>
                                                    <option value={"Audio"}>Audio</option>
                                                    <option value={"Video"}>Video</option>
                                                    <option value={"Outils"}>Outils Numériques</option>
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="codePrice" style={{width:"400px"}}>
                                                <Form.Control type="text" name="codePrice" placeholder="Code Prix"onChange={(event)=>setCodePrice(event.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="titre" style={{width:"400px"}}>
                                                <Form.Control type="text" name="titre" placeholder="Titre"onChange={(event)=>setTitre(event.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="prix" style={{width:"400px"}}>
                                                <Form.Control type="text" name="prix" placeholder="Prix"onChange={(event)=>setPrix(event.target.value)} />
                                            </Form.Group>
                                            <Form.Label>Image :<Form.Control type="texte" id="titre" onChange={(event) => {fileSelectedHandler(event)}}></Form.Control></Form.Label>
                                            <Form.Label>Fichier A telecharger :<Form.Control  type="texte" id="fichier" onChange={(event) => {fileSelectedHandlefichier(event)}}></Form.Control></Form.Label>
                                        </div>
                                        <Button onClick={()=>{addNewProduit()}} >
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
                        <Button style={{marginRight:"20px"}} style={{backgroundColor:"#a2415e", borderRadius:"40px"}} onClick={()=>setSelectionSectionMembre("listeMembres")}>Afficher les membres</Button>
                    </div>
                    <br/>
                    {selectionSectionMembre === "listeMembres" ?
                        <Container maxWidth="xl">
                            <Row>
                                <Col sm={5} className={"tableauAdminMembre"}>
                                    <AddIcon onClick={()=>nouveauMembre()}/>
                                    <Table style={{width:"100px"}} striped bordered hover>
                                        <thead style={{borderBottom:"solid"}}>
                                        <tr style={{fontWeight:"bold"}}>
                                            <td>Nom</td>
                                            <td>Prénom</td>
                                            <td>Email</td>
                                            <td>Telephone</td>
                                        </tr>
                                        </thead>
                                        <tbody className={"trMembre"}>
                                        {data?.map((membre, index)=> {
                                            console.log(membre)
                                            return(<tr onClick={()=>setMembreSelected(index)}>
                                                <td style={{padding:"10px", marginRight:"10px"}}>{membre.nom}</td>
                                                <td>{membre.prenom}</td>
                                                <td>{membre.email}</td>
                                                <td>{membre.telephone}</td>
                                            </tr>)
                                        })}
                                        </tbody>
                                    </Table>
                                </Col>
                                <Col sm={7} className={"paperAdminMembre"}>
                                    <Paper style={{width:"100%", height:"700px", padding:"10px"}}>
                                    {membreSelected !== undefined &&
                                        <div style={{display:"flex",flexDirection:"column",justifyContent: "space-around"}}>
                                               <Form style={{display:"flex",flexDirection:"row",justifyContent: "space-around"}}>
                                                   <Form.Label>Nom :<Form.Control type="text" name="nom" placeholder={`${data[membreSelected].nom}`} onChange={(event)=>setNom(event.target.value)} /></Form.Label>
                                                   <Form.Label>Prenom :<Form.Control type="text" name="prenom" placeholder={`${data[membreSelected].prenom}`} onChange={(event)=>setPrenom(event.target.value)} /></Form.Label>
                                                   <Form.Label>Telephone :<Form.Control type="text" name="telephone" placeholder={`${data[membreSelected].telephone}`} onChange={(event)=>setTelephone(event.target.value)} /></Form.Label>
                                                   <Form.Label>Email: <Form.Control type="text" name="email" placeholder={`${data[membreSelected].email}`} onChange={(event)=>setEmail(event.target.value)} /></Form.Label>
                                               </Form>
                                            <div style={{display:"flex",flexDirection:"row", justifyContent: "space-around"}}>
                                                <Button style={{width:"150px", fontSize:"10px"}} style={{backgroundColor:"#a2415e", borderRadius:"40px"}}onClick={()=>{validationMembre(data[membreSelected].idMembre)}}>Valider Modifications</Button>
                                                <Button style={{width:"150px",fontSize:"10px"}}style={{backgroundColor:"#a2415e", borderRadius:"40px"}} onClick={()=>suppressionMembre(data[membreSelected].idMembre)}>Supprimer le membre</Button>
                                            </div>
                                            <hr />
                                            <div style={{display:"flex",flexDirection:"column",justifyContent: "space-around"}}>
                                                <div style={{display:"flex",flexDirection:"row"}}>
                                                    <Form style={{display:"flex",flexDirection:"column",justifyContent: "space-around"}}>
                                                        <Form.Label>Nouvelle Date :<DatePicker selected={nouvelleDate} onChange={(date) => setNouvelleDate(date)} /></Form.Label>
                                                       <Form.Select selected={nouvelleDate} onChange={(event) => setCategorie(event.target.value)} >
                                                        <option value={"yogatherapie"}>Yogatherapie</option>
                                                        <option value={"massages"}>Massages</option>
                                                        </Form.Select>
                                                    </Form>
                                                    <Button style={{width:"150px", fontSize:"10px"}} style={{backgroundColor:"#a2415e", borderRadius:"40px", width:"200px", height:"40px"}} onClick={()=>{validationDate(data[membreSelected].idMembre)}}>Ajouter</Button>
                                                </div>
                                               <br></br>
                                                {data[membreSelected].rdv.length !== 0 &&
                                                    <><p>Precedent: {
                                                        data[membreSelected].rdv.filter((date)=> isBefore(new Date(date), new Date())).sort(function(a, b) {
                                                            return new Date(b) - new Date(a);
                                                        })[0] !== undefined && format(new Date(data[membreSelected].rdv.filter((date)=> isBefore(new Date(date), new Date())).sort(function(a, b) {
                                                    return new Date(b) - new Date(a);
                                                })[0]),"dd-MM-yyyy")}</p>
                                                <p>Prochain: {
                                                    data[membreSelected].rdv.filter((date)=> isAfter(new Date(date), new Date())).sort(function(a, b) {
                                                        return new Date(a) - new Date(b);
                                                    })[0] !== undefined &&
                                                    format(new Date(data[membreSelected].rdv.filter((date)=> isAfter(new Date(date), new Date())).sort(function(a, b) {
                                                    return new Date(a) - new Date(b);
                                                })[0]),"dd-MM-yyyy")}</p></>}
                                            </div>
                                            <hr />
                                            <div style={{display:"flex",flexDirection:"row"}}>
                                                <AddIcon onClick={()=> setAddFichierMore([...addFichierMore,1])}/>
                                                <Button style={{width:"150px", fontSize:"10px"}} style={{backgroundColor:"#a2415e", borderRadius:"40px",width:"200px"}}onClick={()=>{validationFichierMembre(data[membreSelected].idMembre)}}>Enregistrer les fichiers</Button>
                                            </div>
                                            <div style={{display:"flex",flexDirection:"column"}}>
                                                {addFichierMore?.map((fichier, index)=>{
                                                    return(<>
                                                        <Form.Label>Titre :<Form.Control type="texte" id="titre" onChange={(event) => {fileAddIntoArrayOfFileTitre(event.target.value,index)}}></Form.Control></Form.Label>
                                                        <Form.Label>Fichier :<Form.Control type="texte" id="fichier" onChange={(event) => {fileAddIntoArrayOfFile(event,index)}}></Form.Control></Form.Label>
                                                        <Form.Label>Categorie :<Form.Select type="texte" id="categorie" onClick={(event) => {fileAddIntoArrayOfFileCategorie(event,index)}}>
                                                            <option value={"Audios"} defaultValue={"Audios"}>Audios</option>
                                                            <option value={"Videos"}>Videos</option>
                                                            <option value={"Fiches"}>Fiches</option>
                                                        </Form.Select></Form.Label>
                                                        <Form.Label>Date lié :<Form.Select type="texte" id="fichier" onClick={(event) => {fileAddIntoArrayOfFileDate(event,index)}}>
                                                            <option value={data[membreSelected].rdv[0]} defaultValue={data[membreSelected].rdv[0]}>{data[membreSelected].rdv[0]}</option>
                                                            {data[membreSelected].rdv.map((element, index)=>{
                                                                if(index > 0){
                                                                    return(<option key={index}>{element}</option>)
                                                                }
                                                            })}
                                                        </Form.Select></Form.Label>
                                                    </>)
                                                })}
                                            </div>
                                            {data[membreSelected].fichier.length !== 0 &&
                                            <Table style={{width:"100px"}} striped bordered hover>
                                                <thead style={{borderBottom:"solid"}}>
                                                <tr style={{fontWeight:"bold"}}>
                                                    <td>Lien</td>
                                                </tr>
                                                </thead>
                                                <tbody style={{width:"100px"}}>
                                                {data[membreSelected].fichier?.map((fichier, index)=> {
                                                    return(<tr key={fichier.titre} onClick={()=>setMembreSelected(index)}>
                                                        <td style={{padding:"10px", marginRight:"10px"}}>{fichier.titre} <CloseIcon style={{color:"#a2415e"}} onClick={()=> suppressionFichier(data[membreSelected].idMembre,fichier.titre)}/></td>
                                                    </tr>)
                                                })}
                                                </tbody>
                                            </Table>}
                                        </div>
                                    }
                                    </Paper>
                                </Col>

                            </Row>

                        </Container>
                        : <></>}
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
                {infoBulle}
            </LayoutAdmin>)
        }else if (page === "photos"){
            return (<LayoutAdmin>
                <br/>
                <Form.Control type="texte" id="titre" style={{width:"400px"}} onChange={(event) => {fileSelectedHandler(event)}}></Form.Control>
                <a href={"https://compresspng.com/fr/"} style={{color:"black"}} target="_blank"> Lien site pour compresser image ICI</a><br/>
                <Button onClick={()=>{addNewPhoto()}}>Valider</Button>
                <ImageList style={{marginTop:"20px",justifyContent:"start"}} cols={3}>
                    {data?.map((photo, index)=>{
                        return(<div key={index} style={{padding:"40px"}}>
                            <Button style={{backgroundColor:"transparent", border:"none"}}>
                                <CancelIcon onClick={(event)=>{setArrayOfPhotoToDelete([...arrayOfPhotoToDelete,photo.idPhoto])}} style={{color:"#a2415e"}}/>
                            </Button>
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
                <Button style={{border:"none"}} onClick={()=>suppressionPhoto()}>Valider toutes les modifications</Button>
                {infoBulle}
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
    }}else{
        return(<>Vous n'avez pas les droits</>)
    }
}
