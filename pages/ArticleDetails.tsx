import Layout from "../component/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import CardImageArticleDroite from "../component/CardImageArticleDroite";
import CardImageArticleGauche from "../component/CardImageArticleGauche";
import Image from "next/image";
import {useRouter} from "next/router";

export default function ArticleDetails(props: any) {

    const router = useRouter()
    const {
        query: { titre, texte, image },
    } = router

    return (
        <Layout>
            <div className="container">
                <br/>
                <br/>
                <div style={{display:"flex", flexDirection:"column", height:"500px", backgroundColor:"white", textAlign:"center", borderRadius:"20px"}}>
                    <h1 style={{marginTop:"40px"}}>{titre}</h1>
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
