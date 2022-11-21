import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../src/database/db";

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
        UpdateExpression: "SET #ri = list_append(#ri, :vals)",
        ExpressionAttributeNames:{"#ri": "rdv"},
        ExpressionAttributeValues:{
            ":vals": [{date:`${data.date}`,categorie:`${data.categorie}`}]
        }

    };

    try{
        const data = await db.update(params).promise();
        res.status(200).send({data: "Ok"});
    }catch (err){
        console.log(err)
    }
}
