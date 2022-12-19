import Layout from "../../../component/Layout";
import CardImageGauche from "../../../component/CardImageGauche";
import CardImageGaucheBAO from "../../../component/CardImageGaucheBAO";
import Link from "next/link";
import {loadStripe} from "@stripe/stripe-js";
import {useEffect, useState} from "react";
import axios from "axios";
import {client} from "../../../src/database/sanity";
import {urlFor} from "../../../src/utils/function";

export async function getServerSideProps(context: any) {
    const listeProduitsNumeriques = await client.fetch(`*[_type == "produits" && categorie == "outils"]{
    ...,
    "fichier": fichier.asset->url
    }`);

    return {
        props: {
            listeProduitsNumeriques
        }
    };
}

export default function index({listeProduitsNumeriques}: any) {


    return (
        <Layout>
            <div className="container">
                <br/>
                <Link href={"/boiteaoutils"}><button style={{backgroundColor:"#a2415e",color:"white",border:"none",borderRadius:"10px"}}>Retour</button></Link>
                <div style={{textAlign:"center", marginTop:"50px"}}>
                    <h1 style={{marginBottom:"20px"}}>Les outils numériques</h1>
                </div>
                {listeProduitsNumeriques.length !== 0 && listeProduitsNumeriques.map((produit:any)=> {
                    if(produit.gratuit === "Oui"){
                        return(<CardImageGaucheBAO
                            image={urlFor(produit.image).url()}
                            tailleImage={50}
                            fichier={produit.fichier}
                            texte={produit.description}
                            titre={<h2>{produit.titre}</h2>}
                            montant={<h2>Gratuit</h2>}
                            gratuit={true}/>)

                    }else{
                        return(<CardImageGaucheBAO
                            image={urlFor(produit.image).url()}
                            tailleImage={50}
                            fichier={produit.fichier}
                            texte={produit.description}
                            priceCode={produit.priceCode}
                            titre={<h2>{produit.titre}</h2>}
                            montant={<h2>{produit.prix} €</h2>}
                            gratuit={false}/>)
                    }
                })}
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </Layout>

    )
}
