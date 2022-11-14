import Layout from "../../../component/Layout";
import CardImageGauche from "../../../component/CardImageGauche";
import CardImageGaucheBAO from "../../../component/CardImageGaucheBAO";
import Link from "next/link";

export default function index() {
    return (
        <Layout>
            <div className="container">
                <br/>
                <Link href={"/boiteaoutils"}><button style={{backgroundColor:"#a2415e",color:"white",border:"none",borderRadius:"10px"}}>Retour</button></Link>
                <div style={{textAlign:"center", marginTop:"50px"}}>
                    <h1 style={{marginBottom:"20px"}}>Les outils numériques</h1>
                </div>
                <CardImageGaucheBAO
                    image={"/YogatherapiePremierImage.png"}
                    tailleImage={50}
                    titre={<h2>Nom de l'outil</h2>}
                    montant={<h2>Montant : 0 €</h2>}/>
                <CardImageGaucheBAO
                    image={"/YogatherapiePremierImage.png"}
                    tailleImage={50}
                    titre={<h2>Nom de l'outil</h2>}
                    montant={<h2>Montant : 0 €</h2>}/>
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
