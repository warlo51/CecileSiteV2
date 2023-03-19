import Layout from "../component/Layout";
import Image from "next/image";
import CardImageGauche from "../component/CardImageGauche";
import CardTexte from "../component/CardTexte";
import CardTroisImages from "../component/CardTroisImages";
import {Button} from "react-bootstrap";
import Link from "next/link";
import Bloc1 from "../component/Bloc1";
import Modal from "react-bootstrap/Modal";
import PopUpAccompagnement from "../component/PopUpAccompagnement";
import {useState} from "react";

export default function Massages() {
    const [PopUpAbhyanga, setPopUpAbhyanga] = useState(false);
    const [PopUpShiro, setPopUpShiro] = useState(false);
    const [PopUpMukabhyanga, setPopUpMukabhyanga] = useState(false);
    return (
        <Layout>
            <div className="container">
                <div className={"messageIntro"} style={{textAlign:"center", marginTop:"50px"}}>
                    <h1 style={{marginBottom:"20px"}}>Massages Ayurvédiques</h1>
                    <p>Les massages ayurvédiques sont des massages traditionnels indiens, effectués avec une huile tiédit. Ces massages sont adaptés à votre constitution. L&apos;`huile utilisés, la durée du massage et son intensité
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
                        texte={<ul>
                            <li>Relaxation du corps et de l&apos;esprit</li><br />
                            <li>Elimination des toxines</li><br />
                            <li>Prévention des signes de vieillissement</li><br />
                            <li>Amélioration de la circulation</li><br />
                            <li>Amélioration du sommeil</li>
                        </ul>}/>
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
                            Ils n’est pas recommandé de venir vous faire masser si vous présenter les symptômes suivants :<br/><br/>
                            <ul>
                                <li>Fièvre</li><br />
                                <li>Syndrome grippal</li><br />
                                <li>Rhume</li><br />
                                <li>Inflammation de la peau</li><br />
                                <li>Eviter la période après digestion (2h après un repas)</li><br />
                            </ul>

                        </p>}
                        commentaires={<><h2>
                            Les massages se déroule à votre domicile, je me déplace dans un rayon de 15km autour de Donnery (45450).
                            Je me déplace avec tout le matériel nécessaire.
                        </h2><br />
                            <h2>Les massages sont exclusivement féminins.</h2></>}/>

                    <div className="BlocLiens">
                        <div className="TitreBlocLiens"><h1 style={{textAlign:"center"}}>Les types de massages</h1></div>
                        <h2>Je vous propose 3 types de massages différents, que vous pouvez combiner selon vos désir.</h2>
                        <div className="BlocTypeAccompagnements">
                            <div className="blocPrestations" onClick={() => setPopUpAbhyanga(true)}>
                                <Bloc1 titre={<h2 style={{color:"#ee9251"}}>Abhyanga</h2>} name={""} image={"/Yogatherapie.png"} />
                            </div>
                            <div className="blocPrestations" onClick={() => setPopUpShiro(true)}>
                                <Bloc1 titre={<h2 style={{color:"#458a83"}}>Shiro abhyanga</h2>} name={""} image={"/Boiteaoutil.png"}/>
                            </div>
                            <div className="blocPrestations" onClick={() => setPopUpMukabhyanga(true)}>
                                <Bloc1 titre={<h2 style={{color:"#a2415e"}}>Mukabhyanga</h2>} name={""} image={"/Massages.png"}/>
                            </div>
                        </div>
                        <Modal
                            show={PopUpAbhyanga}
                            onHide={() => setPopUpAbhyanga(false)}
                            dialogClassName="modal-90w"
                            aria-labelledby="example-custom-modal-styling-title"
                        >
                            <PopUpAccompagnement titrePrincipal={"Abhyanga"}
                                                 premierTitre={""}
                                                 premierContenu={<p>
                                                     C’est un massage de tout le corps, qui peut être à la fois dynamisant et relaxant selon
                                                     votre besoin. Il va permettre d’améliorer la circulation, de détendre l’ensemble du corps et de ce
                                                     fait relaxer votre. mental. Lors de ce massage on masse pendant 30min la face postérieur du
                                                     corps puis la face antérieur de la même manière.<br/>
                                                 </p>}
                                                 deuxiemeTitre={""}
                                                 deuxiemeContenu={""}
                            />
                        </Modal>
                        <Modal
                            show={PopUpShiro}
                            onHide={() => setPopUpShiro(false)}
                            dialogClassName="modal-90w"
                            aria-labelledby="example-custom-modal-styling-title"
                        >
                            <PopUpAccompagnement titrePrincipal={"Shiro abhyanga"}
                                                 premierTitre={""}
                                                 premierContenu={<p>C’est un massage du haut du dos, des épaules et du cuir chevelu. Ce soin à
                                                     pour but d’apaiser le mental et les tensions dû au stress qui s’accumulent dans le haut du corps.</p>}
                                                 deuxiemeTitre={""}
                                                 deuxiemeContenu={""}
                            />
                        </Modal>
                        <Modal
                            show={PopUpMukabhyanga}
                            onHide={() => setPopUpMukabhyanga(false)}
                            dialogClassName="modal-90w"
                            aria-labelledby="example-custom-modal-styling-title"
                        >
                            <PopUpAccompagnement titrePrincipal={"Mukabhyanga"}
                                                 premierTitre={""}
                                                 premierContenu={<p>
                                                     C’est un massage du visage. Il permet d’améliorer la micro circulation et atténue
                                                     les signes de vieillissement, il redonne de l’éclats au visage en venant chasser les signes de
                                                     fatigue.</p>}
                                                 deuxiemeTitre={""}
                                                 deuxiemeContenu={""}
                            />
                        </Modal>
                        <br/>
                    </div>
                    <CardTroisImages premiereImage={"/MassageTroisiemePhoto.png"} deuxiemeImage={"/MassageQuatriemePhoto.png"} troisiemeImage={"/MassageCinquiemePhoto.png"} />
                </div>
                <div className="Separateur1" style={{textAlign:"center"}}>
                    <Image alt="" src={"/SeparationBarre.png"} className={"Separateur1"} width={300} height={150}/>
                </div>
            </div>
        </Layout>

    )
}
