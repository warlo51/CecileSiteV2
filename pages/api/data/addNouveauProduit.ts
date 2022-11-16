import { NextApiRequest, NextApiResponse } from "next";
import {getDatabase} from "../../../src/database/database";

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
            image:data.image
        });
    }

    res.status(200).send({data: "Ok"});
}
