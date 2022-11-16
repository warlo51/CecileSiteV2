import { NextApiRequest, NextApiResponse } from "next";
import {getDatabase} from "../../../src/database/database";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const mongodb = await getDatabase();
    const data = req.body;
    const objetRequest: any = {
        createAt: new Date()
    }

    if(data.telephone !== undefined){
        objetRequest.telephone = data.telephone
    }else if(data.email !== undefined) {
        objetRequest.email = data.email
    }else if(data.nom !== undefined) {
        objetRequest.nom = data.nom
    }else if(data.prenom !== undefined) {
        objetRequest.prenom = data.prenom
    }

    const dataReceived = await mongodb.db().collection(`Membres`).updateOne(
        { idMembre: data.id },
        {
            $set: objetRequest,
        }
    );

    res.status(200).send({data: "Ok"});
}
