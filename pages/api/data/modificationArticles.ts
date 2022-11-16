import { NextApiRequest, NextApiResponse } from "next";
import {getDatabase} from "../../../src/database/database";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb' // Set desired value here
        }
    }
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const mongodb = await getDatabase();
    const data = req.body.tableauArticlesModifie;
    const keys = Object.keys(data[0])
    const objetRequest: any = {
        createAt: new Date()
    }

    if(keys.includes("texte")){
        objetRequest.texte = data[0].texte
    }else if(keys.includes("titre")){
        objetRequest.titre = data[0].titre
    }if(keys.includes("image")){
        objetRequest.image = data[0].image
    }if(keys.includes("phrase")){
        objetRequest.phrase = data[0].phrase
    }

    const dataReceived = await mongodb.db().collection(`Actualites`).updateOne(
        { idArticle: data[0].id },
        {
            $set: objetRequest,
        }
    );

    res.status(200).send({data: "Ok"});
}
