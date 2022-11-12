import { NextApiRequest, NextApiResponse } from "next";
import {getDatabase} from "../../../src/database/database";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const mongodb = await getDatabase();
    const data = req.body;

    if(data.idMembre !== undefined && data.nom !== undefined && data.prenom !== undefined  && data.telephone !== undefined  && data.email !== undefined){
        const dataReceived = await mongodb.db().collection(`Membres`).insertOne({
            idMembre:data.idMembre,
            nom: data.nom,
            prenom: data.prenom,
            telephone: data.telephone,
            email: data.email
        });
    }

    res.status(200).send({data: "Ok"});
}
