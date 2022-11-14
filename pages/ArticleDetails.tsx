import Layout from "../component/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import CardImageArticleDroite from "../component/CardImageArticleDroite";
import CardImageArticleGauche from "../component/CardImageArticleGauche";
import Image from "next/image";
import {useRouter} from "next/router";
import Link from "next/link";

export default function ArticleDetails(props: any) {

    const router = useRouter()
    const {
        query: { titre, texte, image },
    } = router

    return (
        <Layout>
            <div className="container">
                <br/>
                <Link href={"/Actualites"}><button style={{backgroundColor:"#a2415e",color:"white",border:"none",borderRadius:"10px"}}>Retour</button></Link>
                <br/>
                <div className={"articleDetails"}>
                    {image !== undefined && <img src={image.toString()} className={"imagePageArticleDetail"} />}
                    <h2 style={{marginTop:"40px"}}>{titre}</h2>
                    <p style={{marginTop:"50px", fontSize:"20px", padding:"15px"}}>{texte}</p>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        </Layout>
    )
}
