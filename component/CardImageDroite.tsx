import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from "react";

export default function CardImageDroite(props: any) {

    const [texte, setTexte] = useState()
    const [titre, setTitre] = useState()
    const image = props.image;
    const tailleImage = props.tailleImage;

    useEffect(()=>{
        setTexte(props.texte)
        setTitre(props.titre)
    },[])

    return (
        <Card className="CardContent" style={{display:"flex",flexDirection:"row-reverse"}} >
            <CardMedia
                component="img"
                alt=""
                height={tailleImage}
                width={tailleImage}
                image={image}
                className="imageCard"
            />
            <CardContent>
                <Typography gutterBottom style={{color:"gray",textAlign:"center"}}>
                    {titre}
                </Typography>
                <Typography color="text.secondary">
                    {texte}
                </Typography>
            </CardContent>
        </Card>
    );
}
