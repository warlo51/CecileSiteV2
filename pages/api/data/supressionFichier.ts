import { NextApiRequest, NextApiResponse } from "next";
import {getDatabase} from "../../../src/database/database";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const mongodb = await getDatabase();
    const id = req.body.id;
    const titre = req.body.titre;

   const dataReceived = await mongodb.db().collection(`Membres`).updateOne( { idMembre: id }, { $pull: { fichier : {titre:titre} } } )

    res.status(200).send({data: "Ok"});
}
