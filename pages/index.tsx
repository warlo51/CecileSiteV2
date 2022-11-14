
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

export default function Index() {
const [PopUpShow, setShowPopUp] = useState(false);
const [imagesBottom, setImagesBottom] = useState([])
const [articles, setArticles] = useState([])
    useEffect(()=>{
        async function loadData(){
            const dataImages =  await axios.get("/api/data/loadingData").then((result: any) => result);
            const dataArticles =  await axios.get("/api/data/loadingArticles").then((result: any) => result);

            setImagesBottom(dataImages.data.data)
            setArticles(dataArticles.data.data.reverse())

        }
        loadData();
    },[])
    return (
        <Layout>
            <div className="BlocInformation">
                <h2 style={{textAlign:"center", marginTop:"20px", fontSize:"40px"}}>« Je m&apos;apelle Cécile et j&apos;ai à coeur de vous accompagner vers un mieux être physique, psychique et émotionnel »</h2>
                <div className="Information">
                    <BlocInformation />
                </div>
                <div className="Separateur1" style={{textAlign:"center"}}>
                    <Image alt="" src={"/SeparationBarre.png"} width={300} height={150}/>
                </div>
            </div>
            <div className="BlocLiens">
                <div className="TitreBlocLiens"><h1 style={{textAlign:"center"}}>Mes prestations</h1></div>
                <div className="BlocInformationLien">
                    <div className="blocPrestations">
                        <Bloc1 titre={<h2 style={{color:"#ee9251"}}>Yogathérapie</h2>}  image={"/Yogatherapie.png"} texte={<p>Je vous accompagne grâce aux outils du yoga pour la gestions de vos maux.</p>}/>
                    </div>
                    <div className="blocPrestations">
                        <Link href={"/boiteaoutils"}><Bloc1 titre={<h2 style={{color:"#458a83"}}>Boite à outils</h2>} image={"/Boiteaoutil.png"}texte={<p>Retrouvez ici des e-book, vidéos et audios à télécharger.</p>}/></Link>
                    </div>
                    <div className="blocPrestations">
                        <Bloc1 titre={<h2 style={{color:"#a2415e"}}>Massages Ayurvédiques</h2>}  image={"/Massages.png"} texte={<p>Massages à l'huile tiédit a destinations des femmes</p>}/>
                    </div>
                </div>
                <br/>
                {PopUpShow === true ? <PopUp show={true} /> : <PopUp show={false} />}
                <div className="Separateur2" style={{textAlign:"center"}}>
                    <Image alt="" src={"/SeparationBarre.png"} width={300} height={150}/>
                </div>
            </div>
            <div className="BlocActus">
                <div className="TitreBlocActus"><h1 style={{textAlign:"center"}}>Les dernières actualités</h1></div>
                <div className="BlocInformationActu">
                    {articles?.map((article: any, index)=>{
                        if(index <3){
                            return(<div key={index} className="BlocActualite">
                                <Bloc1 titre={<h2>{article.titre}</h2>} image={article.image} texte={<p>{article.phrase}</p>}/>
                            </div>)
                        }
                    })}
                </div>
                <div className="Separateur3" style={{textAlign:"center"}}>
                    <Image alt="" src={"/SeparationBarre.png"} width={300} height={150}/>
                </div>
            </div>
            <div className="FormulaireContact">
              <FormulaireContact />
            </div>
            <div className="BlocActus">
                <div className="BlocInformationActu">
                    {imagesBottom?.map((imagesAAfficher: any, index) => {
                        return (<img key={index} alt="" src={imagesAAfficher.lien}  width={200} height={200} style={{borderRadius: "50%"}}/>)
                    })}
                </div>
                <div className="Separateur3" style={{textAlign:"center"}}>
                    <Image alt="" src={"/SeparationBarre.png"} width={300} height={150}/>
                </div>
            </div>
        </Layout>
    )
}
