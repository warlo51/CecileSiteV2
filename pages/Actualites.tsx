import Layout from "../component/Layout";
import CardImageArticleDroite from "../component/CardImageArticleDroite";
import CardImageArticleGauche from "../component/CardImageArticleGauche";
import Image from "next/image";
import {client} from "./../src/database/sanity"

export async function getServerSideProps(context: any) {
    const listeArticles = await client.fetch(`*[_type == "articles"]`);

    return {
        props: {
            listeArticles
        }
    };
}

export default function Actualites({listeArticles}:any) {

    return (
        <Layout>
            <div className="container">
                <br/>
                <br/>
                {listeArticles?.map((article: any, index: number)=>{
                    if(index%2 == 0){
                        return(
                            <div key={index}>
                                <CardImageArticleGauche titre={article.titre} phrase={article.phrase}  texte={article.texte} image={article.image}/>
                                <div className="Separateur1" style={{textAlign:"center"}}>
                                    <Image alt="" src={"/SeparationBarre.png"} width={300} height={150}/>
                                </div>
                            </div>

                        )
                    }else{
                        return(
                            <div key={index}>
                                <CardImageArticleDroite  titre={article.titre} phrase={article.phrase}  texte={article.texte} image={article.image}/>
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
