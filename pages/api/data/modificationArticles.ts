import { NextApiRequest, NextApiResponse } from "next";
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

    const data = req.body.tableauArticlesModifie;

    const keys = Object.keys(data[0])
    const objetRequest: any = {
        createAt: new Date(),
        id:data[0].id
    }
    let updateExpression= "";
    const ExpressionAttributeValues: any= {};

    if(keys.includes("texte")){
        objetRequest.texte = data[0].texte
        updateExpression = updateExpression +"texte = :texte,"
        ExpressionAttributeValues[":texte"] = data[0].texte;
    } if(keys.includes("titre")){
        objetRequest.titre = data[0].titre
        updateExpression = updateExpression +"titre = :titre,"
        ExpressionAttributeValues[":titre"] = data[0].titre;
    }if(keys.includes("image")){
        objetRequest.image = data[0].image
        updateExpression = updateExpression +"image = :image,"
        ExpressionAttributeValues[":image"] = data[0].image;
    }if(keys.includes("phrase")){
        objetRequest.phrase = data[0].phrase
        updateExpression = updateExpression +"phrase = :phrase,"
        ExpressionAttributeValues[":phrase"] = data[0].phrase;
    }

    updateExpression = "Set " + updateExpression.substring(0, updateExpression.length - 1);

    const params = {
        TableName: 'Actualites',
        Key:{
            idArticle:objetRequest.id
        },
        UpdateExpression: `${updateExpression}`,
        ExpressionAttributeValues:ExpressionAttributeValues
    };

    console.log("test", params)
    try{
        const data = await db.update(params).promise();
        res.status(200).send({data: "Ok"});
    }catch (err){
        console.log(err)
    }

}
