import Head from "next/head";
import Image from "next/image";
import NavBar from "./Navbar";
import {useState} from "react";
import Footer from "./Footer";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Link from "next/link";

export default function Layout({ children }: any) {
    const [hoverRdv, setHoverRdv] = useState(false)

    return (
        <>
            <Head>
                <title>TicTac</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link href="https://fonts.googleapis.com/css2?family=Euphoria+Script&family=Merriweather:wght@700&family=Raleway:wght@200&display=swap" rel="stylesheet" />
            </Head>
            <div className="container-fluid">
                <div className="LogoHeader">
                    <div className="Logo">
                        <img alt="" className={"logoTop"} src={"/LogoSite.png"}/>
                    </div>
                </div>
                <div onMouseEnter={()=>setHoverRdv(true)} onMouseLeave={()=>setHoverRdv(false)}style={{position:"fixed",zIndex:2,marginTop:"150px"}}>
                    {hoverRdv ? <Image alt="" width={70} height={100} src={"/RdvHover.png"} /> : <Image alt={""} src={"/Rdv.png"} width={70} height={100}/>}
                </div>
                <div onMouseEnter={()=>setHoverRdv(true)} onMouseLeave={()=>setHoverRdv(false)}style={{position:"fixed",zIndex:2,bottom:0, right:0, padding:"10px"}}>
                    <Link href={"#top"}><button style={{backgroundColor:"#ee9251", borderRadius:"50%", color:"white"}}><ArrowUpwardIcon /></button></Link>
                </div>
                <div className="ConteneurNavBar">
                    <NavBar />
                </div>
                {children}
                <Footer />
            </div>
        </>
    );
};
