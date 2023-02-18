import Layout from "../component/Layout";
import Image from "next/image";
import CardImageGauche from "../component/CardImageGauche";
import CardTexte from "../component/CardTexte";
import CardTroisImages from "../component/CardTroisImages";
import Link from "next/link";
import {Button} from "react-bootstrap";

export default function Yogatherapie() {
    return (
        <Layout>
            <div className="container">
                <div style={{textAlign:"center", marginTop:"50px"}}>
                    <h1 style={{marginBottom:"20px"}}>Accompagnements en Yogathérapie</h1>
                    <p>La yogathérapie vise à utiliser les outils du yoga pour prévenir ou traiter des problématiques de santé.
                        Elle utilise les postures, la respiration, la relaxation pour venir apporter de la fluidité dans le corps où
                        se logent des tensions et émotions.
                        Des conseils santé sont prodigués en s&apos;appuyant sur l&apos;alimentation, l&apos;hygiène des rythmes et
                        l&apos;utilisation de plantes (phytothérapie).
                        C&apos;est un <span style={{fontWeight:"bold"}}>accompagnement individualisé et adapté</span> à vos capacités physiques que je vous propose.</p>
                </div>
                <div className="Separateur1" style={{textAlign:"center"}}>
                    <Image alt="" src={"/SeparationBarre.png"} width={300} height={150}/>
                </div>
                <div className="Cards">
                    <CardImageGauche
                        image={"/YogatherapiePremierImage.png"}
                        tailleImage={"200px"}
                        titre={<h2>Pourquoi la Yogathérapie ?</h2>}
                        texte={<p>
                            <span>Pour dénouer les tensions du corps</span><br />
                            <span>Pour mieux vivre vos émotions</span><br />
                            <span>Pour développer des pensées plus sereines</span>
                        </p>}/>
                    <CardTexte titre={<h2>Pour qui ?</h2>}
                               texte={<p>
                                   <span>Déstiné à toutes les personnes désireuses de mieux se sentir dans son corps</span><br />
                                   <span>Du jeune adolescent à la personne agée</span><br />
                                   <span style={{fontWeight:"bold"}}>Pas de pratique antérieur nécessaire</span><br />
                                   <span>Les outils sont adaptés et sont toujours les plus simple possible, ils peuvent être pratiqués pour une personne à mobilité réduite, en fauteuil ou lit.</span>
                       </p>} />
                    <CardImageGauche
                        image={"/YogathérapieCoucher.png"}
                        tailleImage={"200px"}
                        titre={<h2>Les indications :</h2>}
                        texte={<p>Douleurs diverses
                        Gestion des émotions, du stress...
                        Troubles du sommeil
                        Maladies auto-immune Maladies respiratoires, cardiovasculaires, neurologiques...</p>}
                        commentaires={<h2>
                            J&apos;interviens en complément de la médecine conventionnelle je ne me substitue pas
                            à un suivie psychologique ou médicale
                            </h2>}/>
                    <CardTexte
                        titre={<h2>Déroulement des séances individuelles</h2>}
                        texte={<p>
                            <span> Séance de Bilan : cette séance dure 1h30.</span><br />
                            <span>Nous reprenons ensemble votre parcours médical et vos habitudes de vie pour déterminer des objectifs.</span><br />
                            <span>Quelques exercices pratiques vous sont présentés pour débuter la pratique en autonomie.</span><br /><br />
                            <span>Séance de Suivie: ces séances dure 1h.</span><br />
                            <span>Nous évaluons vos ressentis depuis la séance précédente puis nous passons à la pratique.</span><br />
                            <span>Les séances se déroule à votre domicile, je me déplace dans un rayon de 1km autour de Donnery(45450).</span><br />
                            <span>La séance de bilan peut se dérouler en ligne.</span>
                            </p>} />

                    <CardTroisImages premiereImage={"/YogathérapiePhoto1.png"} deuxiemeImage={"/YogathérapiePhoto2.png"} troisiemeImage={"/YogathérapiePhoto3.png"} />
                </div>
                <div className="Separateur1" style={{textAlign:"center"}}>
                    <Image alt="" src={"/SeparationBarre.png"} width={300} height={150}/>
                </div>
                <div style={{marginBottom:"50px"}}>
                    <Link href={"https://www.celeste-community.com/places/cecile-fabie/"} target={"_blank"}><Button style={{backgroundColor:"#a2415e", color:"white",borderRadius:"40px", border:"none"}}>Prise de RDV</Button></Link>
                </div>
            </div>
        </Layout>

    )
}
