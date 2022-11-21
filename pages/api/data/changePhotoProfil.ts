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
    const params = {
        TableName: 'Membres',
        Key:{
            idMembre:data.idMembre
        },
        UpdateExpression: "SET photo = :ri",
        ExpressionAttributeValues:{
            ":ri": `${data.photo}`
        }

    };

    try{
        const data = await db.update(params).promise();
        res.status(200).send({data: "Ok"});
    }catch (err){
        console.log(err)
    }

}
