import Layout from "../../component/Layout";
import Bloc1 from "../../component/Bloc1";
import Link from "next/link";


export default function index() {
    return (
        <Layout>
            <div className="container">
                <div style={{textAlign:"center", marginTop:"50px"}}>
                    <h1 style={{marginBottom:"20px"}}>Bienvenue dans la boite à outils !</h1>
                    <p>Ici vous retrouverez différents outils pour vous aider à développer votre bien être en toute autonomie.
                        Retrouvez des outils à télécharger mêlants yogathérapie et des concepts de médecine ayurvédiques pour venir prendre soin de vous.</p>
                </div>
                <div className="Separateur2" style={{textAlign:"center"}}>
                    <img alt="" src={"/SeparationBarre.png"} className="Separateur1" width={300} height={150}/>
                </div>
                <div className="BlocLiens">
                    <div className="TitreBlocLiens"><h1 style={{textAlign:"center"}}></h1></div>
                    <div className="BlocBoiteAOutils">
                        <div className="blocBoiteOutil">
                            <Link href={"/boiteaoutils/videos"}><Bloc1 titre={<h2 style={{color:"#ee9251"}}>Les vidéos</h2>}  image={"/Yogatherapie.png"} texte={<p></p>}/></Link>
                        </div>
                        <div className="blocBoiteOutil">
                            <Link href={"/boiteaoutils/outilsnumeriques"}><Bloc1 titre={<h2 style={{color:"#458a83"}}>Outils numériques</h2>} image={"/Boiteaoutil.png"}texte={<p></p>}/></Link>
                        </div>
                        <div className="blocBoiteOutil">
                            <Link href={"/boiteaoutils/audios"}><Bloc1 titre={<h2 style={{color:"#a2415e"}}>Audios</h2>}  image={"/Massages.png"} texte={<p></p>}/></Link>
                        </div>
                    </div>
                    <br/>
                </div>
                <div className="Separateur1" style={{textAlign:"center"}}>
                    <img alt="" src={"/SeparationBarre.png"} className="Separateur1" width={300} height={150}/>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </Layout>

    )
}
