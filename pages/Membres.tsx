import Layout from "../component/Layout";
import { Chrono } from "react-chrono";
import db from "../src/database/db";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import * as React from "react";
import {format} from "date-fns";
import {Nav, FormSelect, Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import { Container} from "@mui/material";
import ReactAudioPlayer from "react-audio-player";
import CreateIcon from '@mui/icons-material/Create';
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import {v4 as uuidv4} from "uuid";
import InfoBulle from "../component/Toast";
import {client} from "../src/database/sanity";
import {reverseString, urlFor} from "../src/utils/function";
import Link from "next/link";


export const getServerSideProps = async (context: any) =>{
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

    const paramsAll = {
        TableName: "Membres"
    }

    try{
        const data: any = await client.fetch(`*[_type=="membres"]{
      ...,
      "rdv": *[_type=='rdv' && references(^._id)]{ 
      \tdate,
      categorie,
         'fichiers': fichiers[]->{
        "fichier":*[_type=='fichiers' && ^._id == _id]{
          ...,
          "fichier": fichier.asset->url
            }}
    \t}
    }`);

        let userFound;
        if(data.length === 0){
            userFound=null;
        }else{
            const found = data.find((element: any)=> element.email === auth0searchUser.email);
            if(found === undefined){
                userFound=null;
            }else{
                userFound=found;
            }
        }
        return {
            props: {
                email: auth0searchUser.email,
                userFound: userFound
            }
        };
    }catch (err){
        console.log(err)
    }

}

export default function Contact(props:any) {


    const [showDetails, setShowDetails] = useState<any>("")
    const [showDate, setShowDate] = useState("yogatherapie")
    const [itemsReturn, setItemsReturn] = useState([])
    const [showModifyPhoto, setShowModifyPhoto] = useState(false)
    const [reload, setReaload] = useState(false)
    const [infoBulle, setInfoBulle] = useState(<></>)
    const [photoProfil, setPhotoProfil] = useState<any>("")
    const [dateSelected, setDateSelected] = useState<string|undefined>("")

    if(props.userFound !== null){

        const membreInformation = props.userFound;
        let tableauFichiers:any=[];

        const listeOfDateMassages: any = []
        const listeOfDateYogatherapie: any = []
        membreInformation.rdv?.forEach((liste: any)=>{
            if(liste.categorie === "yogatherapie"){
                if(!listeOfDateYogatherapie.includes(format(new Date(liste.date),"dd-MM-yyyy"))){
                    listeOfDateYogatherapie.push(format(new Date(liste.date),"dd-MM-yyyy"))
                }
                liste.fichiers?.forEach((element:any)=>{
                    if(tableauFichiers[liste.date]){
                        if(element.fichier[0].categorie === "videos"){
                            tableauFichiers[liste.date].videos = [...tableauFichiers[liste.date].videos,{
                                titre: element.fichier[0].titre,
                                lien: element.fichier[0].fichier
                            }]
                        }else if(element.fichier[0] === "audios"){
                            tableauFichiers[liste.date].audios = [...tableauFichiers[liste.date].audios,{
                                titre: element.fichier[0].titre,
                                lien: element.fichier[0].fichier
                            }]
                        }else{
                            tableauFichiers[liste.date].fiches = [...tableauFichiers[liste.date].fiches,{
                                titre: element.fichier[0].titre,
                                lien: element.fichier[0].fichier
                            }]
                        }
                    }else{
                        if(element.fichier[0].categorie === "videos"){
                            tableauFichiers[liste.date] = {
                                videos:[{
                                    titre: element.fichier[0].titre,
                                    lien: element.fichier[0].fichier
                                }],
                                audios:[],
                                fiches:[]
                            }
                        }else if(element.fichier[0].categorie === "audios"){
                            tableauFichiers[liste.date] = {
                                audios:[{
                                    titre: element.fichier[0].titre,
                                    lien: element.fichier[0].fichier
                                }],
                                videos:[],
                                fiches:[]
                            }
                        }else{
                            tableauFichiers[liste.date] = {
                                fiches:[{
                                    titre: element.fichier[0].titre,
                                    lien: element.fichier[0].fichier
                                }],
                                audios:[],
                                videos:[]
                            }
                        }
                    }
                });
            }else{
                if(!listeOfDateMassages.includes(format(new Date(liste.date),"dd-MM-yyyy"))){
                    listeOfDateMassages.push(format(new Date(liste.date),"dd-MM-yyyy"))
                }
            }

        })



        const fileSelectedHandler = async (event: any) => {
            const file = event.target.files[0];
            const base64 = await convertBase64(file);
            setPhotoProfil(base64);
        }


            const convertBase64 = (file: any) => {
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

        useEffect(()=>{

            if(showDate === "massages"){
                const data = listeOfDateMassages.map((date: any)=>{
                    return {title:date}
                })
                if(data.length !== 0) {
                    setDateSelected(reverseString(data[0].title))
                }
                setItemsReturn(data);
            }else{
                const data = listeOfDateYogatherapie.map((date: any)=>{
                    return {title:date}
                })
                if(data.length !== 0) {
                    setDateSelected(reverseString(data[0].title))
                }
                setItemsReturn(data);
            }
        },[showDate])

        useEffect(()=>{
            setPhotoProfil(membreInformation.photo)
        },[])
    return (
        <Layout>
            <div className="container" >
                <br />
                <div>
                    <Card  className="CardContent" style={{display:"flex",flexDirection:"column"}} >
                        <div style={{display:"flex",flexDirection:"row"}}>
                            <CardMedia
                                className="imageCard"
                                component="img"
                                alt=""
                                height={100}
                                width={100}
                                image={urlFor(membreInformation.photo).width(200).url()}
                            />
                            <CardContent className="texteCards">
                                <Typography gutterBottom style={{color:"black",textAlign:"left"}}>
                                    {membreInformation.nom}
                                </Typography>
                                <Typography>
                                    {membreInformation.prenom}
                                </Typography>
                                <Typography>
                                    {membreInformation.age} ans
                                </Typography>
                                <Typography>
                                    {membreInformation.ville}
                                </Typography>
                                <Typography>
                                    {membreInformation.cp}
                                </Typography>
                                <hr/>
                            </CardContent>
                        </div>
                    </Card>
                    <div>
                        <p>
                            Bienvenue dans votre Espace membres ! Ici vous retrouverez tout l'historique de votre suivie.
                            Il vous suffit de cliquer sur vos date de rendez-vous pour acèder à vos fichies explicatives ainsi qu'a vos audios.
                            Bonne pratique !
                        </p>
                    </div>

                    <h3>Filtrez vos rendez vous</h3>
                    <FormSelect onChange={(event: any)=>setShowDate(event.target.value)}>
                        <option defaultValue={"yogatherapie"}>yogathérapie</option>
                        <option defaultValue={"massages"}>massages</option>
                    </FormSelect>
                    <div style={{ width: "100%", maxHeight: "2000px", height:"1000px", color:"black"}}>
                        <div style={{padding:"30px", alignItems:"center"}}>
                            <Chrono mode="HORIZONTAL" items={itemsReturn} allowDynamicUpdate={true} cardLess={true} activeItemIndex={0} onItemSelected={(event)=>setDateSelected(event.title)}/>
                        </div>
                            {dateSelected !== "" && <Nav justify variant="tabs" defaultActiveKey="/home">
                            <Nav.Item>
                                <Nav.Link onClick={()=>setShowDetails("Videos")}>Videos</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={()=>setShowDetails("Audios")}>Audios</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={()=>setShowDetails("Fiches")}>Fiches</Nav.Link>
                            </Nav.Item>
                        </Nav>}
                        <Container>
                            {(showDetails === "Videos" && dateSelected!== undefined && tableauFichiers[dateSelected] !== undefined) && tableauFichiers[dateSelected].videos?.map((video: any,index:number)=>{
                                return(<Card key={index} style={{marginBottom:"10px"}}>
                                    <CardContent>
                                        <div style={{display:"flex",flexDirection:"row",justifyContent: "space-around"}}>
                                            <h2 >{video.titre}</h2>
                                            <video
                                                src={video.lien}
                                                width={600}
                                                height={400}
                                                controls
                                            />
                                        </div>
                                    </CardContent>
                                </Card>)
                            })}
                            {(showDetails === "Audios" && dateSelected!== undefined && tableauFichiers[dateSelected] !== undefined) && tableauFichiers[dateSelected].audios?.map((audio: any,index:number)=>{
                                return(<Card key={index} style={{marginBottom:"10px"}}>
                                    <CardContent>
                                        <div style={{display:"flex",flexDirection:"row",justifyContent: "space-around"}}>
                                            <h2>{audio.titre}</h2>
                                            <ReactAudioPlayer src={audio.lien} controls />
                                        </div>
                                    </CardContent>
                                </Card>)
                            })}
                            {(showDetails === "Fiches" && dateSelected!== undefined && tableauFichiers[dateSelected] !== undefined) && tableauFichiers[dateSelected].fiches?.map((fiche: any,index:number)=>{
                                return(<Card key={index} style={{marginBottom:"10px"}}>
                                    <CardContent>
                                        <div style={{display:"flex",flexDirection:"row",justifyContent: "space-around"}}>
                                            <h2>{fiche.titre}</h2>
                                            <Button><a href={fiche.lien} target="_blank">Telécharger la fiche</a></Button>
                                        </div>
                                    </CardContent>
                                </Card>)
                            })}
                        </Container>
                    </div>
                </div>
            </div>
        </Layout>
    )}else{
        return(<>
            <br/>
            <Link href={"/"}><button style={{backgroundColor:"#a2415e",color:"white",border:"none",borderRadius:"10px"}}>Retour</button></Link>
            <br/>
            <h1>Vos accès ne sont pas encore crées</h1>
        </>)
    }
}
