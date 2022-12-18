import Layout from "../component/Layout";
import {useRouter} from "next/router";
import Link from "next/link";
import {PortableText} from "@portabletext/react";
import * as React from "react";

function toPlainText(blocks: any) {
    return blocks
        // loop through each block
        .map((block: any) => {
            // if it's not a text block with children,
            // return nothing
            if (block._type !== 'block' || !block.children) {
                return ''
            }
            // loop through the children spans, and join the
            // text strings
            return block.children.map((child: any) => child.text).join('')
        })
        // join the paragraphs leaving split by two linebreaks
        .join('\n\n')
}


export default function ArticleDetails(props: any) {

    const router = useRouter()
    const {
        query: { titre, texte, image },
    } = router

    let texteParse;
    let nbOfCharacters = 0;
    if (typeof texte === "string") {
        texteParse = JSON.parse(texte)
        texteParse.map((texte: any)=>{
           nbOfCharacters += (texte.children[0].text.length) + 60
        })
        nbOfCharacters = ((nbOfCharacters / 60) + 1) * 20
    }
    return (
        <Layout>
            <div className="container">
                <br/>
                <Link href={"/Actualites"}><button style={{backgroundColor:"#a2415e",color:"white",border:"none",borderRadius:"10px"}}>Retour</button></Link>
                <br/>
                <div className={"articleDetails"}>
                    {image !== undefined && <img src={image.toString()} className={"imagePageArticleDetail"} />}
                    <h2 style={{marginTop:"40px"}}>
                        {titre}
                    </h2>
                    <div style={{width: "400px",height: `${nbOfCharacters}px`, fontSize:"12px"}}>
                        <PortableText
                            value={texteParse}
                        />
                    </div>
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
const components = {
    block: {
        // Ex. 1: customizing common block types
        h1: (children:any) => <h1 className="text-2xl">{children}</h1>,
        blockquote: (children:any) => <blockquote className="border-l-purple-500">{children}</blockquote>,
        // Ex. 2: rendering custom styles
        customHeading: (children:any) => (
            <h2 className="text-lg text-primary text-purple-700">{children}</h2>
        ),
    },
}
