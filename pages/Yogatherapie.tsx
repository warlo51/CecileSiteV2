import Layout from "../component/Layout";
import Image from "next/image";
import CardImageGauche from "../component/CardImageGauche";
import CardTexte from "../component/CardTexte";
import CardTroisImages from "../component/CardTroisImages";
import Link from "next/link";
import {Button} from "react-bootstrap";
import CardImageDroite from "../component/CardImageDroite";
import Bloc1 from "../component/Bloc1";
import PopUp from "../component/PopUp";
import {useState} from "react";
import PopUpAccompagnement from "../component/PopUpAccompagnement";
import Modal from "react-bootstrap/Modal";

export default function Yogatherapie() {
    const [PopUpDeroulementSeance, setPopUpDeroulementSeance] = useState(false);
    const [PopUpSeanceGroupe, setPopUpSeanceGroupe] = useState(false);
    const [PopUpSeanceStructure, setPopUpSeanceStructure] = useState(false);

    return (
        <Layout>
            <div className="container">
                <div className={"yogaTherapieIntro"} style={{textAlign:"center", marginTop:"50px"}}>
                    <h1 style={{marginBottom:"20px"}}>Accompagnements en Yogathérapie</h1>
                    <p>La yogathérapie est <span className={"boldTexte"}>l’utilisation des outils du yoga</span> dans le <span className={"boldTexte"}>domaine de la santé.</span> Elle est utilisée
                        aussi bien pour prévenir que pour accompagner des personnes souffrant de problème de santé,
                        et ce <span className={"boldTexte"}>en complément de la médecine traditionnelle</span>.
                        Elle utilise les postures, la respiration, la relaxation et de nombreux autres outils, pour venir
                        apporter <span className={"boldTexte"}>de la fluidité dans le corps</span>, là où peuvent se loger tensions et émotions.
                        C’est un accompagnement holistique qui prodigue également <span className={"boldTexte"}>des conseils de vie</span> en s’appuyant
                        sur l’alimentation, l’hygiène des rythmes et l’utilisation de plantes (phytothérapie).
                        Elle vise à <span className={"boldTexte"}>transmettre des outils simples et adaptés</span> pour permettre à la personne de
                        <span className={"boldTexte"}>développer ses propres ressources au quotidien</span>.</p>
                </div>
                <div id={"horizontalBar"} style={{width:"80%"}}/>
                <div className="CardsYoga">
                    <CardImageDroite
                        image={"/Schema.svg"}
                        tailleImage={"200px"}
                        titre={<h2>Comment fonctionne la Yogathérapie ?</h2>}
                        texte={<p>
                            <span>Elle permet de faire le lien entre nos pensées, nos émotions et notre corps et de ce fait elle
permet un mieux être globale.</span>
                        </p>}/>
                    <CardImageGauche
                        image={"/Yogatherapie.png"}
                        tailleImage={"200px"}
                        titre={<h2>Pour qui ?</h2>}
                        texte={<p>
                            <span>La yogathérapie est destiné à toutes personnes désireuses de mieux se sentir dans son corps !</span><br />
                            <span>Une pratique du antérieur du yoga n’est pas nécessaire.</span><br />
                            <span>J’accompagne des personnes du jeunes adolescent jusqu’à la personne âgée</span>
                        </p>}/>
                    <CardImageDroite
                        image={"/YogathérapiePhoto1.png"}
                        tailleImage={"200px"}
                        titre={<h2>Les indications :</h2>}
                        texte={<p>Elles sont nombreuses et variés, la yogathérapie s’utilise aussi bien pour prévenir
                            des problèmes de santé que pour accompagner certains troubles déjà installé. Voici quelques
                            exemple d’indication : Maladies auto-immune (polyarthrite rhumatoïde, spondylarthrite
                            ankylosante...), Maladies respiratoires (asthme...), maladies cardiovasculaire (hypertension),
                            maladies neurologiques (migraines, parkinson...)</p>}
                        commentaires={<h2>
                            J&apos;interviens en complément de la médecine conventionnelle je ne me substitue pas
                            à un suivie psychologique ou médicale
                        </h2>}/>

                    <div className="BlocLiens">
                        <div className="TitreBlocLiens"><h1 style={{textAlign:"center"}}>Les types d'accompagnements</h1></div>
                        <div className="BlocTypeAccompagnements">
                            <div className="blocPrestations" onClick={() => setPopUpDeroulementSeance(true)}>
                                <Bloc1 titre={<h2 style={{color:"#ee9251"}}>Séance Individuelle</h2>} name={""} image={"/Yogatherapie.png"} />
                            </div>
                            <div className="blocPrestations" onClick={() => setPopUpSeanceGroupe(true)}>
                                <Bloc1 titre={<h2 style={{color:"#458a83"}}>Séance De Groupe</h2>} name={""} image={"/Boiteaoutil.png"}/>
                            </div>
                            <div className="blocPrestations" onClick={() => setPopUpSeanceStructure(true)}>
                                <Bloc1 titre={<h2 style={{color:"#a2415e"}}>Séance En Structure De Soin</h2>} name={""} image={"/Massages.png"}/>
                            </div>
                        </div>
                        <Modal
                            show={PopUpDeroulementSeance}
                            onHide={() => setPopUpDeroulementSeance(false)}
                            dialogClassName="modal-90w"
                            aria-labelledby="example-custom-modal-styling-title"
                        >
                            <PopUpAccompagnement titrePrincipal={"Déroulement des séances individuelles"}
                                                 premierTitre={"La 1ère seance : Le bilan :"}
                                                 premierContenu={<p>
                                                     C’est votre première séance, elle dure environ 1h30. Lors de cette séance j’apprends à vous
                                                     connaitre, je reprends avec vos problème de santé et vos habitudes de vie pour déterminer des
                                                     objectifs pour votre accompagnement.<br/>
                                                     La séance se poursuit par la mise en pratique d’exercices de quelques exercices de bases.
                                                     Puis nous terminons sur un récapitulalif de ce qui a été travaillé avec des recommandations à
                                                     suivre jusqu’à la séance suivante, afin que vous puissiez débutés une pratique autonome.<br/>
                                                 </p>}
                                                 deuxiemeTitre={"Les séances de suivie :"}
                                                 deuxiemeContenu={<p>
                                                     Nous commençons par prendre un temps pour évaluer vos ressentis et
                                                     votre pratique depuis notre dernière rencontre puis nous passons par la mise en pratique
                                                     intégrant de nouveaux exercices. Les séances se terminent toujours par l’explication des
                                                     recommandations.<br/><br/>
                                                     Après chaque séance vous aurez accès à une fiche de recommandation de pratique ainsi qu’à
                                                     des audios pour vous accompagner dans votre pratique quotidienne.<br/><br/>
                                                     A chaque fin de séance une fiche explicative ainsi que des audios vont sont transmis afin de
                                                     faciliter votre pratique autonome dans votre quotidien.<br/><br/>
                                                     Je me déplace à domicile dans un rayon de 15km autour de Donnery (45450).
                                                     Les séances peuvent également se faire en ligne, il vous suffit de me le notifier lors de votre
                                                     réservation.
                                                 </p>}
                            />
                        </Modal>
                        <Modal
                            show={PopUpSeanceGroupe}
                            onHide={() => setPopUpSeanceGroupe(false)}
                            dialogClassName="modal-90w"
                            aria-labelledby="example-custom-modal-styling-title"
                        >
                            <PopUpAccompagnement titrePrincipal={"Séances de groupe"}
                                                 premierTitre={""}
                                                 premierContenu={<p>Je prévois d’organiser <span className='boldTexte'>des séances de yogathérapie en petit groupe </span> (entre 5 et 10 personnes) <br/><br/>
                                                     Les séances se dérouleraient en ligne, sur <span className='boldTexte'>des thématiques spécifiques</span> (par exemple : gestion
                                                     de l’anxiété, douleur des épaules, douleur pré-menstruel etc...)<br/><br/>
                                                     Si vous êtes intéressé pour y participer, <span className='boldTexte'>vous pouvez me contacter</span> via le formulaire « contact »,
                                                     ou par mail ou téléphone. Merci de m’indiquer dans votre message : votre nom, votremail ainsi
                                                     que la thématique qui vous intéresserais (si vous en avez une en tête) et ceux afin que je puisse
                                                     vous informer de l’avancé du projet !<br/><br/>
                                                     Si vous disposez d’un lieu dans le Loiret (45) a louer pour organiser ces séances, vous pouvez
                                                     également me contacter !</p>}
                                                 deuxiemeTitre={""}
                                                 deuxiemeContenu={""}
                            />
                        </Modal>
                        <Modal
                            show={PopUpSeanceStructure}
                            onHide={() => setPopUpSeanceStructure(false)}
                            dialogClassName="modal-90w"
                            aria-labelledby="example-custom-modal-styling-title"
                        >
                            <PopUpAccompagnement titrePrincipal={"Séance en structure de santé"}
                                                 premierTitre={""}
                                                 premierContenu={<p>
                                                     Je propose des accompagnements en yogathérapie au sein de structure de soins tel que des
                                                     EHPAD, SSR, DITEP... Le but étant que les personnes qui en ont le plus besoins puissent
                                                     bénéficier des nombreux bienfaits de la yogathérapie.<br/><br/>
                                                     La yogathérapie ne se substitut pas à un traitement conventionnel mais elle est complémentaire
                                                     et elle <span className='boldTexte'>s’intègre au réseau de soin.</span><br/><br/>
                                                     L’accompagnement peut être fait en individuel en chambre directement au lit du patient, ou en
                                                     petit groupe (Max 8 personnes) autour de thématiques spécifiques (par exemple : gestion de la
                                                     douleur sciatique, mieux dormir...).<br/><br/>
                                                     Voici le étapes de déroulement d’une séance type :<br/>
                                                     - Temps d’échange avec recueil de la/des problématiques et détermination d’objectif(s)<br/>
                                                     - Explication sur le déroulé de la séance<br/>
                                                     - Temps de pratique (au lit, en fauteuil, debout ou sur un tapis), qui se termine par une méditation
                                                     ou relaxation.<br/>
                                                     - Transmission des recommandations jusqu’à la séance suivante avec supports si nécessaire.<br/><br/>
                                                     Les tarifs de ces prestations sont réalisés sur <span className='boldTexte'>devis</span>, sachez toutefois que les institutions peuvent
                                                     bénéficier de subventions de l’ARS (Agence Régionale de Santé) pour financer ces interventions.<br/><br/>
                                                     Si vous souhaitez avoir plus de détails sur l’accompagnement en structure, contactez-moi et je
                                                     serais ravis de vous envoyer ma <span className='boldTexte'>brochure</span> pour les établissements de santé.
                                                 </p>}
                                                 deuxiemeTitre={""}
                                                 deuxiemeContenu={""}
                            />
                        </Modal>
                        <br/>
                    </div>

                    <CardTroisImages premiereImage={"/YogathérapiePhoto1.png"} deuxiemeImage={"/YogathérapiePhoto2.png"} troisiemeImage={"/YogathérapiePhoto3.png"} />
                </div>
                <div className="Separateur1" style={{textAlign:"center"}}>
                    <Image alt="" src={"/SeparationBarre.png"} className={"Separateur1"} width={300} height={150}/>
                </div>
            </div>
        </Layout>

    )
}
