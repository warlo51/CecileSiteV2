import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from "react";
import {PortableText} from "@portabletext/react";
import {urlFor} from "../src/utils/function";
import Link from "next/link";
import Image from "next/image";

export default function Bloc1(props: any) {

    const [texte, setTexte] = useState()
    const [titre, setTitre] = useState()
    const [name, setName] = useState()
    const [link, setLink] = useState()

    useEffect(()=>{
        setTexte(props.texte)
        setTitre(props.titre)
        setName(props.name)
        setLink(props.link)
    },[])
    return (
        <Card  className={"Bloc1"} >
            {link ? <Link href={`${link}`}><CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={props.image}
            /></Link> : <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={props.image}
            />}
            <CardContent>
                {link ? <Link href={`${link}`}>{titre}</Link> : titre}
                {name === "Yogatherapie" || name === "Massages" ? <div style={{marginBottom:"10px"}}>
                    <Link href={"https://www.celeste-community.com/places/cecile-fabie/"} target={"_blank"}><Image alt="" src={"/Bouton_rdv_site.svg"} width={100} height={100}/></Link>
                </div> : <></>}

            </CardContent>
        </Card>
    );
}
