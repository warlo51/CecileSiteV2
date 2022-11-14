import Layout from "../component/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import CardImageArticleDroite from "../component/CardImageArticleDroite";
import CardImageArticleGauche from "../component/CardImageArticleGauche";
import Image from "next/image";

export default function Actualites() {

    const [articles, setArticles] = useState([])
    useEffect(()=>{
        async function loadData(){
            const listeArticles =  await axios.get("/api/data/loadingArticles").then((result: any) => result);

            setArticles(listeArticles.data.data.reverse())
        }
        loadData();
    },[])

    return (
        <Layout>
            <div className="container">
                <br/>
                <br/>
                {articles?.map((article: any, index)=>{
                    if(index%2 == 0){
                        return(
                            <div key={index}>
                                <CardImageArticleGauche titre={article.titre} phrase={<p>{article.phrase}</p>}  texte={article.texte} image={article.image}/>
                                <div className="Separateur1" style={{textAlign:"center"}}>
                                    <Image alt="" src={"/SeparationBarre.png"} width={300} height={150}/>
                                </div>
                            </div>

                        )
                    }else{
                        return(
                            <div key={index}>
                                <CardImageArticleDroite  titre={article.titre} phrase={<p>{article.phrase}</p>}  texte={article.texte} image={article.image}/>
                                <div className="Separateur1" style={{textAlign:"center"}}>
                                    <Image alt="" src={"/SeparationBarre.png"} width={300} height={150}/>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </Layout>
    )
}
