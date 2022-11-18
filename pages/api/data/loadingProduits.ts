import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../src/database/db";

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

    const categorie = req.query.categorie;

    const paramsAll = {
        TableName: "Produits"
    }
    const paramsCategorie = {
        TableName: 'Produits',
        FilterExpression: '#item = :item',
        ExpressionAttributeNames: {
            '#item': 'categorie',
        },
        ExpressionAttributeValues: {
            ':item': `${categorie}`,
        },
    };

    if(categorie === undefined){

        try{
            const data = await db.scan(paramsAll).promise();
            res.json(data);
        }catch (err){
            console.log(err)
        }

    }else{
        try{
            const data = await db.scan(paramsCategorie).promise();
            console.log(data)
            res.json(data);
        }catch (err){
            console.log(err)
            res.json(err);
        }
    }
}
