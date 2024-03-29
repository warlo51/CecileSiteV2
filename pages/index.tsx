
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
                <div id={"horizontalBar"}>

                </div>
            </div>
            <div className="BlocLiens">
                <div className="TitreBlocLiens"><h1 style={{textAlign:"center"}}>Mes prestations</h1></div>
                <div className="BlocInformationLien">
                    <div className="blocPrestations">
                        <Bloc1 link={"/Yogatherapie"} titre={<h2 style={{color:"#ee9251"}}>Yogathérapie</h2>}  image={"/Yogatherapie.png"} name={"Yogatherapie"}/>
                    </div>
                    <div className="blocPrestations">
                        <Bloc1 link={"/boiteaoutils"} titre={<h2 style={{color:"#458a83"}}>Boite à outils</h2>} image={"/Boiteaoutil.png"} name={"Boiteaoutil"}/>
                    </div>
                    <div className="blocPrestations">
                        <Bloc1 link={"/Massages"} titre={<h2 style={{color:"#a2415e"}}>Massages Ayurvédiques</h2>}  image={"/Massages.png"} name={"Massages"} />
                    </div>
                </div>
                <br/>
                {PopUpShow === true ? <PopUp show={true} /> : <PopUp show={false} />}
            </div>
            <div className="BlocActus">
                <div className="TitreBlocActus"><h1 style={{textAlign:"center"}}>Les dernières actualités</h1></div>
                <div className="BlocInformationActu">
                    {listeArticles?.map((article: any, index: number)=>{
                        if(index <3){
                            return(<div key={index} className="BlocActualite">
                                <Link
                                    href={{
                                        pathname: "/ArticleDetails",
                                        query: { titre: article.titre, texte:JSON.stringify(article.texte), image:urlFor(article.image).url() },
                                    }}
                                >
                                    <Bloc1 titre={<h2>{article.titre}</h2>} image={article.image} name={"Article"}/>
                                </Link>
                            </div>)
                        }
                    })}
                </div>
                <div id={"horizontalBar"}></div>
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
            </div>
        </Layout>
    )
}
