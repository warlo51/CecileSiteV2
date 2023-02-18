import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from "next/link";
import {PortableText} from "@portabletext/react";
import {urlFor} from "../src/utils/function";

export default function CardImageArticleDroite(props: any) {

    const texte = props.texte;
    const titre = props.titre;
    const phrase = props.phrase;
    const image = props.image;

    return (
        <Card className="CardContent" id={"articleCard"} >
            <CardMedia
                component="img"
                alt=""
                image={urlFor(image).url()}
                className="imageCard"
            />
            <CardContent className={"texteCardDroite"}>
                <p style={{color:"gray",textAlign:"center"}}>
                    {titre}
                </p>
                <PortableText
                    value={phrase}
                />
                <Link
                    href={{
                        pathname: "/ArticleDetails",
                        query: { titre: titre, texte:JSON.stringify(texte), image:urlFor(image).url() },
                    }}
                >
                    <p style={{color:"black",textDecoration: "underline"}}>Voir l'article</p>
                </Link>
            </CardContent>
        </Card>
    );
}
