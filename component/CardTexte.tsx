import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from "react";

export default function CardTexte(props: any) {
    const [texte, setTexte] = useState()
    const [titre, setTitre] = useState()

    useEffect(()=>{
        setTexte(props.texte)
        setTitre(props.titre)
    },[])
    return (
        <div  className="CardContent" >
            <div className="texteCardsBis">
                <div style={{color:"gray",textAlign:"left"}}>
                    {titre}
                </div>
                <div color="text.secondary">
                    {texte}
                </div>
            </div>
        </div>
    );
}
