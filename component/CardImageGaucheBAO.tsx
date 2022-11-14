import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from "react";

export default function CardImageGaucheBAO(props: any) {

    const [montant, setMontant] = useState()
    const [commentaires, setCommentaire] = useState()
    const [titre, setTitre] = useState()
    const image = props.image;
    const tailleImage = props.tailleImage;


    useEffect(()=>{
        setMontant(props.montant)
        setCommentaire(props.commentaires)
        setTitre(props.titre)
    },[])
    return (
        <Card  className="CardContent" style={{display:"flex",flexDirection:"column",width:"1000px"}} >
            <div style={{display:"flex",flexDirection:"row"}}>
                <CardMedia
                    className="imageCardBOA"
                    component="img"
                    alt=""
                    height={tailleImage}
                    width={tailleImage}
                    image={image}
            />
                <CardContent className="texteCardsBAO">
                    <Typography gutterBottom style={{color:"gray",textAlign:"left",marginLeft:"70px", marginRight:"200px"}}>
                        {titre}
                    </Typography>
                    <Typography style={{display:"flex",flexDirection:"column"}}>
                        {montant}
                       <button style={{backgroundColor:"#a2415e",color:"white", borderRadius:"40px"}}>Telécharger</button>
                    </Typography>
                </CardContent>
            </div>
            {commentaires !== "" && <div>
                <CardContent>
                    <Typography gutterBottom style={{color:"gray",textAlign:"center", fontWeight:"bold", marginTop:"30px"}}>
                        {commentaires}
                    </Typography>
                </CardContent>
            </div>}

        </Card>
    );
}
