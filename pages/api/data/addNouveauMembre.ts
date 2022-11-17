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
    const paramsAll = {
        TableName: "Membres",
        Item:{
            idMembre:data.idMembre,
            nom: data.nom,
            prenom: data.prenom,
            telephone: data.telephone,
            email: data.email,
            rdv:[],
            fichier:[]
        }
    }

    if(data.idMembre !== undefined && data.nom !== undefined && data.prenom !== undefined  && data.telephone !== undefined  && data.email !== undefined){
        try{
            const data = await db.put(paramsAll).promise();
            res.status(200).send({data: "Ok"});
        }catch (err){
            console.log(err)
        }
    }

}
