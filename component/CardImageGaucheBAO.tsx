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
    const [type, setType] = useState()
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
        setType(props.type)
        setPriceCode(props.priceCode)

    },[])
    return (
        <form action={`/api/achats/checkout_sessions?priceCode=${priceCode}`} method="POST">
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
                    <Typography gutterBottom style={{color:"gray",textAlign:"left",marginLeft:"70px", marginRight:"200px"}}>
                        {texte}
                    </Typography>
                    <Typography style={{display:"flex",flexDirection:"column"}}>
                        {montant}
                        {gratuit === true ?
                            type === "fichier" ? <Button style={{backgroundColor:"#a2415e",color:"white", borderRadius:"40px"}}><a href={fichier} target={"_blank"}download={titre} >Telécharger</a></Button> :
                                <Button style={{backgroundColor:"#a2415e",color:"white", borderRadius:"40px"}}><a href={fichier} download={titre} >Telécharger</a></Button>

                            :
                            <button style={{backgroundColor:"#a2415e",color:"white", borderRadius:"40px"}} type={"submit"}>Telécharger</button>}
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
        </Card>   </form>
    );
}
