import { NextApiRequest, NextApiResponse } from "next";
import {getDatabase} from "../../../src/database/database";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb', // Set desired value here
            responseLimit: '100mb',
        }
    }
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const mongodb = await getDatabase();
    const categorie = req.query.categorie;

    if(categorie === undefined){
        const dataReceived = await mongodb.db().collection(`Produits`).find().toArray();
        res.status(200).send({data: dataReceived});
    }else{
        const dataReceived = await mongodb.db().collection(`Produits`).find({categorie:categorie}).toArray();
        res.status(200).send({data: dataReceived});
    }
}
