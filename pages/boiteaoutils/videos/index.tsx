
import Link from "next/link";
import {loadStripe} from "@stripe/stripe-js";
import {useEffect, useState} from "react";
import axios from "axios";
import Layout from "../../../component/Layout";
import CardImageGaucheBAO from "../../../component/CardImageGaucheBAO";

export default function index() {

    const [produits, setProduits] = useState([])
    useEffect(()=>{
        async function loadData(){
            const listeProduits =  await axios.get("/api/data/loadingProduits?categorie=Videos").then((result: any) => result);
            setProduits(listeProduits.data.Items.reverse())
        }
        loadData();
    },[])

    return (
        <Layout>
            <div className="container">
                <br/>
                <Link href={"/boiteaoutils"}><button style={{backgroundColor:"#a2415e",color:"white",border:"none",borderRadius:"10px"}}>Retour</button></Link>
                <div style={{textAlign:"center", marginTop:"50px"}}>
                    <h1 style={{marginBottom:"20px"}}>Les outils videos</h1>
                </div>
                {produits.length !== 0 && produits.map((produit:any)=> {
                    if(produit.prix === "0"){
                        return(<CardImageGaucheBAO
                            image={produit.image}
                            tailleImage={50}
                            fichier={produit.fichier}
                            texte={produit.texte}
                            titre={<h2>{produit.titre}</h2>}
                            montant={<h2>{produit.prix} €</h2>}
                            gratuit={true}/>)

                    }else{
                        return(<CardImageGaucheBAO
                            image={produit.image}
                            tailleImage={50}
                            fichier={produit.fichier}
                            texte={produit.texte}
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
