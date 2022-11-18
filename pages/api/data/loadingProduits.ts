import { NextApiRequest, NextApiResponse } from "next";
import {getDatabase} from "../../../src/database/database";
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

    const mongodb = await getDatabase();
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


        try{
            const data = await db.scan(paramsAll).promise();
            res.json(data);
        }catch (err){
            console.log(err)
        }

}
