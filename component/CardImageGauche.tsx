import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from "react";

export default function CardImageGauche(props: any) {

    const [texte, setTexte] = useState()
    const [commentaires, setCommentaire] = useState()
    const [titre, setTitre] = useState()
    const image = props.image;
    const tailleImage = props.tailleImage;


    useEffect(()=>{
        setTexte(props.texte)
        setCommentaire(props.commentaires)
        setTitre(props.titre)
    },[])
    return (
        <div  className="CardContent" style={{display:"flex",flexDirection:"column"}} >
            <div className="CardInterieur" style={{display:"flex",flexDirection:"row"}}>
                <CardMedia
                    className="imageCard"
                    component="img"
                    alt=""
                    height={tailleImage}
                    width={tailleImage}
                    image={image}
            />
                <div className="texteCards">
                    <p  style={{color:"gray",textAlign:"left"}}>
                        {titre}
                    </p>
                    <p>
                        {texte}
                    </p>
                </div>
            </div>
            {commentaires !== undefined && <div id={"commentaires"}>
                <div >
                    <span className={"commentaireCard"}>
                        {commentaires}
                    </span>
                </div>
            </div>}

        </div>
    );
}
