import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from "react";
import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
);

export default function CardImageGaucheBAO(props: any) {
    const [montant, setMontant] = useState()
    const [commentaires, setCommentaire] = useState()
    const [titre, setTitre] = useState()
    const [texte, setTexte] = useState()
    const [fichier, setFichier] = useState()
    const [gratuit, setGratuit] = useState()
    const [priceCode, setPriceCode] = useState()
    const image = props.image;
    const tailleImage = props.tailleImage;

    React.useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            console.log('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);

    useEffect(()=>{
        setMontant(props.montant)
        setCommentaire(props.commentaires)
        setTitre(props.titre)
        setTexte(props.texte)
        setGratuit(props.gratuit)
        setFichier(props.fichier)
        setPriceCode(props.priceCode)

    },[])
    return (
        <form action={`/api/achats/checkout_sessions?priceCode=${priceCode}`} method="POST">
        <Card  className="CardContent" >
            <div className={"cardBaoInterieur"}>
                {image !== "" && <CardMedia
                    className="imageCardBOA"
                    component="img"
                    alt=""
                    height={tailleImage}
                    width={tailleImage}
                    image={image}
                />}
                <CardContent className="texteCardsBAO">
                    <p  style={{color:"gray",textAlign:"left",marginLeft:"30px", marginRight:"100px"}}>
                        {titre}
                    </p>
                    <p  style={{color:"gray",textAlign:"left",marginLeft:"30px", marginRight:"100px"}}>
                        {texte}
                    </p>
                    <p style={{display:"flex",flexDirection:"column"}}>
                        {montant}
                        {gratuit === true ?
                            <Button style={{backgroundColor:"#a2415e",color:"white", borderRadius:"40px"}}><a href={fichier} target={"_blank"}download={titre} >Telécharger</a></Button>
                            :
                            <button style={{backgroundColor:"#a2415e",color:"white", borderRadius:"40px"}} type={"submit"}>Telécharger</button>}
                    </p>
                </CardContent>
            </div>
            {commentaires !== undefined && <div>
                <CardContent>
                    <p  style={{color:"gray",textAlign:"center", fontWeight:"bold", marginTop:"30px"}}>
                        {commentaires}
                    </p>
                </CardContent>
            </div>}
        </Card>   </form>
    );
}
