import { NextApiRequest, NextApiResponse } from "next";
import {getDatabase} from "../../../src/database/database";
import db from "../../../src/database/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const id = req.body.id;
    const titre = req.body.titre;

    const paramsAll ={
        TableName: 'Membres',
        Key:{
            idMembre:id
        },
        ProjectionExpression:'fichier'

    };

    try{
        const data = await db.scan(paramsAll).promise();
        if(data.Items !== undefined){
            if(data.Items[0].fichier.length !== 0){
                const index = data.Items[0].fichier.findIndex((element: any) => element.titre === titre)
                const deleteItem = await db.update({
                    TableName: 'Membres',
                    Key:{
                        idMembre:id
                    },
                   UpdateExpression: `REMOVE fichier[${index}]`
                }).promise();
            }
        }
        res.status(200).send({data: "Ok"});
    }catch (err){
        console.log(err)
    }
}
