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
    const data = req.body;

    if(data.titre !== undefined && data.priceCode !== undefined && data.prix !== undefined){
        const dataReceived = await mongodb.db().collection(`Produits`).insertOne({
            priceCode:data.priceCode,
            prix: data.prix,
            createAt:new Date(),
            titre: data.titre,
            image:data.image,
            categorie:data.categorie
        });
    }

    res.status(200).send({data: "Ok"});
}
