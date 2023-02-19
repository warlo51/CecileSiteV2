
import BlocInformation from "../component/BlocInformation";
import Bloc1 from "../component/Bloc1";
import Image from "next/image";
import Layout from "../component/Layout";
import FormulaireContact from "../component/FormulaireContact";
import {useEffect, useState} from "react";
import PopUp from "../component/PopUp";
import axios from "axios";
import {formatDistance, isBefore} from "date-fns";
import Link from "next/link";
import {client} from "../src/database/sanity";
import {orderArticlePerDate, urlFor} from "../src/utils/function";


export async function getServerSideProps(context: any) {
    const requete = await client.fetch(`*[_type == "articles"]`);
    const listeArticles = orderArticlePerDate(requete.map((article: any)=>{
        return {
            ...article,
            image:urlFor(article.image).url()
        }
    }))

    return {
        props: {
            listeArticles
        }
    };
}

export default function Index({listeArticles}:any) {
const [PopUpShow, setShowPopUp] = useState(false);
const [imagesBottom, setImagesBottom] = useState([])
const [articles, setArticles] = useState([])

    return (
        <Layout>
            <div className="BlocInformation">
                <h2  className="phraseBlocPres" >« Je m&apos;apelle Cécile et j&apos;ai à coeur de vous accompagner vers un mieux être physique, psychique et émotionnel »</h2>
                <div className="Information">
                    <BlocInformation />
                </div>
                <div  style={{textAlign:"center"}}>
                    <Image alt="" src={"/SeparationBarre.png"} className="Separateur1" width={300} height={150}/>
                </div>
            </div>
            <div className="BlocLiens">
                <div className="TitreBlocLiens"><h1 style={{textAlign:"center"}}>Mes prestations</h1></div>
                <div className="BlocInformationLien">
                    <div className="blocPrestations">
                        <Link href={"/Yogatherapie"}><Bloc1 titre={<h2 style={{color:"#ee9251"}}>Yogathérapie</h2>}  image={"/Yogatherapie.png"} texte={<p>Je vous accompagne grâce aux outils du yoga pour la gestions de vos maux.</p>}/></Link>
                    </div>
                    <div className="blocPrestations">
                        <Link href={"/boiteaoutils"}><Bloc1 titre={<h2 style={{color:"#458a83"}}>Boite à outils</h2>} image={"/Boiteaoutil.png"}texte={<p>Retrouvez ici des e-book, vidéos et audios à télécharger.</p>}/></Link>
                    </div>
                    <div className="blocPrestations">
                        <Link href={"/Massages"}><Bloc1 titre={<h2 style={{color:"#a2415e"}}>Massages Ayurvédiques</h2>}  image={"/Massages.png"} texte={<p>Massages à l'huile tiédit a destinations des femmes</p>}/></Link>
                    </div>
                </div>
                <br/>
                {PopUpShow === true ? <PopUp show={true} /> : <PopUp show={false} />}
                <div className="Separateur2" style={{textAlign:"center"}}>
                    <Image alt="" src={"/SeparationBarre.png"} className="Separateur1"  width={300} height={150}/>
                </div>
            </div>
            <div className="BlocActus">
                <div className="TitreBlocActus"><h1 style={{textAlign:"center"}}>Les dernières actualités</h1></div>
                <div className="BlocInformationActu">
                    {listeArticles?.map((article: any, index: number)=>{
                        if(index <3){
                            return(<div key={index} className="BlocActualite">
                                <Bloc1 titre={<h2>{article.titre}</h2>} image={article.image} texte={article.phrase}/>
                            </div>)
                        }
                    })}
                </div>
                <div className="Separateur3" style={{textAlign:"center"}}>
                    <Image alt="" src={"/SeparationBarre.png"} className="Separateur1" width={300} height={150}/>
                </div>
            </div>
            <div className="FormulaireContact">
              <FormulaireContact />
            </div>
            <div className="BlocActus">
                <div className="BlocInformationActu">
                    <img alt="" src={"/54-min.png"}  width={200} height={200} style={{borderRadius: "50%"}}/>
                    <img alt="" src={"/6-min.png"}  width={200} height={200} style={{borderRadius: "50%"}}/>
                    <img  alt="" src={"/11-min.png"}  width={200} height={200} style={{borderRadius: "50%"}}/>
                </div>
                <div className="Separateur3" style={{textAlign:"center"}}>
                    <Image alt="" src={"/SeparationBarre.png"} className="Separateur1" width={300} height={150}/>
                </div>
            </div>
        </Layout>
    )
}
