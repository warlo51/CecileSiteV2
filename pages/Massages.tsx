import Layout from "../component/Layout";
import Image from "next/image";
import CardImageGauche from "../component/CardImageGauche";
import CardTexte from "../component/CardTexte";
import CardTroisImages from "../component/CardTroisImages";
import {Button} from "react-bootstrap";
import Link from "next/link";

export default function Massages() {
    return (
        <Layout>
            <div className="container">
                <div className={"messageIntro"} style={{textAlign:"center", marginTop:"50px"}}>
                    <h1 style={{marginBottom:"20px"}}>Massages Ayurvédiques</h1>
                    <p>Les massages ayurvédiques sont des massages traditionnels indiens, effectués avec une huile tiédit. Ces massages sont adaptés à votre constitution, l&apos;`huile utilisés, la durée du massage et son intensité
                    variera en fonction de vos besoins du moments. Nous déterminerons cela ensemble lors de notre rencontre grâce à un questionnaire.</p>
                </div>
                <div className="Separateur1" style={{textAlign:"center"}}>
                    <Image alt="" src={"/SeparationBarre.png"} className={"Separateur1"} width={300} height={150}/>
                </div>
                <div className="Cards">
                    <CardImageGauche
                        image={"/MassagePremierePhoto.png"}
                        tailleImage={"200px"}
                        titre={<h2>Les bénéfices des massages</h2>}
                        texte={<p>
                            <span>Relaxation du corps et de l&apos;esprit</span><br />
                            <span>Elimination des toxines</span><br />
                            <span>Prévention des signes de vieillissement</span><br />
                            <span>Amélioration de la circulation</span><br />
                            <span>Amélioration du sommeil</span>
                        </p>}/>
                    <CardTexte titre={<h2>Les types de massages :</h2>}
                               texte={<p>
                                   <span>Mukabhyanga : Massages du visages, durée environs 30min</span><br />
                                   <span>Shiroabhyanga : Massages tête/épaule, durée environs 30min</span><br />
                                   <span>Abhyanga : Massages du corps entier, durée environs 60min</span><br />
                               </p>} />
                    <CardImageGauche
                        image={"/MassageDeuxiemePhoto.png"}
                        tailleImage={"200px"}
                        titre={<h2>Les contre-indications</h2>}
                        texte={<p>
                            <span>Fièvre</span><br />
                            <span>Syndrome grippal</span><br />
                            <span>Rhume</span><br />
                            <span>Inflammation de la peau</span><br />
                            <span>Eviter la période après digestion (2h après un repas)</span><br />
                        </p>}
                        commentaires={<><h2>
                            Les massages se déroule à votre domicile, je me déplace dans un rayon de 15km autour de Donnery (45450).
                            Je me déplace avec tout le matériel nécessaire.
                        </h2><br />
                            <h2>Les massages sont exclusivement féminins.</h2></>}/>

                    <CardTroisImages premiereImage={"/MassageTroisiemePhoto.png"} deuxiemeImage={"/MassageQuatriemePhoto.png"} troisiemeImage={"/MassageCinquiemePhoto.png"} />
                </div>
                <div className="Separateur1" style={{textAlign:"center"}}>
                    <Image alt="" src={"/SeparationBarre.png"} className={"Separateur1"} width={300} height={150}/>
                </div>
                <div style={{marginBottom:"50px"}}>
                    <Link href={"https://www.celeste-community.com/places/cecile-fabie/"} target={"_blank"}><Button style={{backgroundColor:"#a2415e", color:"white",borderRadius:"40px", border:"none"}}>Prise de RDV</Button></Link>
                </div>
            </div>
        </Layout>

    )
}
