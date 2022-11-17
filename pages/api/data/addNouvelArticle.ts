import { NextApiRequest, NextApiResponse } from "next";
import {getDatabase} from "../../../src/database/database";
import db from "../../../src/database/db";

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

    const data = req.body;
    const paramsAll = {
        TableName: "Actualites",
        Item:{
            idArticle:data.idArticle,
            texte: data.texte,
            createAt:new Date(),
            titre: data.titre,
            image:data.image,
            phrase:data.phrase
        }
    }

    if(data.titre !== undefined && data.texte !== undefined && data.phrase !== undefined){
        try{
            const data = await db.put(paramsAll).promise();
            res.status(200).send({data: "Ok"});
        }catch (err){
            console.log(err)
        }
    }

}
