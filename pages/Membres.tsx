import Layout from "../component/Layout";
import { Chrono } from "react-chrono";
import db from "../src/database/db";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import * as React from "react";
import {format} from "date-fns";
import { Nav } from "react-bootstrap";
import {useState} from "react";
import {CardHeader, Container} from "@mui/material";


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
        const data: any = await db.scan(paramsAll).promise();

        let userFound;
        if(data.Items.length === 0){
            userFound=null;
        }else{
            const found = data.Items.find((element: any)=> element.email === auth0searchUser.email);
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


    const [showDetails, setShowDetails] = useState("")
    const [dateSelected, setDateSelected] = useState<string|undefined>("")

    if(props.userFound !== null){

        const membreInformation = props.userFound;
        let tableauFichiers:any=[];

    membreInformation.fichier.forEach((element:any)=>{
    const dateNewFormat = format(new Date(element.date),"dd-MM-yyyy");
    if(tableauFichiers[dateNewFormat]){
        if(element.categorie === "Videos"){
            tableauFichiers[dateNewFormat].videos = [...tableauFichiers[dateNewFormat].videos,{
                titre: element.titre,
                lien: element.lien
            }]
        }else if(element.categorie === "Audios"){
            tableauFichiers[dateNewFormat].audios = [...tableauFichiers[dateNewFormat].audios,{
                titre: element.titre,
                lien: element.lien
            }]
        }else{
            tableauFichiers[dateNewFormat].fiche = [...tableauFichiers[dateNewFormat].fiche,{
                titre: element.titre,
                lien: element.lien
            }]
        }
    }else{
        if(element.categorie === "Videos"){
            tableauFichiers[dateNewFormat] = {
                videos:[{
                    titre: element.titre,
                    lien: element.lien
                }],
                audios:[],
                fiche:[]
            }
        }else if(element.categorie === "Audios"){
            tableauFichiers[dateNewFormat] = {
                audios:[{
                    titre: element.titre,
                    lien: element.lien
                }],
                videos:[],
                fiche:[]
            }
        }else{
            tableauFichiers[dateNewFormat] = {
                fiche:[{
                    titre: element.titre,
                    lien: element.lien
                }],
                audios:[],
                videos:[]
            }
        }
    }
    });

        const itemsReturn = [];
        for (const [key] of Object.entries(tableauFichiers)) {
            itemsReturn.push({
                title: key
            })
        }

    return (
        <Layout>
            <div className="container">
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
                                image={membreInformation.photo}
                            />
                            <CardContent className="texteCards">
                                <Typography gutterBottom style={{color:"black",textAlign:"left"}}>
                                    {membreInformation.nom}
                                </Typography>
                                <Typography>
                                    {membreInformation.prenom}
                                </Typography>
                                <Typography>
                                    {membreInformation.ville}
                                </Typography>
                                <Typography>
                                    {membreInformation.codePostal}
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
                    <div style={{ width: "100%", height: "150px", color:"black"}}>
                        <div style={{padding:"30px", alignItems:"center"}}>
                        <Chrono mode="HORIZONTAL" items={itemsReturn}  cardLess={true} activeItemIndex={0} onItemSelected={(event)=>setDateSelected(event.title)}/>
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
                            {(showDetails === "Videos" && dateSelected!== undefined) && tableauFichiers[dateSelected].videos?.map((video: any)=>{
                                return(<Card style={{marginBottom:"10px"}}>
                                    <CardContent>
                                        <div style={{display:"flex",flexDirection:"row"}}>
                                            <h2>{video.titre}</h2>
                                            <p>{video.lien}</p>
                                        </div>
                                    </CardContent>
                                </Card>)
                            })}
                            {(showDetails === "Audios" && dateSelected!== undefined) && tableauFichiers[dateSelected].audios?.map((audio: any)=>{
                                return(<Card style={{marginBottom:"10px"}}>
                                    <CardContent>
                                        <div style={{display:"flex",flexDirection:"row"}}>
                                            <h2>{audio.titre}</h2>
                                            <p>{audio.lien}</p>
                                        </div>
                                    </CardContent>
                                </Card>)
                            })}
                            {(showDetails === "Fiches" && dateSelected!== undefined) && tableauFichiers[dateSelected].fiches?.map((fiche: any)=>{
                                return(<Card style={{marginBottom:"10px"}}>
                                    <CardContent>
                                        <div style={{display:"flex",flexDirection:"row"}}>
                                            <h2>{fiche.titre}</h2>
                                            <p>{fiche.lien}</p>
                                        </div>
                                    </CardContent>
                                </Card>)
                            })}
                        </Container>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        </Layout>
    )}else{
        return(<>Vos accès ne sont pas encore crées</>)
    }
}
