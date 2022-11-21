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
    const objetRequest: any = {
        createAt: new Date()
    }
    const params = {
        TableName: 'Membres',
        Key:{
            idMembre:data.idMembre
        },
        UpdateExpression: "SET #ri = list_append(#ri, :vals)",
        ExpressionAttributeNames:{"#ri": "fichier"},
        ExpressionAttributeValues:{
            ":vals": data.fichier
        }

    };

    try{
        const data = await db.update(params).promise();
        res.status(200).send({data: "Ok"});
    }catch (err){
        console.log(err)
    }

}
