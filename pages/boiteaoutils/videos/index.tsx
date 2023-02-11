
import Link from "next/link";
import Layout from "../../../component/Layout";
import CardImageGaucheBAO from "../../../component/CardImageGaucheBAO";
import {client} from "../../../src/database/sanity";
import {urlFor} from "../../../src/utils/function";

export async function getServerSideProps(context: any) {
    const listeProduitsVideos = await client.fetch(`*[_type == "produits" && categorie == "videos"]{
    ...,
    "fichier": fichier.asset->url
    }`);
    return {
        props: {
            listeProduitsVideos
        }
    };
}

export default function index({listeProduitsVideos}:any) {

    return (
        <Layout>
            <div className="container">
                <br/>
                <Link href={"/boiteaoutils"}><button style={{backgroundColor:"#a2415e",color:"white",border:"none",borderRadius:"10px"}}>Retour</button></Link>
                <div style={{textAlign:"center", marginTop:"50px"}}>
                    <h1 style={{marginBottom:"20px"}}>Les outils videos</h1>
                </div>
                {listeProduitsVideos.length !== 0 && listeProduitsVideos.map((produit:any)=> {
                    if(produit.gratuit === "Oui"){
                        return(<CardImageGaucheBAO
                            image={urlFor(produit.image).url()}
                            tailleImage={40}
                            fichier={produit.fichier}
                            texte={produit.texte}
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
