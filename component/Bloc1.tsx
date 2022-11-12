import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from "react";

export default function Bloc1(props: any) {

    const [texte, setTexte] = useState()
    const [titre, setTitre] = useState()


    useEffect(()=>{
        setTexte(props.texte)
        setTitre(props.titre)
    },[])
    return (
        <Card  style={{borderRadius:"20px", height:"300px"}} >
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={props.image}
            />
            <CardContent>
                <Typography gutterBottom style={{textAlign:"center"}}>
                    {titre}
                </Typography>
                <Typography color="text.secondary">
                    {texte}
                </Typography>
            </CardContent>
        </Card>
    );
}
