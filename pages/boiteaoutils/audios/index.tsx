import Layout from "../../../component/Layout";
import CardImageGaucheBAO from "../../../component/CardImageGaucheBAO";
import Link from "next/link";
import {client} from "../../../src/database/sanity";
import {urlFor} from "../../../src/utils/function";

export async function getServerSideProps(context: any) {
    const listeProduitsAudios = await client.fetch(`*[_type == "produits" && categorie == "audios"]{
    ...,
    "fichier": fichier.asset->url
    }`);

    return {
        props: {
            listeProduitsAudios
        }
    };
}

export default function index({listeProduitsAudios}: any) {

    return (
        <Layout>
            <div className="container">
                <br/>
                <Link href={"/boiteaoutils"}><button style={{backgroundColor:"#a2415e",color:"white",border:"none",borderRadius:"10px"}}>Retour</button></Link>
                <div style={{textAlign:"center", marginTop:"50px"}}>
                    <h1 style={{marginBottom:"20px"}}>Les outils audios</h1>
                </div>
                {listeProduitsAudios.length !== 0 && listeProduitsAudios.map((produit:any)=> {
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
