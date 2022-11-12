import { NextApiRequest, NextApiResponse } from "next";
import {getDatabase} from "../../../src/database/database";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const mongodb = await getDatabase();
    const data = req.body;

    if(data.titre !== undefined && data.texte !== undefined && data.phrase !== undefined){
        const dataReceived = await mongodb.db().collection(`Actualites`).insertOne({
            idArticle:data.idArticle,
            texte: data.texte,
            createAt:new Date(),
            titre: data.titre,
            image:data.image,
            phrase:data.phrase
        });
    }

    res.status(200).send({data: "Ok"});
}
