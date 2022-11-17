import { NextApiRequest, NextApiResponse } from "next";
import {getDatabase} from "../../../src/database/database";
import db from "../../../src/database/db";
import {uuidV4} from "mongodb/src/utils";

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
        TableName: "Produits",
        Item:{
            idProduit:uuidV4(),
            priceCode: data.priceCode === undefined ? "":data.priceCode,
            prix: data.prix,
            createAt:new Date(),
            titre: data.titre,
            image:data.image,
            categorie:data.categorie,
            fichier:data.fichier
        }
    }
    if(data.titre !== undefined && data.prix !== undefined && data.image !== undefined && data.fichier !== undefined){
        try{
            const data = await db.put(paramsAll).promise();
            res.status(200).send({data: "Ok"});
        }catch (err){
            console.log(err)
        }
    }
}
