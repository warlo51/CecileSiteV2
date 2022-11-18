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

    let updateExpression= "";
    const ExpressionAttributeValues: any= {};
    if(data.telephone !== undefined){
        objetRequest.telephone = data.telephone
        updateExpression = updateExpression +"telephone = :telephone,"
        ExpressionAttributeValues[":telephone"] = data.telephone;
    } if(data.email !== undefined) {
        objetRequest.email = data.email
        updateExpression = updateExpression +"email = :email,"
        ExpressionAttributeValues[":email"] = data.email;
    } if(data.nom !== undefined) {
        objetRequest.nom = data.nom
        updateExpression = updateExpression +"nom = :nom,"
        ExpressionAttributeValues[":nom"] = data.nom;
    } if(data.prenom !== undefined) {
        objetRequest.prenom = data.prenom
        updateExpression = updateExpression +"prenom = :prenom,"
        ExpressionAttributeValues[":prenom"] = data.prenom;
    }

    updateExpression = "Set " + updateExpression.substring(0, updateExpression.length - 1);

    const params = {
        TableName: 'Membres',
        Key:{
            idArticle:objetRequest.id
        },
        UpdateExpression: `${updateExpression}`,
        ExpressionAttributeValues:ExpressionAttributeValues
    };

    try{
        const data = await db.update(params).promise();
        res.status(200).send({data: "Ok"});
    }catch (err){
        console.log(err)
    }
}
