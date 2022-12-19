import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from "next/link";
import {PortableText} from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import {client} from "../src/database/sanity";
import {urlFor} from "../src/utils/function";

export default function CardImageArticleGauche(props: any) {

    const texte = props.texte;
    const titre = props.titre;
    const phrase = props.phrase;
    const image = props.image;

    return (
        <Card className="CardContent" style={{display:"flex",flexDirection:"row", backgroundColor:"white", padding:"30px", borderRadius:"40px"}} >
            <CardMedia
                component="img"
                alt=""
                image={urlFor(image).url()}
                className="imageCard"
            />
            <CardContent className={"texteCardGauche"}>
                <Typography gutterBottom style={{color:"gray",textAlign:"center"}}>
                    {titre}
                </Typography>
                <PortableText
                    value={phrase}
                />
                <Link
                    href={{
                        pathname: "/ArticleDetails",
                        query: { titre: titre, texte:JSON.stringify(texte), image:urlFor(image).url() },
                    }}
                >
                    <p style={{color:"black"}}>Voir l'article</p>
                </Link>
            </CardContent>
        </Card>
    );
}
